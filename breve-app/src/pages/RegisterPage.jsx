import { useState } from 'react';
import Icon from '../components/Icon';
import { FcGoogle } from 'react-icons/fc';


import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="bg-mesh min-h-screen flex items-center justify-center px-5 pt-20 pb-12">
      <div className="w-full max-w-sm animate-fade-up opacity-0">
        <div className="text-center mb-6">
          <button onClick={() => navigate('/')} className="font-display font-800 text-3xl tracking-widest text-lime-400 mb-2 block mx-auto hover:text-lime-300 transition-colors">BREVE</button>
        </div>

        <div className="card-glass rounded-2xl overflow-hidden">
          <div className="flex border-b border-forest-700">
            {['login', 'register'].map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); if (t === 'login') navigate('/login'); }}
                className={`flex-1 py-3.5 text-sm font-display font-600 capitalize transition-all ${tab === t ? 'tab-active' : 'tab-inactive'}`}
              >
                {t === 'login' ? 'Login' : 'Register'}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              className="input-field w-full px-4 py-3 rounded-xl text-sm"
            />

            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="input-field w-full px-4 pr-10 py-3 rounded-xl text-sm"
              />
              <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-500 hover:text-forest-300 transition-colors">
                <Icon name={showPw ? 'eyeOff' : 'eye'} size={16} />
              </button>
            </div>

            <button className="w-full py-3 rounded-xl font-display font-600 text-sm tracking-wide transition-all btn-primary text-white">
              Submit
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-forest-700" />
              <span className="text-xs text-forest-500 px-2">OR</span>
              <div className="flex-1 h-px bg-forest-700" />
            </div>

            <button className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-medium text-sm text-white border border-forest-700 hover:bg-forest-800/30 transition-all">
              <FcGoogle size={18} />
              <span>Continue with Google</span>
            </button>

            <p className="text-center text-xs text-forest-500 leading-relaxed">
              * By signing up, you agree to these agreements:{' '}
              <button className="text-lime-400 hover:underline">Terms of Service</button>{' '}
              and{' '}
              <button className="text-lime-400 hover:underline">Privacy Policy</button>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;