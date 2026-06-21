import OpenAI from 'openai';

// Inisialisasi client OpenAI dengan kunci API dari variabel lingkungan
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Menghasilkan konten menggunakan model ChatGPT.
 * @param {string} prompt Teks input untuk model.
 * @returns {Promise<string>} Teks yang dihasilkan oleh model.
 */
export async function generateWithChatGPT(prompt) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Kunci API OpenAI tidak ditemukan.');
  }
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Tidak ada konten yang diterima dari ChatGPT.');
    }
    return content;
  } catch (error) {
    console.error('Error saat berinteraksi dengan OpenAI API:', error);
    if (error.response && error.response.status === 401) {
      throw new Error('Kunci API OpenAI tidak valid.', { cause: error });
    }
    throw new Error('Gagal berkomunikasi dengan OpenAI API.', { cause: error });
  }
}