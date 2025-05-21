'use client';

import { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

export default function StatistiquesPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/disponibilites')
      .then(res => res.json())
      .then(setData);
  }, []);

  // Stats type matériel/compétence
  const typeCount = [
    { name: 'Matériel', value: data.filter(d => d.type === 'matériel').length },
    { name: 'Compétence', value: data.filter(d => d.type === 'compétence').length },
  ];

  // Stats par catégorie
  const categories = [...new Set(data.map(d => d.categorie))];
  const categoryCount = categories.map(cat => ({
    name: cat,
    count: data.filter(d => d.categorie === cat).length
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Statistiques sur les ressources partagées</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Graphe type */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Répartition type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={typeCount} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {typeCount.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Graphe catégories */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Répartition par catégorie</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryCount}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
