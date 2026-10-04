import type { Pokemon, PokemonCardData } from "../types/pokemon";

export async function getPokemones(): Promise<PokemonCardData[]> {
    const respuesta = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=135&offset=251"
    );

    const infoPokemon = await respuesta.json();

    const pokemones: PokemonCardData[] = await Promise.all(
        infoPokemon.results.map(async (pokemon: Pokemon) => {
            const respuesta = await fetch(pokemon.url);
            const datos = await respuesta.json();

            const type: string[] = datos.types.map(
                (infoTipo: { type: { name: string } }) => infoTipo.type.name
            );

            return {
                name: datos.name,
                id: datos.id,
                type,
                sprite: datos.sprites.front_default
            };
        })
    );

    return pokemones;
}