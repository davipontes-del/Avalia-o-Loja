export enum Screen {
  RATING,
  COMMENT,
  THANKS,
  ADMIN,
}

export interface Evaluation {
  id: string;
  rating: number;
  comment: string | null;
  timestamp: string;
}
