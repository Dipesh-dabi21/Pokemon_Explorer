import axios from "axios";
import {
  PokemonDetail,
  PokemonListItem,
  PokemonListResponse,
} from "@/types/pokemon";

const API_BASE_URL = "https://pokeapi.co/api/v2";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export async function getPokemonList(
  limit = 151,
  offset = 0,
): Promise<PokemonListItem[]> {
  try {
    const response = await api.get<PokemonListResponse>(`/pokemon`, {
      params: { limit, offset },
    });

    const pokemons: PokemonListItem[] = response.data.results.map((item) => {
      const segments = item.url.split("/").filter(Boolean);
      const id = parseInt(segments[segments.length - 1], 10);

      return {
        id,
        name: item.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      };
    });

    return pokemons;
  } catch (error) {
    console.error("Error fetching pokemon list:", error);
    throw new Error("Failed to fetch pokemon list");
  }
}

export async function getPokemonDetail(
  idOrName: string,
): Promise<PokemonDetail | null> {
  if (!idOrName) {
    console.error(
      "getPokemonDetail received an undefined or empty idOrName parameter",
    );
    return null;
  }

  try {
    const cleanId = String(idOrName).trim().toLowerCase();
    const response = await api.get<PokemonDetail>(`/pokemon/${cleanId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching pokemon detail for ${idOrName}:`, error);
    return null;
  }
}

export const TYPE_COLORS: Record<string, string> = {
  normal: "bg-stone-400 text-white",
  fire: "bg-red-500 text-white",
  water: "bg-blue-500 text-white",
  electric: "bg-amber-400 text-black",
  grass: "bg-emerald-500 text-white",
  ice: "bg-cyan-400 text-black",
  fighting: "bg-orange-700 text-white",
  poison: "bg-purple-600 text-white",
  ground: "bg-amber-600 text-white",
  flying: "bg-indigo-400 text-white",
  psychic: "bg-pink-500 text-white",
  bug: "bg-lime-600 text-white",
  rock: "bg-yellow-700 text-white",
  ghost: "bg-purple-800 text-white",
  dragon: "bg-indigo-700 text-white",
  steel: "bg-slate-400 text-white",
  fairy: "bg-pink-300 text-black",
};
