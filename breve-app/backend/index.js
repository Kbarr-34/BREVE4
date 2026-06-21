import './config.js';
import express from 'express';
import cors from 'cors';
import { generateContent } from './gemini-service.js';
import { generateWithChatGPT } from './chatgpt-service.js';
import { YoutubeTranscript } from 'youtube-transcript';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  try {
    const { service } = req.body;
    let { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL dibutuhkan' });
    }

    // Membersihkan URL dari karakter yang tidak diinginkan (tanda kutip tunggal, ganda, dan backtick)
    url = url.trim().replace(/[`'"]/g, '');

    const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    if (!youtubeUrlRegex.test(url)) {
      return res.status(400).json({ error: 'URL YouTube tidak valid.' });
    }

    // 1. Ambil transkrip dari video YouTube
    let transcriptText;
    try {
      const transcript = await YoutubeTranscript.fetchTranscript(url);
      if (!transcript || transcript.length === 0) {
        throw new Error('Transkrip tidak ditemukan atau kosong.');
      }
      transcriptText = transcript.map(item => item.text).join(' ');
    } catch (e) {
      console.error('Gagal mengambil transkrip:', e);
      return res.status(400).json({ error: 'Gagal mengambil transkrip untuk video ini. Kemungkinan video ini tidak memiliki transkrip atau dibatasi.' });
    }

    // 2. Buat prompt baru dengan transkrip untuk diringkas
    const summarizationPrompt = `Ringkaslah teks berikut yang merupakan transkrip dari sebuah video YouTube. Buatlah ringkasan yang jelas dan informatif dalam beberapa paragraf: "${transcriptText}"`;

    // 3. Kirim prompt ke layanan AI yang dipilih
    let result;
    if (service === 'chatgpt') {
      result = await generateWithChatGPT(summarizationPrompt);
    } else {
      result = await generateContent(summarizationPrompt);
    }

    // 4. Kirim respons yang berisi ringkasan, URL video, dan transkrip
    const responseObject = { summary: result, videoUrl: url, transcript: transcriptText };
    res.json(responseObject);

  } catch (error) {
    console.error('Error pada endpoint /api/generate:', error);
    const errorMessage = error.message || 'Terjadi kesalahan pada server';
    res.status(500).json({ error: errorMessage });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { question, transcript, service } = req.body;

    if (!question || !transcript) {
      return res.status(400).json({ error: 'Pertanyaan dan transkrip dibutuhkan.' });
    }

    // --- PERBAIKAN: Potong transkrip jika terlalu panjang ---
    const MAX_TRANSCRIPT_LENGTH = 15000; // Batas aman untuk menghindari error token limit
    let contextTranscript = transcript;
    if (transcript.length > MAX_TRANSCRIPT_LENGTH) {
      console.warn(`Transkrip dipotong dari ${transcript.length} menjadi ${MAX_TRANSCRIPT_LENGTH} karakter.`);
      contextTranscript = transcript.substring(0, MAX_TRANSCRIPT_LENGTH);
    }

    const chatPrompt = `Berdasarkan transkrip video berikut: "${contextTranscript}". Jawab pertanyaan ini: "${question}"`;

    let answer;
    if (service === 'chatgpt') {
      answer = await generateWithChatGPT(chatPrompt);
    } else {
      answer = await generateContent(chatPrompt);
    }

    res.json({ answer });

  } catch (error) {
    console.error('Error pada endpoint /api/chat:', error);
    // --- PERBAIKAN: Kirim pesan error yang lebih spesifik ---
    const errorMessage = error.message || 'Gagal mendapatkan jawaban dari AI.';
    res.status(500).json({ error: errorMessage });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});