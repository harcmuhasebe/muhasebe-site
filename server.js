import { createServer } from 'http';
import { readFileSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.md': 'text/markdown'
};

// Chat API handler (from api/chat.js)
async function handleChatAPI(req, res) {
    if (req.method === 'OPTIONS') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
            'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        });
        res.end();
        return;
    }

    if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const { messages, systemPrompt } = JSON.parse(body);

            if (!messages || !Array.isArray(messages)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid request: messages required' }));
                return;
            }

            const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
            
            if (!GEMINI_API_KEY) {
                console.error('❌ GEMINI_API_KEY not found in environment variables');
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'API key not configured' }));
                return;
            }

            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${GEMINI_API_KEY}`;

            // Build conversation history
            const contents = [];
            
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

            messages.forEach(msg => {
                contents.push({
                    role: msg.role === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.content }]
                });
            });

            // Call Gemini API
            const fetch = (await import('node-fetch')).default;
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
                res.writeHead(geminiResponse.status, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ 
                    error: 'Gemini API request failed',
                    details: errorText
                }));
                return;
            }

            const data = await geminiResponse.json();

            if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
                res.writeHead(200, { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify({
                    response: data.candidates[0].content.parts[0].text
                }));
            } else {
                console.error('Unexpected Gemini response format:', data);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Unexpected response format from Gemini' }));
            }

        } catch (error) {
            console.error('Server error:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
                error: 'Internal server error',
                message: error.message 
            }));
        }
    });
}

// Main server
const server = createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // Handle API endpoint
    if (req.url === '/api/chat') {
        handleChatAPI(req, res);
        return;
    }

    // Serve static files
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const ext = extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    try {
        const content = readFileSync(join(__dirname, filePath));
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.writeHead(404);
            res.end('404 - File Not Found');
        } else {
            res.writeHead(500);
            res.end('500 - Internal Server Error');
        }
    }
});

server.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════╗
║   🚀 Harç Muhasebe Site - Local Server   ║
╠════════════════════════════════════════════╣
║                                            ║
║   📍 Server: http://localhost:${PORT}       ║
║   🤖 API:    http://localhost:${PORT}/api/chat ║
║   ✅ Status: Running                       ║
║                                            ║
║   Press Ctrl+C to stop                     ║
║                                            ║
╚════════════════════════════════════════════╝
    `);
});

