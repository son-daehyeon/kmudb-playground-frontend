'use client';

import { useEffect } from 'react';

import { redirect } from 'next/navigation';

import { LoadingPage } from '@/component/loading';

export default function Page() {
  useEffect(() => {
    redirect('/playground');
  }, []);

  return (
    <div className="w-full">
      <LoadingPage />
    </div>
  );
}
