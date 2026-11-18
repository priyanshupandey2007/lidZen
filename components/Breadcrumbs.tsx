import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  title?: string;
  category?: string;
}

export default function Breadcrumbs({ title, category }: BreadcrumbsProps) {
  const router = useRouter();

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 font-mono">
      <Link
        href="/"
        className="flex items-center gap-1 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition"
      >
        <Home size={13} />
        <span>Home</span>
      </Link>
      <ChevronRight size={12} className="text-slate-400 dark:text-zinc-600" />
      <Link
        href="/docs"
        className="text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition"
      >
        Docs
      </Link>
      {category && (
        <>
          <ChevronRight size={12} className="text-slate-400 dark:text-zinc-600" />
          <span className="text-slate-400 dark:text-zinc-500">{category}</span>
        </>
      )}
      {title && (
        <>
          <ChevronRight size={12} className="text-slate-400 dark:text-zinc-600" />
          <span className="font-semibold text-accent-600 dark:text-accent-300">{title}</span>
        </>
      )}
    </nav>
  );
}
