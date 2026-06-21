import Icon from '../components/Icon';
import AccordionItem from '../components/AccordionItem';

const FAQ_ITEMS = [
  { q: 'What is Breve?', a: 'Breve is an AI-powered summarizer assistant that helps learners 10x faster. It summarizes YouTube videos instantly.' },
  { q: 'Can Breve turn videos into text?', a: 'Yes! Breve can transcribe video lectures into full readable text, making it easy to search, highlight, and study at your own pace.' },
  { q: 'Can Breve handle YouTube videos without subtitles?', a: 'Breve uses advanced AI to generate transcripts only when subtitles are available.' },
  { q: 'Is Breve free?', a: 'Yes! Breve is absolutely FREE!' },
];

import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-mesh min-h-screen">
      {/* HERO */}
      <section className="pt-36 pb-24 px-5 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="font-display text-5xl md:text-7xl font-800 leading-tight mb-6 animate-fade-up-delay-1 opacity-0">
            Your <span className="text-lime-400">AI Summarizer</span><br/>Assistant
          </h1>
          <p className="text-forest-300 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up-delay-2 opacity-0">
            Designed to help learners <span className="text-lime-400 font-semibold">10x faster</span> across summarizing and learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up-delay-3 opacity-0">
            <button onClick={() => navigate('/summarizer')} className="btn-primary text-white px-8 py-3.5 rounded-full font-display font-600 text-sm tracking-wide flex items-center justify-center gap-2">
              <Icon name="sparkles" size={16} />
              Try Now
            </button>
          </div>
        </div>
      </section>

      {/* DESIGNED FOR YOU */}
      <section className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-700 text-center mb-12">Designed for <span className="text-lime-400">You</span></h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                role: 'Students',
                desc: 'Study smarter with Breve — turn lectures into text, get deep summaries, and get instant AI help anytime.',
                gradient: 'from-forest-500/30 to-transparent',
                bg: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              },
              {
                role: 'Educators',
                desc: 'Teach better with Breve by turning materials into summaries and translating resources for any class.',
                gradient: 'from-forest-500/30 to-transparent',
                bg: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80',
              },
              {
                role: 'General Users',
                desc: 'Get deep summaries and instant AI help anytime — for work, research, or daily learning.',
                gradient: 'from-forest-500/30 to-transparent',
                bg: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&q=80',
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

      {/* PRIVACY */}
      <section className="py-20 px-5 bg-forest-950/40">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-700 text-center mb-3">Your Privacy, <span className="text-lime-400">Our Priority</span></h2>
          <p className="text-center text-forest-400 text-sm mb-12 max-w-md mx-auto">We take your data seriously. Here's our commitment to you.</p>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { 
                role: 'Data Security & Protection',
                desc: 'We protect your data with encryption. Your information is never shared without explicit consent.',
                gradient: 'from-lime-400/20 to-transparent',
                bg: 'https://images.unsplash.com/photo-1770159116807-9b2a7bb82294?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
              },
              { 
                role: 'Minimal Collection',
                desc: 'We only collect information that\'s necessary to provide you with better service — nothing more.',
                gradient: 'from-lime-400/20 to-transparent',
                bg: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              },
              { 
                role: 'Your Data Rights & Control',
                desc: 'You have full control over your data. You can view, update, or delete it at any time with one click.',
                gradient: 'from-lime-400/20 to-transparent',
                bg: 'https://images.unsplash.com/photo-1624887009213-040347b804c1?q=80&w=1987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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

      {/* FAQ */}
      <section className="py-20 px-5">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-700 text-center mb-12">Frequently Asked <span className="text-lime-400">Questions</span></h2>
          <div>
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-forest-800 py-8 px-5 text-center">
        <p className="font-display font-800 text-lg tracking-widest text-lime-400 mb-2">BREVE</p>
        <p className="text-xs text-forest-500">Copyright 2026 · All rights reserved</p>
      </footer>
    </div>
  );
};

export default HomePage;