import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useState } from 'react';
import Icon from '../components/Icon'; // Impor komponen Icon

// Fungsi helper untuk mendapatkan data dari sessionStorage dengan aman
const getInitialState = () => {
  try {
    const storedResult = sessionStorage.getItem('summaryResult');
    if (storedResult) {
      return JSON.parse(storedResult);
    }
  } catch (error) {
    console.error("Gagal mem-parsing data dari sessionStorage:", error);
  }
  return null; // Kembalikan null jika tidak ada data atau terjadi error
};

const ResultPage = () => {
  const navigate = useNavigate();
  // Inisialisasi state HANYA SEKALI dari sessionStorage menggunakan fungsi helper
  const [summaryResult] = useState(getInitialState);

  // State untuk chatbot
  const [chatHistory, setChatHistory] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState('');

  const { summary, videoUrl, transcript } = summaryResult || {};

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const newQuestion = { role: 'user', content: chatInput };
    setChatHistory(prev => [...prev, newQuestion]);
    setIsChatLoading(true);
    setChatError('');
    setChatInput('');

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: chatInput,
          transcript: transcript, // Kirim transkrip sebagai konteks
          service: 'chatgpt', // Diubah untuk menggunakan ChatGPT untuk chatbot
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal mendapatkan jawaban.');
      }

      const data = await response.json();
      const newAnswer = { role: 'bot', content: data.answer };
      setChatHistory(prev => [...prev, newAnswer]);

    } catch (error) {
      console.error('Chat error:', error);
      setChatError(error.message);
      // Tambahkan pesan error ke riwayat obrolan agar pengguna tahu
      const errorMessage = { role: 'bot', content: `Maaf, terjadi kesalahan: ${error.message}` };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Tampilkan status memuat jika tidak ada data sama sekali
  if (!summaryResult) {
    return (
      <div className="bg-mesh-center min-h-screen flex items-center justify-center">
        <p className="text-white">Memuat hasil atau tidak ada hasil yang ditemukan...</p>
      </div>
    );
  }

  return (
    <div className="bg-mesh-center min-h-screen pt-24 pb-16">
      <section className="px-5 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-800 mb-8 text-center">
            Hasil <span className="text-lime-400">Ringkasan</span>
          </h1>

          {videoUrl && typeof videoUrl === 'string' ? (
            <div className="mb-8 rounded-xl overflow-hidden shadow-lg aspect-video">
              <ReactPlayer
                url={videoUrl}
                width="100%"
                height="100%"
                controls
                playing
              />
            </div>
          ) : (
            <div className="mb-8 rounded-xl aspect-video bg-forest-900 flex items-center justify-center">
              <p className="text-forest-500">Video tidak tersedia.</p>
            </div>
          )}

          <div className="card-glass rounded-2xl p-6 mb-12">
            <h2 className="font-display text-2xl font-700 mb-4">Ringkasan Teks</h2>
            <div className="text-forest-300 leading-relaxed whitespace-pre-wrap">
              {summary || 'Tidak ada ringkasan yang tersedia. Coba buat ringkasan baru.'}
            </div>
          </div>

          {/* --- Fitur Chatbot Baru --- */}
          <div className="card-glass rounded-2xl p-6">
            <h2 className="font-display text-2xl font-700 mb-4">Tanya Lebih Lanjut</h2>
            <div className="space-y-4 mb-4 h-64 overflow-y-auto pr-2">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-lg px-4 py-2 rounded-xl ${msg.role === 'user' ? 'bg-lime-900/50 text-lime-200' : 'bg-forest-800/50 text-forest-300'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="max-w-lg px-4 py-2 rounded-xl bg-forest-800/50 text-forest-300">
                    <Icon name="loader" size={16} className="animate-spin" />
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleChatSubmit} className="flex gap-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Tanyakan apa saja tentang video ini..."
                className="input-field w-full pl-4 pr-4 py-3 rounded-xl text-sm"
                disabled={isChatLoading}
              />
              <button type="submit" disabled={isChatLoading} className="btn-primary p-3 rounded-xl flex-shrink-0 disabled:opacity-50">
                <Icon name="send" size={20} />
              </button>
            </form>
            {chatError && <p className="text-red-400 text-xs mt-2">{chatError}</p>}
          </div>
          {/* --- Akhir Fitur Chatbot --- */}

          <div className="text-center mt-12">
            <button onClick={() => navigate('/summarizer')} className="btn-secondary py-2 px-6 rounded-xl font-display font-600 text-sm">
              Buat Ringkasan Baru
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResultPage;