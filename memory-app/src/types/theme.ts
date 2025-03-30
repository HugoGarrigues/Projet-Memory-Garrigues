import { Card } from "./card";

export interface Theme {
    id: number;
    name: string;
    categoryId: number; 
    cards: Card[];  
    selected: boolean;
    revisionLevels: number; 
    newCardsPerDay: number;
  }