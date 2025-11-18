'use client';

import { useState } from 'react';
import { ItemComponent } from './_components/ItemComponent';
import { ItemProps } from '@/types/Item';

export default function Home() {
  const apps: ItemProps[] = [
    { title: 'App 5s', icon: '📋', url: 'http://192.168.0.18:3001/' },
    { title: 'Dashboard 5s', icon: '📊', url: 'http://192.168.0.18:3001/ui/dashboard' },
    { title: 'Certificate', icon: '🪪', url: 'http://192.168.0.99:3000/' },
    { title: 'IF Music', icon: '🎵', url: 'http://192.168.0.18:9078/' },
    { title: 'Service evaluation', icon: '🌟', url: 'http://192.168.0.18:8284/' },
    // { title: 'Conta Azul', icon: '🔗', url: '/contaazul' },
    // { title: 'Hype Pro Financeiro', icon: '📈', url: 'https://hype-pro-financeiro.vercel.app' },
    { title: 'FocusBoard', icon: '🎯', url: 'http://192.168.0.18:3000/' },
    { title: 'File server', icon: '🗄️', url: 'http://192.168.0.99:8081/' },
    { title: 'Book catalog', icon: '📚', url: 'https://docs.google.com/spreadsheets/d/1Qd5tLyTvan9-EJuW2g_UYQaV7HRADrMuA402mDRNo2o/edit?gid=921363456#gid=921363456' },
    { title: 'Snack times', icon: '🍔', url: 'https://docs.google.com/spreadsheets/d/1Ti7rzzUv6jqkb_9ih_zK3D9nyJwS8kPiTagHesTGHq4/edit?gid=0#gid=0' },   
  ];

  const [search, setSearch] = useState('');

  const filteredApps = apps.filter(app =>
    app.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">AppHub</h1>
        <p className="text-gray-600 mb-4 text-sm">Applications</p>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full p-2 mb-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />
        <div className="grid grid-cols-4 gap-4 justify-items-center">
          {filteredApps.length > 0 ? (
            filteredApps.map((app, index) => (
              <ItemComponent key={index} title={app.title} icon={app.icon} url={app.url} />
            ))
          ) : (
            <p className="text-sm text-gray-500 col-span-4">No applications found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
