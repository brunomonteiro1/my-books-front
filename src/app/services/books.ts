import { IBooks, IEditBook } from '../interfaces/bookInterface';
import { api, apiExternal } from './api';

export async function getBooks() {
  const books = await api.get('/books');

  return books.data;
}

export async function findBooks(title: string) {
  const books = await apiExternal.get(`/books?q=${title}`);

  return books.data;
}

export async function registerBooks(data: IBooks) {
  const books = await api.post('/books', data);

  return books;
}

export async function deleteBooks(id: string) {
  await api.delete(`/books`, { data: { id } });

  return;
}

export async function updateBooks(data: IEditBook) {
  await api.patch(`/books`, data);

  return;
}
