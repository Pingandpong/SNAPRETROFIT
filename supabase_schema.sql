-- Enable necessary extensions
create extension if not exists "vector" with schema extensions;

-- Create profiles table
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create subscriptions table
create table public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  plan_type text not null check (plan_type in ('free', 'basic', 'premium')),
  status text not null check (status in ('active', 'canceled', 'expired')),
  start_date timestamp with time zone default timezone('utc'::text, now()) not null,
  end_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create scans table (for RAG/History)
create table public.scans (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  image_url text not null,
  extracted_text text,
  analysis_result jsonb,
  embedding vector(1536),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.scans enable row level security;

-- Policies for profiles
create policy "Users can view their own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);

-- Policies for subscriptions
create policy "Users can view their own subscriptions" on public.subscriptions
  for select using (auth.uid() = user_id);

-- Policies for scans
create policy "Users can view their own scans" on public.scans
  for select using (auth.uid() = user_id);

create policy "Users can insert their own scans" on public.scans
  for insert with check (auth.uid() = user_id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  
  -- Insert default free subscription
  insert into public.subscriptions (user_id, plan_type, status)
  values (new.id, 'free', 'active');
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function for vector search (RAG)
create or replace function match_scans (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  extracted_text text,
  similarity float
)
language plpgsql
stable
as $$
begin
  return query
  select
    scans.id,
    scans.extracted_text,
    1 - (scans.embedding <=> query_embedding) as similarity
  from scans
  where 1 - (scans.embedding <=> query_embedding) > match_threshold
  order by scans.embedding <=> query_embedding
  limit match_count;
end;
$$;
