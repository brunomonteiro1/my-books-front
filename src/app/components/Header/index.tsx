'use client';

import Image from 'next/image';
import Link from 'next/link';

import { getUser } from '@/app/services/user';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';

interface User {
  id: number;
  avatar: string;
}

export default function Header() {
  const { data } = useQuery(['user'], getUser);

  return (
    <header className='flex h-14 w-full items-center justify-around bg-white'>
      <div className='flex h-full gap-8'>
        <div className='flex h-full items-center justify-center space-x-2'>
          <FontAwesomeIcon
            icon={faBookOpen}
            className='text-[#4219B5]'
            width={30}
          />
          <h2 className='text-xl leading-8 text-[#00AA9E]'>READING.COM</h2>
        </div>
        <nav className='relative flex h-full items-center'>
          <div className='absolute top-0 h-1 w-20 rounded-b-xl bg-[#00AA9E]'></div>
          <Link href={'/'} className='text-sm leading-5 text-[#00AA9E]'>
            Meus livros
          </Link>
        </nav>
      </div>
      <div>
        {data?.map((user: User) => (
          <div className='relative h-8 w-8' key={user.id}>
            <Image
              className='rounded-full'
              src={user.avatar}
              alt='avatar do usuario'
              fill={true}
            />
          </div>
        ))}
      </div>
    </header>
  );
}
