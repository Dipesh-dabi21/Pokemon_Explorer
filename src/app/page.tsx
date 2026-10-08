"use client";

import { useEffect, useState } from "react";
import { getPokemonList } from "@/lib/pokeapi";
import { PokemonListItem } from "@/types/pokemon";
import { PokemonCard } from "@/components/PokemonCard";
import { SearchBar } from "@/components/SearchBar";

export default function HomePage() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Fetch original 151 pokemons
        const data = await getPokemonList(151, 0);
        setPokemons(data);
      } catch (err) {
        setError("Failed to load Pokémon. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase().trim()),
  );

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mb-2">
          Explore Pokémon
        </h1>
        <p className="text-sm text-slate-400">
          Search and click on any Pokémon to inspect its stats, abilities, and
          moves.
        </p>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      {error && (
        <div className="text-center text-red-400 py-10 bg-slate-800/50 rounded-xl border border-red-500/20">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 15 }).map((_, idx) => (
            <div
              key={idx}
              className="h-44 bg-slate-800/60 rounded-2xl animate-pulse border border-slate-700/50"
            />
          ))}
        </div>
      ) : (
        <>
          {filteredPokemons.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              No Pokémon found matching &quot;{search}&quot;
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredPokemons.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
