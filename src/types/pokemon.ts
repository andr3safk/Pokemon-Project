export interface Pokemon {
    name: string;
    url: string;
}

export interface PokemonCardData {
    name: string;
    id: number;
    type: string[];
    sprite: string | null;
}