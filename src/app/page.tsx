'use client';

import { useState } from 'react';

import {
  LogIn,
  MessageCircleMore,
} from 'lucide-react';

import { Separator } from '@/components/ui/separator';

import { apps } from "@/lib/link";

import { AppCard } from './_components/card/AppCard';
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
      <div className="min-h-screen bg-gradient-to-br from-[#fba91f] to-[#202020] flex items-center justify-center px-4 py-6">
        
        <div className="relative w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-lg p-4 sm:p-6 md:p-8">

          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-white">
                AppHub
              </h1>
              <p className="text-gray-200 text-sm mt-1">
                Aplicativos
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSuggestionDialogOpen(true)}
                className="p-2 rounded-md hover:bg-white/10 transition"
                aria-label="Abrir sugestões"
              >
                <MessageCircleMore className="text-white w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={() => setIsLoginDialogOpen(true)}
                className="p-2 rounded-md hover:bg-white/10 transition"
                aria-label="Login"
              >
                <LogIn className="text-white w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          <Separator className="my-5 bg-white/20" />

          <input
            type="text"
            placeholder="Buscar"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full p-3 rounded-md bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-white/30 text-sm sm:text-base"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <AppCard item={app} key={app.id} />
              ))
            ) : (
              <p className="text-sm text-gray-300 col-span-full text-center">
                No applications found.
              </p>
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
