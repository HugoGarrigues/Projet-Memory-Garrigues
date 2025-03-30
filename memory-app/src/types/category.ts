import { Theme } from "./theme";

export interface Category {
    id: number;
    name: string;
    themes: Theme[]; 
  }
