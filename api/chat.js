// Vercel Serverless Function - Gemini API Proxy
// Bu dosya API key'i gizler ve güvenli bir endpoint sağlar

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { messages, systemPrompt } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Invalid request: messages required' });
        }

        // Get API key from environment variable
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        
        if (!GEMINI_API_KEY) {
            console.error('❌ GEMINI_API_KEY not found in environment variables');
            return res.status(500).json({ error: 'API key not configured' });
        }

        // Prepare Gemini API request
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${GEMINI_API_KEY}`;

        // Build conversation history
        const contents = [];
        
        // Add system instruction if provided
        if (systemPrompt) {
            contents.push({
                role: 'user',
                parts: [{ text: systemPrompt }]
            });
            contents.push({
                role: 'model',
                parts: [{ text: 'Anladım, Harç Muhasebe yazılımı hakkında sorulara cevap vereceğim.' }]
            });
        }

        // Add conversation history
        messages.forEach(msg => {
            contents.push({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
            });
        });

        // Call Gemini API
        const geminiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents,
                generationConfig: {
                    temperature: 0.4,
                    maxOutputTokens: 500,
                    topP: 0.95,
                    topK: 40
                },
                safetySettings: [
                    {
                        category: 'HARM_CATEGORY_HARASSMENT',
                        threshold: 'BLOCK_ONLY_HIGH'
                    },
                    {
                        category: 'HARM_CATEGORY_HATE_SPEECH',
                        threshold: 'BLOCK_ONLY_HIGH'
                    }
                ]
            })
        });

        if (!geminiResponse.ok) {
            const errorText = await geminiResponse.text();
            console.error('Gemini API Error:', errorText);
            return res.status(geminiResponse.status).json({ 
                error: 'Gemini API request failed',
                details: errorText
            });
        }

        const data = await geminiResponse.json();

        // Extract response
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            return res.status(200).json({
                response: data.candidates[0].content.parts[0].text
            });
        } else {
            console.error('Unexpected Gemini response format:', data);
            return res.status(500).json({ error: 'Unexpected response format from Gemini' });
        }

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}

