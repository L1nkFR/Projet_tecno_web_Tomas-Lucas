'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow text-center">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur votre tableau de bord !</h1>
      <p className="mb-6">Vous êtes maintenant connecté.</p>

      <div className="flex justify-center gap-4 mb-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => router.push('/recherche')}
        >
          Recherche
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => router.push('/proposer')}
        >
          Proposer
        </button>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          onClick={() => router.push('/statistiques')}
        >
          Statistiques
        </button>
      </div>

      <button
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        //onClick={handleLogout}
      >
        Se déconnecter
      </button>
    </div>
  );
}
