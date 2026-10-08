import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPokemonDetail, TYPE_COLORS } from "@/lib/pokeapi";
import { StatBar } from "@/components/StatBar";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return Array.from({ length: 151 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default async function PokemonDetailPage({ params }: PageProps) {
  // Await the asynchronous params promise (Required in Next.js 15+)
  const resolvedParams = await params;
  const pokemon = await getPokemonDetail(resolvedParams.id);

  if (!pokemon) {
    notFound();
  }

  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`;
  const mainImage =
    pokemon.sprites.other["official-artwork"].front_default ||
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-slate-400 hover:text-slate-100 mb-6 transition-colors"
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Explorer
      </Link>

      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column: Image & Basic Info */}
          <div className="flex flex-col items-center bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
            <span className="text-sm font-mono font-bold text-slate-400 self-end">
              {formattedId}
            </span>
            <div className="relative w-56 h-56 my-4">
              <Image
                src={mainImage}
                alt={pokemon.name}
                fill
                priority
                sizes="224px"
                className="object-contain"
              />
            </div>
            <h1 className="text-3xl font-extrabold capitalize text-slate-100 tracking-wide mb-3">
              {pokemon.name}
            </h1>

            {/* Types */}
            <div className="flex gap-2 mb-4">
              {pokemon.types.map((t) => {
                const typeName = t.type.name;
                const colorClass =
                  TYPE_COLORS[typeName] || "bg-slate-600 text-white";
                return (
                  <span
                    key={typeName}
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize tracking-wide ${colorClass}`}
                  >
                    {typeName}
                  </span>
                );
              })}
            </div>

            {/* Physical Attributes */}
            <div className="flex justify-around w-full mt-2 pt-4 border-t border-slate-800 text-center text-xs">
              <div>
                <span className="text-slate-400 block mb-1">Height</span>
                <span className="font-semibold text-slate-200">
                  {(pokemon.height / 10).toFixed(1)} m
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Weight</span>
                <span className="font-semibold text-slate-200">
                  {(pokemon.weight / 10).toFixed(1)} kg
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Stats & Abilities */}
          <div className="flex flex-col justify-between space-y-6">
            {/* Stats */}
            <div>
              <h2 className="text-lg font-bold text-slate-100 mb-4 border-b border-slate-700 pb-2">
                Base Stats
              </h2>
              <div>
                {pokemon.stats.map((s) => (
                  <StatBar
                    key={s.stat.name}
                    label={s.stat.name.replace("-", " ")}
                    value={s.base_stat}
                  />
                ))}
              </div>
            </div>

            {/* Abilities */}
            <div>
              <h2 className="text-sm font-bold text-slate-100 mb-2">
                Abilities
              </h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((a) => (
                  <span
                    key={a.ability.name}
                    className="bg-slate-700/80 text-slate-200 text-xs px-3 py-1.5 rounded-lg capitalize border border-slate-600"
                  >
                    {a.ability.name.replace("-", " ")}
                    {a.is_hidden && (
                      <span className="text-slate-400 text-[10px] ml-1">
                        (Hidden)
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Moves */}
            <div>
              <h2 className="text-sm font-bold text-slate-100 mb-2">
                Popular Moves
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {pokemon.moves.slice(0, 6).map((m) => (
                  <span
                    key={m.move.name}
                    className="bg-slate-900 text-slate-400 text-[11px] px-2.5 py-1 rounded capitalize"
                  >
                    {m.move.name.replace("-", " ")}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
