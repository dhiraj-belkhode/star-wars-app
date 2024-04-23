import { HomeWorld } from "./HomeWorld.type";

export interface Character {
  name: string;
  height: string;
  hair_color: string;
  eye_color: string;
  gender: string;
  homeworld: string;
  films: string[];
  url: string;
}

export interface CharaterWithHomeWorld extends Character {
  homeworldData: HomeWorld;
}
