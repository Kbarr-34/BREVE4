import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import AccordionItem from '../components/AccordionItem';

const SummarizerPage = ({ setSummaryResult }) => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [extraLinks, setExtraLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [service, setService] = useState('gemini');
  const [error, setError] = useState('');

  const faqItems = [
    { q: 'What is the YouTube video summarizer?', a: 'Breve\'s YouTube summarizer uses AI to read video transcripts and produce clear, concise summaries of any YouTube video in seconds.' },
    { q: 'Can I summarize multiple YouTube videos at once?', a: 'Yes! Add multiple URLs using the "Add More Link" button and generate summaries for all of them simultaneously.' },
    { q: 'Is there a limit on video length or the number of YouTube summaries?', a: 'Users can summarize videos up to 2 hours per day.' },
    { q: 'How accurate are the summaries?', a: 'Breve achieves 99%+ accuracy on videos with clear audio. The AI is trained to capture main ideas, key points, and important timestamps.' },
  ];

  const handleGenerate = async () => {
    const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    if (!url.trim() || !youtubeUrlRegex.test(url)) {
      setError('Silakan masukkan URL video YouTube yang valid.');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Summarize this YouTube video: ${url}`,
          url: url, // Kirim URL secara eksplisit
          service: service,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal menghasilkan ringkasan.');
      }

      const result = { summary: data.summary, videoUrl: data.videoUrl, transcript: data.transcript };
      sessionStorage.setItem('summaryResult', JSON.stringify(result));
      setSummaryResult(result);
      navigate('/result');
    } catch (error) {
      console.error('Error generating summary:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-mesh-center min-h-screen pt-24 pb-16">
      <section className="px-5 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-800 mb-4 leading-tight">
            Summarize YouTube videos<br/>
            <span className="text-lime-400">in seconds</span>
          </h1>
          <p className="text-forest-300 text-base mb-10 max-w-lg mx-auto leading-relaxed">
            Generating comprehensive and in-depth summaries for any YouTube video, instantly.
          </p>

          <div className="card-glass rounded-2xl p-5 space-y-4 max-w-xl mx-auto">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-500">
                <Icon name="link" size={16} />
              </div>
              <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="Paste the YouTube video link"
                className="input-field w-full pl-9 pr-4 py-3 rounded-xl text-sm"
                onKeyDown={e => e.key === 'Enter' && handleGenerate()}
              />
            </div>

            {extraLinks.map((link, i) => (
              <div key={i} className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-500">
                  <Icon name="link" size={16} />
                </div>
                <input
                  type="url"
                  value={link}
                  onChange={e => { const n = [...extraLinks]; n[i] = e.target.value; setExtraLinks(n); }}
                  placeholder={`Link ${i + 2}`}
                  className="input-field w-full pl-9 pr-4 py-3 rounded-xl text-sm"
                />
              </div>
            ))}

            <button onClick={() => setExtraLinks([...extraLinks, ''])} className="text-lime-400 text-sm flex items-center gap-1.5 hover:text-lime-300 transition-colors">
              <Icon name="plus" size={14} />
              Add More Link
            </button>

            {/* Pilihan Layanan AI */}
            <div className="flex justify-center items-center gap-4 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="service"
                  value="gemini"
                  checked={service === 'gemini'}
                  onChange={() => setService('gemini')}
                  className="form-radio text-lime-400 bg-forest-800 border-forest-700 focus:ring-lime-500"
                />
                <span className="text-sm text-forest-300">Gemini</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="service"
                  value="chatgpt"
                  checked={service === 'chatgpt'}
                  onChange={() => setService('chatgpt')}
                  className="form-radio text-lime-400 bg-forest-800 border-forest-700 focus:ring-lime-500"
                />
                <span className="text-sm text-forest-300">ChatGPT</span>
              </label>
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button onClick={handleGenerate} disabled={isLoading} className="btn-primary w-full py-3.5 rounded-xl font-display font-600 text-sm text-white flex items-center justify-center gap-2 disabled:opacity-50">
              {isLoading ? (
                <>
                  <Icon name="loader" size={16} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Icon name="sparkles" size={16} />
                  Generate Summary
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-700 text-center mb-4">
              YouTube Video <span className="text-lime-400">Summarizer</span>
            </h2>
            <p className="text-center text-sm text-forest-300 leading-relaxed mb-4">
              Get YouTube transcripts and use AI to summarize YouTube videos in one click for free online with BREVE's YouTube summary tool.
            </p>
            <p className="text-center text-sm text-forest-300 leading-relaxed">
              Trouble grasping key points of long YouTube videos? BREVE YouTube Video Summarizer makes it easy to get the main ideas fast. This AI tool turns any long video into a clear, short YouTube summary — perfect for study, research, or catching up quickly.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 bg-forest-950/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-700 text-center mb-3">
            How to Summarize <span className="text-lime-400">YouTube Videos?</span>
          </h2>
          <p className="text-center text-sm text-forest-400 mb-10">You can easily use YouTube AI summarizer with just 3 simple steps.</p>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Get YouTube video link', desc: 'Copy and paste the YouTube video link into BREVE\'s input field above.' },
              { step: '02', title: 'Generate Summary of YouTube', desc: 'Click the Generate Summary button, and BREVE will fetch the transcript and summarize the YouTube video.' },
              { step: '03', title: 'Read the AI YouTube Summary', desc: 'Get a clear and concise YouTube summary instantly. Save time by getting the key points at a glance.' },
            ].map((s, i) => (
              <div key={i} className="flex gap-5 group">
                <div className="step-number">{s.step}</div>
                <div className="flex-1 pb-6 border-b border-forest-800 last:border-0">
                  <h3 className="font-display font-600 text-base mb-1.5 text-white group-hover:text-lime-300 transition-colors">{s.title}</h3>
                  <p className="text-sm text-forest-300 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-5 bg-forest-950/40">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-700 text-center mb-3">Use Cases for <span className="text-lime-400">Different Roles</span></h2>
          <p className="text-center text-forest-400 text-sm mb-12 max-w-md mx-auto">Made for students, educator & general users.</p>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { 
                role: 'For Students', 
                bg: 'https://images.unsplash.com/photo-1592188657297-c6473609e988?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                desc: 'Stay on top of your studies by using the YouTube Video Summarizer to quickly turn long lectures and tutorials into clear, time-saving summaries.' 
              },
              { 
                role: 'For Educators', 
                bg: 'https://images.unsplash.com/photo-1560439513-74b037a25d84?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
                desc: 'Instantly capture the key takeaways from industry talks, webinars, and conferences without watching the full video.' 
              },
              { 
                role: 'For General', 
                bg: 'https://plus.unsplash.com/premium_vector-1727156493554-8fb1768a0dd4?q=80&w=1316&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
                desc: 'Explore and absorb large volumes of video content more efficiently. Process complex materials and extract core ideas in minutes.' 
              },
            ].map((item, i) => (
              <div key={i} className="card-glass rounded-2xl overflow-hidden transition-all duration-300 group cursor-default">
                <div className="relative h-44 overflow-hidden">
                  <img src={item.bg} alt={item.role} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} via-forest-900/40 to-forest-900/10`} />
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className="font-display font-700 text-lg text-white">{item.role}</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-forest-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-700 text-center mb-10">Frequently Asked <span className="text-lime-400">Questions</span></h2>
          <div>
            {faqItems.map((item, i) => (
              <AccordionItem key={i} {...item} />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-forest-800 py-8 px-5 text-center">
        <p className="font-display font-800 text-lg tracking-widest text-lime-400 mb-2">BREVE</p>
        <p className="text-xs text-forest-500">Copyright 2026</p>
      </footer>
    </div>
  );
};

export default SummarizerPage;