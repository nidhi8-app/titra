export type Deck = {
  id: string;
  title: string;
};

export type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
};
