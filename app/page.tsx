// app/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import Comments from '../components/Comments'; // adjust the path as needed

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen p-8 text-center space-y-4 fade-in">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
          <Image 
            src="/main-image.webp" 
            alt="Main Visual" 
            width={800} 
            height={500}
            priority
            className="w-full h-auto"
          />
        </div>
        <h1 className="mt-8 text-5xl font-[800]">
          Our Earth, Our Home
        </h1>
        <h2 className="text-lg">
          Technological Solutions For A Healthy Planet
        </h2>
        <Link 
          href="/globe" 
          className="mt-4 mb-2 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Explore Our Interactive Globe
        </Link>
      </section>

      {/* Comments Section (only on the homepage) */}
      <section className="p-8 fade-in" style={{ animationDelay: '0.5s' }}>
        <Comments />
      </section>
    </>
  );
}






