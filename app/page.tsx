import Image from 'next/image';
import Script from 'next/script';

export default function Home() {
  return (
    <>
      {/* Hero Section: Visible on page load */}
      <section className="flex flex-col items-center justify-center h-screen p-8 text-center space-y-4 fade-in">
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
      </section>

      {/* Comments Section: Users scroll down to access comments */}
      <section className="p-8 fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="w-full max-w-3xl mx-auto">
        <p className="text-lg">
            Join the conversation below - share your thoughts on the environment, climate change, and sustainability.
          </p>
          <Script 
            src="https://utteranc.es/client.js"
            data-repo="Wir3s/earth-comments"  // Replace with your comments repo
            data-issue-term="pathname"
            data-label="comment"
            data-theme="github-light"
            crossOrigin="anonymous"
            async
          />
        </div>
      </section>
    </>
  );
}





