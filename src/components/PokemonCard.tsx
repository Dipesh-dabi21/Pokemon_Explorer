import Link from "next/link";
import Image from "next/image";
import { PokemonListItem } from "@/types/pokemon";

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`;

  return (
    <Link href={`/pokemon/${pokemon.id}`} className="group">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex flex-col items-center justify-center hover:border-rose-500/50 hover:shadow-lg hover:shadow-rose-500/10 hover:-translate-y-1 transition-all duration-300">
        <span className="self-end text-xs font-mono font-semibold text-slate-400">
          {formattedId}
        </span>

        <div className="relative w-28 h-28 my-2">
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            fill
            sizes="112px"
            priority={pokemon.id <= 20}
            className="object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <h3 className="capitalize font-semibold text-slate-100 tracking-wide text-base mt-2">
          {pokemon.name}
        </h3>
      </div>
    </Link>
  );
};
