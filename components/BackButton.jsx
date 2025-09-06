'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { TbArrowBigLeftLinesFilled } from 'react-icons/tb';

export default function BackButton() {
  const path = usePathname();
  return (
    <>
      {path.includes('home') ? (
        ''
      ) : (
        <Link
          href={'/home'}
          className="absolute top-4 left-4 xl:top-10 xl:left-12 "
        >
          <div className="flex items-center justify-center hover:scale-105 text-white overflow-hidden cursor-pointer text-sm bg-white/20 rounded-full">
            <FaArrowLeft className="size-10 p-2" />
          </div>
        </Link>
      )}
    </>
  );
}
