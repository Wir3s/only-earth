// app/globe/page.tsx

'use client';

import { useState } from 'react';
import GlobeScene from '../../components/Globe';
import DeforestationUI from '../../components/DeforestationUI';
import CitationFooter from '@/components/CitationFooter';
import categoryColors from '@/lib/categoryColors';



export default function GlobePage() {
  const [activeCategories, setActiveCategories] = useState<string[]>([
    'New',
    'Sporadic',
    'Intensifying',
    'Persistent',
    'Diminishing',
  ]);

  const toggleCategory = (category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <>
      {/* Title Header */}
      <div className="absolute top-0 left-0 w-full text-center p-4 z-20 bg-opacity-80">
        <h1 className="text-3xl font-bold">Emerging Hot Spots</h1>
        <h2 className="text-2xl font-bold">Primary Forest Loss</h2>
        <p className="text-lg">2002-2023, tropics, WRI</p>
      </div>

      {/* UI for filtering categories */}
      <DeforestationUI
        activeCategories={activeCategories}
        toggleCategory={toggleCategory}
        categoryColors={categoryColors}
      />

      <main className="h-screen">
        <GlobeScene activeCategories={activeCategories} />
      </main>

      <CitationFooter />
    </>
  );
}


