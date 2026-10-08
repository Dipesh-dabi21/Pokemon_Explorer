# Pokémon Explorer

A responsive Pokémon Explorer application built using Next.js (App Router), TypeScript, and Tailwind CSS. Data is dynamically fetched from [PokeAPI](https://pokeapi.co/).

## Features
- **Homepage**: Displays cards for the initial Generation 1 Pokémon with image, ID, and name.
- **Client-Side Search**: Live search bar filtering Pokemons dynamically by name.
- **Dynamic Route Detail Page**: Deep dive into individual Pokémon metrics (`/pokemon/[id]`) showing artwork, height, weight, stats bars, abilities, and top moves.
- **Performance Optimized**: Uses Static Site Generation (`generateStaticParams`) and revalidation caching for fast page loading times.
- **Responsive Design**: Built mobile-first using Tailwind CSS dark-mode styling.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <YOUR_REPOSITORY_LINK>
   cd pokemon-explorer