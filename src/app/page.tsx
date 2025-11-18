'use client';

import { useState } from 'react';
import { ItemProps } from '@/types/Item';

export default function Home() {
  const apps: ItemProps[] = [
    { title: 'App 5s', icon: '📋', url: 'http://192.168.0.18:3001/', description: 'System for performing 5S methodology audits.'},
    { title: 'Dashboard 5s', icon: '📊', url: 'http://192.168.0.18:3001/ui/dashboard', description: 'Dashboard for visualizing 5S audit results.' },
    { title: 'IF Music', icon: '🎵', url: 'http://192.168.0.18:9078/', description: 'Local music player for on-site streaming.' },
    { title: 'File server', icon: '🗄️', url: 'http://192.168.0.99:8081/', description: 'Local server for managing and accessing shared files.' },
    { title: 'Book catalog', icon: '📚', url: 'https://docs.google.com/spreadsheets/d/1Qd5tLyTvan9-EJuW2g_UYQaV7HRADrMuA402mDRNo2o/edit?gid=921363456#gid=921363456', description: 'Google spreadsheet with the available book catalog.' },
    { title: 'Snack times', icon: '🍔', url: 'https://docs.google.com/spreadsheets/d/1Ti7rzzUv6jqkb_9ih_zK3D9nyJwS8kPiTagHesTGHq4/edit?gid=0#gid=0', description: 'Google spreadsheet containing the snack schedule.' },
  ];

  const [search, setSearch] = useState('');

  const filteredApps = apps.filter(app =>
    app.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fba91f] to-[#202020] flex items-center justify-center p-6">

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-2xl">
      
        <h1 className="text-2xl font-semibold text-white mb-1">AppHub</h1>
        <p className="text-gray-200 mb-4 text-sm">Applications</p>

        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full p-2 mb-6 rounded-xl bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
        />

        <div className="grid grid-cols-2 gap-4">
          {filteredApps.length > 0 ? (
            filteredApps.map((app, index) => (
              <div
                key={index}
                className="
                  bg-black/50 backdrop-blur-xl border border-black/10 shadow-lg rounded-xl p-4 flex items-center gap-3 transition hover:bg-black/70 cursor-pointer"
                onClick={() => window.open(app.url, '_blank')}
              >
                <span className="text-2xl">{app.icon}</span>
                <div>
                  <p className="text-white font-medium">{app.title}</p>
                  <p className="text-gray-200 text-xs break">{app.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-300 col-span-2">No applications found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
