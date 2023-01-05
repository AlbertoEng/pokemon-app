export interface PokemonList {
    count:    number;
    next:     string;
    previous: string;
    results:  SmallPokemon[];
}

export interface SmallPokemon {
    id:   number;
    img:  string
    name: string;
    url:  string;
}
