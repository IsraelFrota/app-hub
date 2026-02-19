'use client';

import { useState } from 'react';

import {
  LogIn,
  MessageCircleMore,
} from 'lucide-react';

import { Separator } from '@/components/ui/separator';

import { apps } from "@/lib/link";

import { AppDialog } from './_components/dialog/AppDialog';
import { LoginFormContainer } from './_components/auth/LoginFormContainer';
import { SuggestionFormContainer } from './_components/suggestion/SuggestionFormContainer';

export default function Home() {
  const [search, setSearch] = useState('');
  
  const [isSuggestionDialogOpen, setIsSuggestionDialogOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const filteredApps = apps.filter(app =>
    app.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#fba91f] to-[#202020] flex items-center justify-center p-6">
        <LogIn 
          size={24}
          className="absolute right-3 top-5 text-white hover:cursor-pointer hover:text-gray-200"
          onClick={() => setIsLoginDialogOpen(true)}
        />

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-2xl">

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-white mb-1">AppHub</h1>
              <p className="text-gray-200 mb-4 text-sm">Aplicativos</p>
            </div>
            
            <MessageCircleMore 
              size={24}
              className="text-white hover:cursor-pointer hover:text-[#202020]"
              onClick={() => setIsSuggestionDialogOpen(true)}
            />
          </div>

          <Separator />

          <input
            type="text"
            placeholder="Buscar"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full p-2 mb-6 mt-5 rounded-xl bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
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

      <AppDialog
        title="Autenticação da Gestão"
        open={isLoginDialogOpen}
        onOpenChange={setIsLoginDialogOpen}
      >
        <LoginFormContainer />
      </AppDialog>
      
      <AppDialog
        title="Sugestões e Feedbacks de Melhorias"
        open={isSuggestionDialogOpen}
        onOpenChange={setIsSuggestionDialogOpen}
      >
        <SuggestionFormContainer />
      </AppDialog>
    </>
  );
}
