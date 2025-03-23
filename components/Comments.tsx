// components/Comments.tsx
'use client';

import { useEffect, useRef } from 'react';

export default function Comments() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.setAttribute('repo', 'Wir3s/earth-comments'); // update with your repo
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', 'comment');
    script.setAttribute('theme', 'github-light');
    script.crossOrigin = 'anonymous';

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      // Cleanup: remove all children from the container when unmounting
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <p className="text-lg mb-4">
        Join the conversation below – share your thoughts on the environment, climate change, and sustainability.
      </p>
      <div ref={containerRef}></div>
    </div>
  );
}
