'use client';

import Image from 'next/image';
import { useState } from 'react';

import { IBooks } from '@/app/interfaces/bookInterface';
import { deleteBooks, getBooks } from '@/app/services/books';
import { Rating } from '@smastrom/react-rating';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import '@smastrom/react-rating/style.css';

import ModalEditBook from '../ModalEditBook';

export function CardBooks() {
  const [isOpenModal, setIsOpenModal] = useState({
    open: false,
    id: '',
    rating: 0,
    dateStart: '',
    dateEnd: ''
  });

  const queryClient = useQueryClient();

  const { data } = useQuery(['books'], () => getBooks());

  async function handleDeleteBooks(id: string) {
    await deleteBooks(id);
  }

  const { mutate: deleteBook } = useMutation(handleDeleteBooks, {
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  });

  return (
    <div
      className='
        mt-5 flex h-[600px] w-full flex-col items-end gap-y-6 overflow-y-scroll'
    >
      <ModalEditBook openModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
      {data?.map((book: IBooks) => (
        <div key={book.id} className='flex w-full space-x-4'>
          <div className='relative h-full w-40 '>
            <Image src={book.imageUrl} alt='imagem do livro' fill={true} />
          </div>
          <div className='flex flex-col gap-y-4'>
            <h1 className='text-base'>{book.title}</h1>
            <p className='text-xs text-[#00AA9E]'>{book.author}</p>
            <Rating style={{ maxWidth: 120 }} value={book.rating} readOnly />
            <p className='text-xs'>
              Você começou a ler em:{' '}
              {book.dateStart == null
                ? 'Informe uma data'
                : dayjs(book.dateStart).format('DD/MM/YYYY')}
            </p>
            <p className='text-xs'>
              Você terminou a ler em:{' '}
              {book.dateEnd == null
                ? 'Informe uma data'
                : dayjs(book.dateEnd).format('DD/MM/YYYY')}
            </p>
            <div className='flex gap-4'>
              <button
                className='w-20 rounded-lg bg-red-500 py-2 text-white'
                type='button'
                onClick={() => deleteBook(book.id ?? '')}
              >
                Deletar
              </button>
              <button
                className='w-20 rounded-lg bg-blue-500 py-2 text-white'
                type='submit'
                onClick={() =>
                  setIsOpenModal({
                    open: true,
                    id: book.id ?? '',
                    rating: book.rating,
                    dateStart: book.dateStart ?? '',
                    dateEnd: book.dateEnd ?? ''
                  })
                }
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
