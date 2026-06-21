import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Menghasilkan konten menggunakan model generatif.
 * @param {string} prompt Teks input untuk model.
 * @returns {Promise<string>} Teks yang dihasilkan oleh model.
 */
export async function generateContent(prompt) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('Kunci API Gemini tidak ditemukan.');
  }
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error('Error saat menghasilkan konten dengan Gemini:', error);
    if (error.message.includes('API key not valid')) {
      throw new Error('Kunci API Gemini tidak valid.', { cause: error });
    }
    throw new Error('Gagal berkomunikasi dengan Gemini API.', { cause: error });
  }
}