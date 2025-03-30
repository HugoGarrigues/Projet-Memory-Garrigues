export interface Card {
  id: number;
  front: string;
  back: string;
  level: number;
  lastReviewed: Date;
  nextReviewDate: Date;
  themeId: number;
  // TODO : Ajouter les médias
}
