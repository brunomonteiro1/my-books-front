import Link from 'next/link';

import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
  return (
    <footer className='mt-auto'>
      <div
        className='
          mx-auto max-w-screen-xl space-y-8 px-4 py-7 sm:px-6
          lg:space-y-16 lg:px-8'
      >
        <div
          className='grid grid-cols-1 gap-8 border-t border-gray-100
          sm:grid-cols-2 lg:grid-cols-4 lg:pt-1'
        >
          <div>
            <div className='flex gap-2'>
              <FontAwesomeIcon
                icon={faBookOpen}
                className='text-[#4219B5]'
                width={30}
              />
              <h2 className='text-2xl leading-8 text-[#00AA9E]'>READING.COM</h2>
            </div>
            <p className='w-52 pt-3 text-sm'>
              Reading.com é um produto fictício para ajudar no processo seletivo
              para o time de Produto & Desenvolvimento do Edify.
            </p>
          </div>

          <div>
            <p className='text-base font-semibold text-[#242426]'>
              Reading.com
            </p>

            <ul className='mt-6 flex flex-col space-y-4 text-sm text-[#242426]'>
              <Link href={'#'}>Meus Livros</Link>
              <Link href={'#'}>Comunidade</Link>
              <Link href={'#'}>Novidades</Link>
              <Link href={'#'}>Aplicativos</Link>
            </ul>
          </div>

          <div>
            <p className='text-base font-semibold text-[#242426]'>Sobre nós</p>
            <ul className='mt-6 flex flex-col space-y-4 text-sm text-[#242426]'>
              <Link href={'#'}>Blog</Link>
              <Link href={'#'}>Nossa missão</Link>
              <Link href={'#'}>Contato</Link>
              <Link href={'#'}>Carreiras</Link>
            </ul>
          </div>

          <div>
            <h2 className='text-base font-semibold text-[#242426]'>
              Inscreva-se
            </h2>
            <div className='mt-4 flex w-56 flex-col'>
              <input
                className='flex-1 p-2 outline-none'
                type='text'
                placeholder='Seu e-mail'
              />
              <button
                className='
                  mt-3 rounded-lg bg-[#00AA9E] px-12 py-2 text-white'
              >
                Inscrever
              </button>
            </div>
          </div>
        </div>

        <div
          className='
            flex flex-col items-center justify-center space-x-4 space-y-3
            md:flex-row md:justify-between
            '
        >
          <p className='text-sm text-[#08080a]'>
            Copyright &copy; 2023 Reading All rights reserved
          </p>
          <ul className='space-x-8'>
            <Link href={'#'}>Política de privacidade</Link>
            <Link href={'#'}>Termos de uso</Link>
            <Link href={'#'}>Segurança</Link>
            <Link href={'#'}>Legal</Link>
            <Link href={'#'}>Site map</Link>
          </ul>
          <span className=''>PT</span>
        </div>
      </div>
    </footer>
  );
}
