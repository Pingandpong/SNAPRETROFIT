import OpenAI from 'openai';

const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

if (!apiKey) {
    console.warn('OpenAI API Key is missing. Please check your .env file.');
}

export const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true, // Required for React Native
});

export const openaiService = {
    async createEmbedding(text: string) {
        try {
            const response = await openai.embeddings.create({
                model: 'text-embedding-3-small',
                input: text,
            });
            return response.data[0].embedding;
        } catch (error) {
            console.error('Error creating embedding:', error);
            throw error;
        }
    },

    async analyzeImage(base64Image: string, prompt: string = 'Analyze this image') {
        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'user',
                        content: [
                            { type: 'text', text: prompt },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: `data:image/jpeg;base64,${base64Image}`,
                                },
                            },
                        ],
                    },
                ],
            });
            return response.choices[0].message.content;
        } catch (error) {
            console.error('Error analyzing image:', error);
            throw error;
        }
    },
};
