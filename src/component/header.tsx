import Link from 'next/link';

import { useUserStore } from '@/store/user.store';
import { Database } from 'lucide-react';

export default function Header() {
  const { user } = useUserStore();

  if (!user) return null;

  return (
    <header className="absolute z-10 w-full bg-white shadow-sm">
      <div className="flex items-center justify-between px-8 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Database className="size-6 text-blue-500" />
          <span className="text-xl font-semibold">KMU:DB Playground</span>
        </Link>
        <span className="text-base font-medium text-neutral-700">{user.nickname}</span>
      </div>
    </header>
  );
}
