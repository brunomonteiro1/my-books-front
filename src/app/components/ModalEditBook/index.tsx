import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';

import { updateBooks } from '@/app/services/books';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

interface ModalEditBookProps {
  openModal: {
    open: boolean;
    id: string;
    rating: number;
    dateStart: string;
    dateEnd: string;
  };
  // eslint-disable-next-line no-unused-vars
  setIsOpenModal: (state: {
    open: boolean;
    id: string;
    rating: number;
    dateStart: string;
    dateEnd: string;
  }) => void;
}

export default function ModalEditBook({
  openModal: { open, id, rating, dateEnd, dateStart },
  setIsOpenModal
}: ModalEditBookProps) {
  const [newRating, setNewRating] = useState(0);
  const [newDateStart, setNewDateStart] = useState('');
  const [newDateEnd, setNewDateEnd] = useState('');

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries(['books']);
    setNewRating(rating);
    setNewDateStart(dayjs(dateStart).format('YYYY-MM-DD'));
    setNewDateEnd(dayjs(dateEnd).format('YYYY-MM-DD'));
  }, [dateEnd, dateStart, queryClient, rating]);

  const dateStartFormated =
    newDateStart === '' ? null : dayjs(newDateStart).format();
  const dateEndFormated = newDateEnd === '' ? null : dayjs(newDateEnd).format();

  function increaseRating() {
    if (newRating < 5) {
      setNewRating(newRating + 1);
    }
  }

  function decreaseRating() {
    if (newRating > 0) {
      setNewRating(newRating - 1);
    }
  }

  async function handleEditBook() {
    updateBooks({
      id: id,
      rating: newRating,
      dateStart: dateStartFormated,
      dateEnd: dateEndFormated
    });
  }

  const { mutate: editBook } = useMutation(handleEditBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      setNewRating(0);
      setNewDateStart('');
      setNewDateEnd('');
      setNewDateStart('');
      setNewDateEnd('');
      handleCloseModal();
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  });

  function handleCloseModal() {
    setIsOpenModal({
      open: false,
      id: '',
      rating: 0,
      dateEnd: '',
      dateStart: ''
    });
  }

  return (
    <div>
      <ReactModal
        className='
          absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3 rounded-md
          border border-zinc-500 bg-white p-3'
        isOpen={open}
        onRequestClose={handleCloseModal}
        ariaHideApp={false}
      >
        <div>
          <div className='mt-2 flex items-center gap-x-10'>
            <label className='text-sm font-bold' htmlFor='input-date-start'>
              comecei a ler:{' '}
            </label>
            <input
              className='rounded-md border border-[#39393C] px-4 py-2 outline-none'
              type='date'
              value={newDateStart}
              onChange={({ target }) => setNewDateStart(target.value)}
              id='input-date-start'
            />
          </div>
          <div className='mt-3 flex gap-x-7'>
            <label className='text-sm font-bold' htmlFor='input-date-end'>
              Terminei de ler:{' '}
            </label>
            <input
              className='rounded-md border border-[#39393C] px-4 py-2 outline-none'
              type='date'
              value={newDateEnd}
              onChange={({ target }) => setNewDateEnd(target.value)}
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
                value={newRating}
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
          <div className='mt-4 flex w-full justify-center gap-4'>
            <button
              className='rounded-lg bg-red-500 p-2 py-2 text-white'
              onClick={() => handleCloseModal()}
              type='button'
            >
              Cancelar
            </button>
            <button
              className='rounded-lg bg-blue-500 p-4 py-2 text-white'
              onClick={() => editBook()}
              type='submit'
            >
              Editar
            </button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}
