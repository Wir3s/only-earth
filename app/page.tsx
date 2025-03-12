import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <Image 
        src="/main-image.webp" 
        alt="Main Visual" 
        width={800} 
        height={500}
        priority
      />
      <h1 className="mt-8 text-4xl font-bold">
        Our Earth, Our Home
      </h1>
    </main>
  );
}


