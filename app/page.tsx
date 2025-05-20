'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, action: isLogin ? 'login' : 'register' }),
    });

    const data = await res.json();
    if (data.success) {
      router.push('/home');
    } else {
      setMessage(data.message || 'Erreur');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{isLogin ? 'Connexion' : 'Créer un compte'}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border p-2 rounded" />
        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required className="border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">{isLogin ? 'Se connecter' : 'Créer un compte'}</button>
        <button type="button" className="text-sm text-blue-600 underline" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Créer un compte' : 'J’ai déjà un compte'}
        </button>
      </form>
      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
}
