import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';

const DEFAULT_USER = {
  name: 'Pengguna Breve',
  email: 'user@email.com',
  joinDate: new Date().toISOString().split('T')[0],
  defaultService: 'gemini',
  summariesCount: 0,
};

const TABS = [
  { id: 'profil', label: 'Profil', icon: 'user' },
  { id: 'keamanan', label: 'Keamanan', icon: 'lock' },
  { id: 'pengaturan', label: 'Pengaturan', icon: 'settings' },
];

const loadUser = () => {
  try {
    const stored = localStorage.getItem('breve_user');
    if (stored) return { ...DEFAULT_USER, ...JSON.parse(stored) };
  } catch {
    /* ignore */
  }
  return null;
};

const AccountPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(loadUser);
  const [tab, setTab] = useState('profil');
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [defaultService, setDefaultService] = useState('gemini');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setDefaultService(user.defaultService || 'gemini');
    }
  }, [user]);

  const handleSaveProfile = () => {
    const updated = { ...user, name, email };
    localStorage.setItem('breve_user', JSON.stringify(updated));
    setUser(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleSaveSettings = () => {
    const updated = { ...user, defaultService };
    localStorage.setItem('breve_user', JSON.stringify(updated));
    setUser(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = () => {
    localStorage.removeItem('breve_user');
    navigate('/login');
  };

  const initials = (user?.name || 'U')
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const joinDate = user?.joinDate
    ? new Date(user.joinDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : '-';

  if (!user) {
    return (
      <div className="bg-mesh min-h-screen flex items-center justify-center px-5 pt-20 pb-12">
        <div className="w-full max-w-sm text-center animate-fade-up opacity-0">
          <div className="card-glass rounded-2xl p-8 space-y-5">
            <div className="w-16 h-16 rounded-full bg-lime-500/10 border border-lime-500/25 flex items-center justify-center mx-auto">
              <Icon name="user" size={28} className="text-lime-400" />
            </div>
            <h1 className="font-display font-800 text-xl text-white">Belum Masuk</h1>
            <p className="text-sm text-forest-400 leading-relaxed">
              Masuk ke akun Anda untuk mengelola profil, keamanan, dan pengaturan.
            </p>
            <button onClick={() => navigate('/login')} className="btn-primary w-full py-3 rounded-xl font-display font-600 text-sm text-white tracking-wide">
              Masuk Sekarang
            </button>
            <p className="text-xs text-forest-500">
              Belum punya akun?{' '}
              <button onClick={() => navigate('/register')} className="text-lime-400 hover:text-lime-300 transition-colors">
                Daftar gratis
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-mesh min-h-screen pt-24 pb-16 px-5">
      <div className="max-w-3xl mx-auto animate-fade-up opacity-0">
        {/* Header profil */}
        <div className="card-glass rounded-2xl p-6 mb-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-lime-500 to-forest-500 flex items-center justify-center font-display font-800 text-xl text-white flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-800 text-xl text-white truncate">{user.name}</h1>
            <p className="text-sm text-forest-400 truncate">{user.email}</p>
            <p className="text-xs text-forest-500 mt-1">Bergabung sejak {joinDate}</p>
          </div>
          <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0">
            <span className="tag-pill text-xs px-3 py-1 rounded-full font-medium">Gratis</span>
            <span className="text-xs text-forest-500">{user.summariesCount || 0} ringkasan</span>
          </div>
        </div>

        {/* Tab navigasi */}
        <div className="flex gap-1 mb-6 border-b border-forest-700 overflow-x-auto scrollbar-thin">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-display font-600 whitespace-nowrap transition-all ${tab === t.id ? 'tab-active' : 'tab-inactive'}`}
            >
              <Icon name={t.icon} size={15} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab: Profil */}
        {tab === 'profil' && (
          <div className="card-glass rounded-2xl p-6 space-y-5">
            <h2 className="font-display font-700 text-base text-white">Informasi Profil</h2>

            <div>
              <label className="text-xs text-forest-400 mb-1.5 block">Nama Lengkap</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-500">
                  <Icon name="user" size={16} />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Masukkan nama Anda"
                  className="input-field w-full pl-9 pr-4 py-3 rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-forest-400 mb-1.5 block">Email</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-500">
                  <Icon name="mail" size={16} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Masukkan email Anda"
                  className="input-field w-full pl-9 pr-4 py-3 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button onClick={handleSaveProfile} className="btn-primary px-6 py-2.5 rounded-xl font-display font-600 text-sm text-white tracking-wide">
                Simpan Perubahan
              </button>
              {saved && (
                <span className="flex items-center gap-1.5 text-xs text-lime-400">
                  <Icon name="check" size={13} />
                  Tersimpan
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tab: Keamanan */}
        {tab === 'keamanan' && (
          <div className="card-glass rounded-2xl p-6 space-y-5">
            <h2 className="font-display font-700 text-base text-white">Ubah Kata Sandi</h2>

            <div>
              <label className="text-xs text-forest-400 mb-1.5 block">Kata Sandi Saat Ini</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-500">
                  <Icon name="lock" size={16} />
                </div>
                <input
                  type={showCurrentPw ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  placeholder="Masukkan kata sandi saat ini"
                  className="input-field w-full pl-9 pr-10 py-3 rounded-xl text-sm"
                />
                <button onClick={() => setShowCurrentPw(!showCurrentPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-500 hover:text-forest-300 transition-colors">
                  <Icon name={showCurrentPw ? 'eyeOff' : 'eye'} size={16} />
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-forest-400 mb-1.5 block">Kata Sandi Baru</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-500">
                  <Icon name="lock" size={16} />
                </div>
                <input
                  type={showNewPw ? 'text' : 'password'}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Masukkan kata sandi baru"
                  className="input-field w-full pl-9 pr-10 py-3 rounded-xl text-sm"
                />
                <button onClick={() => setShowNewPw(!showNewPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-500 hover:text-forest-300 transition-colors">
                  <Icon name={showNewPw ? 'eyeOff' : 'eye'} size={16} />
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-forest-400 mb-1.5 block">Konfirmasi Kata Sandi Baru</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-500">
                  <Icon name="lock" size={16} />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi kata sandi baru"
                  className="input-field w-full pl-9 pr-4 py-3 rounded-xl text-sm"
                />
              </div>
            </div>

            <button className="btn-primary px-6 py-2.5 rounded-xl font-display font-600 text-sm text-white tracking-wide">
              Perbarui Kata Sandi
            </button>
          </div>
        )}

        {/* Tab: Pengaturan */}
        {tab === 'pengaturan' && (
          <div className="space-y-4">
            <div className="card-glass rounded-2xl p-6 space-y-5">
              <h2 className="font-display font-700 text-base text-white">Preferensi AI</h2>
              <p className="text-xs text-forest-400 -mt-2">Pilih layanan AI default untuk ringkasan video.</p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'gemini', label: 'Gemini', desc: 'Google AI' },
                  { id: 'chatgpt', label: 'ChatGPT', desc: 'OpenAI' },
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setDefaultService(s.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${defaultService === s.id ? 'border-lime-500/60 bg-lime-500/10' : 'border-forest-700 hover:border-forest-600'}`}
                  >
                    <p className="font-display font-600 text-sm text-white">{s.label}</p>
                    <p className="text-xs text-forest-500 mt-0.5">{s.desc}</p>
                    {defaultService === s.id && (
                      <span className="inline-flex items-center gap-1 text-xs text-lime-400 mt-2">
                        <Icon name="check" size={11} />
                        Aktif
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1">
                <button onClick={handleSaveSettings} className="btn-primary px-6 py-2.5 rounded-xl font-display font-600 text-sm text-white tracking-wide">
                  Simpan Pengaturan
                </button>
                {saved && (
                  <span className="flex items-center gap-1.5 text-xs text-lime-400">
                    <Icon name="check" size={13} />
                    Tersimpan
                  </span>
                )}
              </div>
            </div>

            <div className="card-glass rounded-2xl p-6">
              <h2 className="font-display font-700 text-base text-white mb-1">Statistik Penggunaan</h2>
              <p className="text-xs text-forest-400 mb-4">Ringkasan video yang telah Anda buat.</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border border-forest-700 text-center">
                  <p className="font-display font-800 text-2xl text-lime-400">{user.summariesCount || 0}</p>
                  <p className="text-xs text-forest-500 mt-1">Total Ringkasan</p>
                </div>
                <div className="p-4 rounded-xl border border-forest-700 text-center">
                  <p className="font-display font-800 text-2xl text-lime-400">2 jam</p>
                  <p className="text-xs text-forest-500 mt-1">Batas Harian</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Keluar */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-forest-400 hover:text-red-400 transition-colors px-4 py-2 rounded-xl hover:bg-red-500/5"
          >
            <Icon name="logOut" size={16} />
            Keluar dari Akun
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
