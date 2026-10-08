import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full border-2 border-rose-500 flex items-center justify-center relative overflow-hidden bg-white">
            <div className="w-full h-1/2 bg-rose-500 absolute top-0" />
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full z-10 border border-white" />
          </div>
          <span className="font-bold text-lg text-slate-100 group-hover:text-rose-400 transition-colors">
            PokéExplorer
          </span>
        </Link>
        <nav className="text-xs text-slate-400">Powered by PokeAPI</nav>
      </div>
    </header>
  );
};
