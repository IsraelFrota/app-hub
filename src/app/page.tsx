'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from "@hookform/resolvers/zod";

import {
  LogIn,
  MessageCircleMore,
} from 'lucide-react';

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from '@/components/ui/dialog';
import { toast } from "sonner";
import { Separator } from '@/components/ui/separator';

import { FeedbackForm } from './_components/FeedbackForm';

import {
  FeedbackType,
  feedbackSchema,
} from "@/schema/feedbackSchema";

import { ItemProps } from '@/types/Item';
import { Form } from './_components/Form';
import { Button } from '@/components/ui/button';

import { loginAction } from "@/app/_server/action";

export default function Home() {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const [openDialogFormLogin, setOpenDialogFormLogin] = useState(false);

  const apps: ItemProps[] = [
    { title: 'App 5S', icon: '📋', url: 'http://192.168.0.18:3001/', description: 'Sistema para realização de auditorias da metodologia 5S.' },
    { title: 'Critérios de Auditoria', icon: '📖', url: 'https://docs.google.com/spreadsheets/d/10YdvT6qfqdJuHmHZp_KXCZ_8DV_h6C1bkgpsDwVKqsY/edit?usp=sharing', description: 'Planilha com os critérios de avaliação para a auditoria 5S.' },
    { title: 'Catálogo de Livros', icon: '📚', url: 'https://docs.google.com/spreadsheets/d/1Qd5tLyTvan9-EJuW2g_UYQaV7HRADrMuA402mDRNo2o/edit?gid=921363456#gid=921363456', description: 'Planilha do Google com o catálogo de livros disponíveis.' },
    { title: 'Dashboard 5S', icon: '📊', url: 'http://192.168.0.18:3001/ui/dashboard', description: 'Painel para visualização dos resultados das auditorias 5S.' },
    { title: 'IF Music', icon: '🎵', url: 'http://192.168.0.18:9078/', description: 'Player de música local para streaming interno.' },
    { title: 'IF Controle de Ponto', icon: '🕰️', url: 'http://192.168.0.18:3008/', description: 'Sistema digital de controle de ponto para estagiários.' },
    { title: 'Servidor de Arquivos', icon: '🗄️', url: 'http://192.168.0.99:8081/', description: 'Servidor local para gerenciamento e acesso a arquivos compartilhados.' },
    { title: 'Office Track', icon: '🗂️', url: 'http://192.168.0.18:3010/', description: 'Sistema para colaboração e organização das atividades da empresa no setor de recursos humanos.' },
    { title: 'Horário do Lanche', icon: '🍔', url: 'https://docs.google.com/spreadsheets/d/1Ti7rzzUv6jqkb_9ih_zK3D9nyJwS8kPiTagHesTGHq4/edit?gid=0#gid=0', description: 'Planilha do Google contendo o cronograma de lanches.' },
    { title: 'Feedbacks', icon: '📃', url: '/feedback', description: 'Página com os feedbacks e sugestões dos colaboradores.' },
  ];

  const [search, setSearch] = useState('');

  const filteredApps = apps.filter(app =>
    app.title.toLowerCase().includes(search.toLowerCase())
  );

  const feedbackForm = useForm<FeedbackType>({
    resolver: zodResolver(feedbackSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      suggestion: "",
      type: "suggestion",
      date: `${new Date()}`,
      vote: 0,
    }
  });

  async function onSubmit(values: FeedbackType) {
    setLoading(true);
    try {
      const response = await fetch("/api/mongo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: values.name,
          suggestion: values.suggestion,
          date: values.date,
          type: values.type,
          vote: 0,
        }),
      });

      if (!response.ok) {
        toast.error("Error ao registrar seu feedback");
        return;
      }

      toast.success("Feedback registrado com sucesso!");
      setOpenDialog(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fba91f] to-[#202020] flex items-center justify-center p-6">
      <LogIn 
        size={24}
        className="absolute right-3 top-5 text-white hover:cursor-pointer hover:text-gray-200"
        onClick={() => setOpenDialogFormLogin(true)}
      />

      <Dialog
        open={openDialogFormLogin}
        onOpenChange={setOpenDialogFormLogin}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login da gestão</DialogTitle>
          </DialogHeader>
          <Form onSubmit={async (e) => {
              e.preventDefault();

              const data = new FormData(e.currentTarget);
              const email = data.get('email') as string;
              const password = data.get('password') as string;

              if (email && password) {
                const response = await fetch("/api/user", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    email,
                    password,
                  }),
                });

                if (response.ok) {
                  loginAction({ email, password });
                  setOpenDialogFormLogin(false);
                }
              }
            }}
            className="flex flex-col justify-center items-center space-y-4 border"
          >
            <Form.Header>
              <h1 className="text-xl font-semibold">Informe suas credenciais</h1>
            </Form.Header>

            <Form.Field className="w-1/2">
              <Form.Label htmlFor="email">E-mail</Form.Label>
              <Form.Input id="email" name="email" type="email" required className="border-gray-300 w-full" />
            </Form.Field>

            <Form.Field className="w-1/2">
              <Form.Label htmlFor="password">Senha</Form.Label>
              <Form.Input id="password" name="password" type="password" required className="border-gray-300 w-full" />
            </Form.Field>

            <Form.Footer>
              <Button type="submit" className="text-xs">Enviar</Button>
            </Form.Footer>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-2xl">

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">AppHub</h1>
            <p className="text-gray-200 mb-4 text-sm">Aplicativos</p>
          </div>
          
          <MessageCircleMore 
            size={24}
            className="text-white hover:cursor-pointer hover:text-[#202020]"
            onClick={() => setOpenDialog(true)}
          />
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Feedback de melhoria</DialogTitle>
            </DialogHeader>
            <Separator />
            <FeedbackForm feedbackForm={feedbackForm} onSubmit={onSubmit} loading={loading} />
          </DialogContent>
        </Dialog>

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
  );
}
