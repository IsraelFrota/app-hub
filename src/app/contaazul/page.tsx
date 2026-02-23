'use client';

import { SiLinux } from 'react-icons/si';

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ContaAzul() {
  async function handleRedirectToContaAzul() {
    const res = await fetch('/api/contaazul/auth');
    const { url } = await res.json();

    window.location.href = url;
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <Card className='w-full max-w-md shadow-lg rounded-2xl'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-xl font-bold'>
            <SiLinux size={24} />
            Conectar à Conta Azul
          </CardTitle>
          <CardDescription>
            Conecte sua conta para sincronizar dados financeiros.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button
            onClick={handleRedirectToContaAzul}
            className='w-full bg-blue-600 hover:bg-blue-700 text-white'
          >
            Conectar com Conta Azul
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}