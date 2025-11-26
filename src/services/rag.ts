import { supabase } from './supabase';
import { openaiService } from './openai';

export const ragService = {
    async embedAndStoreScan(userId: string, text: string, imageUrl: string, analysisResult: any) {
        try {
            const embedding = await openaiService.createEmbedding(text);

            const { data, error } = await supabase
                .from('scans')
                .insert({
                    user_id: userId,
                    extracted_text: text,
                    image_url: imageUrl,
                    analysis_result: analysisResult,
                    embedding: embedding,
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error storing scan with embedding:', error);
            throw error;
        }
    },

    async searchSimilarScans(query: string, threshold = 0.7, limit = 5) {
        try {
            const embedding = await openaiService.createEmbedding(query);

            const { data, error } = await supabase.rpc('match_scans', {
                query_embedding: embedding,
                match_threshold: threshold,
                match_count: limit,
            });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error searching similar scans:', error);
            throw error;
        }
    },
};
