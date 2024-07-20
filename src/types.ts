export interface IPokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: string[];
}

export interface IResult {
  name: string;
  url: string;
}
export interface IPokemonList {
  count: number;
  next: string;
  previous?: string;
  results: IResult[];
}
