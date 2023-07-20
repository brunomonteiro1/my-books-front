export interface IBookApi {
  title: string;
  authors: string;
  image_url: string;
  num_pages: number;
  dateStart: string | null;
  dateEnd: string | null;
  rating: number;
  description: string;
}

export interface IBooks {
  id?: string;
  title: string;
  author: string;
  imageUrl: string;
  rating: number;
  dateStart: string | null;
  dateEnd: string | null;
  pages: number;
  description: string;
}

export interface IEditBook {
  id: string;
  rating: number;
  dateStart: string | null;
  dateEnd: string | null;
}
