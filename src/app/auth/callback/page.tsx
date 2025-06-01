'use client';

import { useEffect } from 'react';

import { redirect, useSearchParams } from 'next/navigation';

import Api from '@/api';
import { LoadingPage } from '@/component/loading';

export default function Page() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) return;
    Api.Request.setToken(token).then(() => {
      redirect('/');
    });
  }, [searchParams.get('token')]);

  return <LoadingPage />;
}
