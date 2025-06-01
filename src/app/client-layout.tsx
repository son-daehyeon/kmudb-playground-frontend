'use client';

import { ReactNode, useEffect } from 'react';

import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';

import { cn } from '@/lib/util';

import Api from '@/api';
import Header from '@/component/header';
import { LoadingPage } from '@/component/loading';
import { useApi } from '@/hook/use-api';
import { useInitStore } from '@/store/init.store';
import { useProblemsStore } from '@/store/problems.store';
import { useUserStore } from '@/store/user.store';
import { Toaster } from 'sonner';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();

  const { isInit, setInit } = useInitStore();
  const { user } = useUserStore();
  const { problems, setProblems } = useProblemsStore();

  const [isProblemsFetching, startProblemsFetching] = useApi();

  useEffect(() => {
    if (!isInit || !user) return;
    startProblemsFetching(async () => {
      const response = await Api.Domain.Problem.getProblems();
      setProblems(response);
    });
  }, [isInit, user]);

  useEffect(() => {
    if (!isInit || user) return;
    if (pathname === '/auth/callback') return;
    redirect(process.env.NEXT_PUBLIC_API_URL + '/api/auth/kakao/login');
  }, [isInit]);

  useEffect(() => {
    setInit(false);

    (async () => {
      const token = localStorage.getItem('token');

      if (token) {
        await Api.Request.setToken(token);
      }

      setInit(true);
    })();
  }, []);

  if (!isInit || isProblemsFetching) return <LoadingPage />;

  return (
    <>
      <Header />
      <main className="flex h-[100dvh] w-full overflow-hidden pt-15">
        <section className="flex h-full w-16 flex-col gap-2 overflow-y-auto border-r p-2">
          <Link
            href="/playground"
            className={cn(
              'flex aspect-square items-center justify-center rounded-lg border text-sm hover:border-blue-100 hover:bg-blue-50',
              pathname === '/playground' &&
                'border-blue-500 bg-blue-500 text-white hover:border-blue-500 hover:bg-blue-500',
            )}
          >
            PG
          </Link>
          {problems?.problems.map((problem) => (
            <Link
              key={problem.id}
              href={`/${problem.id}`}
              className={cn(
                'flex aspect-square items-center justify-center rounded-lg border text-sm hover:border-blue-100 hover:bg-blue-50',
                problem.solved &&
                  'border-green-300 bg-green-100 hover:border-green-300 hover:bg-green-100',
                pathname === `/${problem.id}` &&
                  'border-blue-500 bg-blue-500 text-white hover:border-blue-500 hover:bg-blue-500',
              )}
            >
              {problem.id}
            </Link>
          ))}
        </section>
        {children}
      </main>
      <Toaster className="font-sans" />
    </>
  );
}
