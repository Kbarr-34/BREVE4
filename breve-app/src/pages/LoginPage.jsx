import { useState } from 'react';
import Icon from '../components/Icon';
import { FcGoogle } from 'react-icons/fc';

import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="bg-mesh min-h-screen flex items-center justify-center px-5 pt-20 pb-12">
      <div className="w-full max-w-sm animate-fade-up opacity-0">
        <div className="text-center mb-8">
          <button onClick={() => navigate('/')} className="font-display font-800 text-3xl tracking-widest text-lime-400 mb-3 block mx-auto hover:text-lime-300 transition-colors">BREVE</button>
          <p className="text-sm text-forest-400">
            Don't have an account yet?{' '}
            <button onClick={() => navigate('/register')} className="text-lime-400 hover:text-lime-300 font-medium transition-colors">Sign up</button>
          </p>
        </div>

        <div className="card-glass rounded-2xl p-6 space-y-4">
          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-medium text-sm text-white border border-forest-700 hover:bg-forest-800/30 transition-all">
            <FcGoogle size={18} />
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-forest-700" />
            <span className="text-xs text-forest-500 px-2">Or</span>
            <div className="flex-1 h-px bg-forest-700" />
          </div>

          <p className="text-sm font-medium text-forest-200 text-center">Log in with Email</p>

          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-500">
              <Icon name="mail" size={16} />
            </div>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input-field w-full pl-9 pr-4 py-3 rounded-xl text-sm"
            />
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-500">
              <Icon name="lock" size={16} />
            </div>
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input-field w-full pl-9 pr-10 py-3 rounded-xl text-sm"
            />
            <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-500 hover:text-forest-300 transition-colors">
              <Icon name={showPw ? 'eyeOff' : 'eye'} size={16} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => setRemember(!remember)}
                className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${remember ? 'bg-lime-500 border-lime-500' : 'border-forest-500'}`}
              >
                {remember && <Icon name="check" size={10} className="text-white" />}
              </div>
              <span className="text-xs text-forest-300">Remember me</span>
            </label>
            <div className="flex gap-3 text-xs">
              <button onClick={() => navigate('/register')} className="text-lime-400 hover:text-lime-300 transition-colors">Sign Up</button>
              <button className="text-lime-400 hover:text-lime-300 transition-colors">Forgot password?</button>
            </div>
          </div>

          <button
            onClick={() => {
              const user = {
                name: email.split('@')[0] || 'Pengguna Breve',
                email: email || 'user@email.com',
                joinDate: new Date().toISOString().split('T')[0],
                defaultService: 'gemini',
                summariesCount: 0,
              };
              localStorage.setItem('breve_user', JSON.stringify(user));
              navigate('/account');
            }}
            className="btn-primary w-full py-3 rounded-xl font-display font-600 text-sm text-white tracking-wide"
          >
            Log In
          </button>

          <p className="text-center text-xs text-forest-500 leading-relaxed">
            By logging in, you agree to our{' '}
            <button className="text-lime-400 hover:underline">Terms of Service</button>{' '}
            and{' '}
            <button className="text-lime-400 hover:underline">Privacy Policy</button>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;