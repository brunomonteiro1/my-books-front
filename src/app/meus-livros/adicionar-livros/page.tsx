'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { IBookApi } from '@/app/interfaces/bookInterface';
import { findBooks, registerBooks } from '@/app/services/books';
import {
  faAngleRight,
  faHouse,
  faMagnifyingGlass,
  faMinus,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

export default function ToAddBooks() {
  const [search, setSearch] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [bookData, setBookData] = useState<IBookApi | null>(null);
  const router = useRouter();

  const { data } = useQuery(['books', search], () =>
    search.length >= 3 ? findBooks(search) : null
  );

  const dateStartFormated =
    dateStart === '' ? null : dayjs(dateStart).toISOString();
  const dateEndFormated = dateEnd === '' ? null : dayjs(dateEnd).toISOString();

  function registerCard(book: IBookApi) {
    setBookData(book);
    setSearch('');
  }

  async function handleRegisterBooks(bookData: IBookApi) {
    await registerBooks({
      title: bookData?.title,
      author: bookData?.authors,
      pages: bookData?.num_pages,
      dateStart: dateStartFormated,
      dateEnd: dateEndFormated,
      imageUrl: bookData?.image_url,
      rating: rating,
      description: description
    }).then(r => router.push('/'));
    
  }

  function increaseRating() {
    if (rating < 5) {
      setRating(rating + 1);
    }
  }

  function decreaseRating() {
    if (rating > 0) {
      setRating(rating - 1);
    }
  }

  return (
    <main className='flex flex-1 flex-col items-center'>
      <div
        className='
          0 mt-6 flex w-full flex-col md:w-2/3 lg:w-[58%]'
      >
        <div className='space-y-3'>
          <nav aria-label='Breadcrumb'>
            <ol className='flex items-center gap-1 text-sm text-gray-600'>
              <li>
                <Link
                  className='block transition hover:text-gray-700'
                  href={'/'}
                >
                  <FontAwesomeIcon icon={faHouse} width={15} />
                  <span className='sr-only'> Home </span>
                </Link>
              </li>

              <li className='rtl:rotate-180'>
                <FontAwesomeIcon icon={faAngleRight} width={8} />
              </li>

              <li>
                <Link
                  className='block transition hover:text-gray-700'
                  href={'/'}
                >
                  {' '}
                  Meus livros
                </Link>
              </li>

              <li className='rtl:rotate-180'>
                <FontAwesomeIcon icon={faAngleRight} width={8} />
              </li>

              <li>
                <Link href={''}> Adicionar livro </Link>
              </li>
            </ol>
          </nav>
          <div>
            <h1 className='text-base font-normal'>Adicionar livro</h1>
          </div>
        </div>
        <div className='mt-4'>
          <h2 className='mb-4 text-base font-bold'>Informe o nome do livro</h2>
          <div className='relative mb-6 flex w-96 items-center gap-4'>
            <input
              className='flex-1 rounded border border-[#A5A5AA] px-2 py-2 outline-none'
              type='text'
              value={search}
              placeholder='Pesquisar o livro'
              onChange={({ target }) => setSearch(target.value)}
            />
            <FontAwesomeIcon
              className='text-[#A5A5AA]'
              icon={faMagnifyingGlass}
              width={20}
            />
            {data && (
              <div
                className='
                  absolute top-11 z-10 max-h-72 w-[480px] space-y-4
                  divide-y-2 divide-[#A5A5AA] overflow-y-scroll border
                  border-[#A5A5AA] bg-white p-2'
              >
                {data?.map((book: IBookApi) => (
                  <div
                    onClick={() => registerCard(book)}
                    className='flex cursor-pointer gap-4 p-2'
                    key={book.title}
                  >
                    <div className='relative h-14 w-12'>
                      <Image fill={true} src={book.image_url} alt='' />
                    </div>
                    <div className='space-y-1'>
                      <p className='text-[14px]'>{book.title}</p>
                      <p className='text-[12px]'>{book.authors}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {bookData && (
            <div className={`flex flex-col lg:w-[52rem]`}>
              <div className='flex space-x-4'>
                <div>
                  <div className='relative h-48 w-36'>
                    <Image
                      src={bookData.image_url ?? ''}
                      fill={true}
                      alt='imagem da capa do livro'
                    />
                  </div>
                </div>
                <div className='w-full'>
                  <div className='space-y-2'>
                    <h1>{bookData?.title}</h1>
                    <div className='flex w-80 justify-between'>
                      <p className='text-xs font-bold text-[#00AA9E]'>
                        {bookData?.authors}
                      </p>
                      <p className='text-xs font-bold text-[#00AA9E]'>
                        {bookData?.num_pages} páginas
                      </p>
                    </div>
                  </div>
                  <div className='mt-2 flex items-center gap-x-10'>
                    <label
                      className='text-sm font-bold'
                      htmlFor='input-date-start'
                    >
                      comecei a ler:{' '}
                    </label>
                    <input
                      className='rounded-md border border-[#39393C] px-4 py-2 outline-none'
                      type='date'
                      value={dateStart}
                      onChange={({ target }) => setDateStart(target.value)}
                      id='input-date-start'
                      required
                    />
                  </div>
                  <div className='mt-3 flex gap-x-7'>
                    <label
                      className='text-sm font-bold'
                      htmlFor='input-date-end'
                    >
                      Terminei de ler:{' '}
                    </label>
                    <input
                      className='rounded-md border border-[#39393C] px-4 py-2 outline-none'
                      type='date'
                      value={dateEnd}
                      onChange={({ target }) => setDateEnd(target.value)}
                      id='input-date-end'
                    />
                  </div>
                  <div className='mt-3 flex items-center gap-x-10'>
                    <p className='text-sm font-bold'>Sua avaliação:</p>
                    <div>
                      <button
                        className='h-8 w-8 border border-[#A5A5AA] '
                        type='button'
                        onClick={decreaseRating}
                      >
                        <FontAwesomeIcon icon={faMinus} width={10} />
                      </button>
                      <input
                        className='h-8 w-8 border border-[#A5A5AA] text-center'
                        disabled
                        type='text'
                        value={rating}
                      />
                      <button
                        type='button'
                        className='h-8 w-8 border border-[#A5A5AA] '
                        onClick={increaseRating}
                      >
                        <FontAwesomeIcon icon={faPlus} width={10} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-8 flex flex-col self-end md:w-[29rem] lg:w-[42rem]'>
                <h1 className='text-[18px]'>Escreva uma Resenha</h1>
                <p className='mb-2 text-xs font-bold'>Resenha</p>
                <textarea
                  className='h-24 w-[26rem] resize-none rounded-md border border-[#A5A5AA] p-2 outline-none'
                  value={description}
                  onChange={({ target }) => setDescription(target.value)}
                  cols={30}
                  rows={10}
                  placeholder='Escrever'
                ></textarea>
                <div className='my-4 flex h-10 w-60'>
                  <button
                    onClick={() => dateStart && handleRegisterBooks(bookData)}
                    className='flex-1 rounded-2xl bg-[#4219B5] text-white'
                    type='submit'
                  >
                    Cadastrar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
