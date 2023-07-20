import Link from 'next/link';

import { CardBooks } from './components/CardBooks';

export default function Home() {
  return (
    <main className='flex flex-1 flex-col items-center'>
      <div className='grid w-[900px] grid-cols-1 pt-6 md:grid-cols-3'>
        <div className='flex h-10 w-[242px] space-x-7'>
          <Link
            href={'/meus-livros/adicionar-livros'}
            className='flex-1 rounded-xl bg-[#4219B5] py-2 text-center text-white'
          >
            Adicionar livro
          </Link>
        </div>
        <div className='col-span-2 w-[504px]'>
          <nav className='flex-1'>
            <Link href={'#'}>Meus livros</Link>
            <div className='relative h-[1px] w-full bg-[#A5A5AA]'>
              <div className='absolute bottom-0 h-[1px] w-20 bg-[#00AA9E]'></div>
            </div>
          </nav>
          <CardBooks />
        </div>
      </div>
    </main>
  );
}
