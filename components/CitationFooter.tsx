// components/CitationFooter.tsx
'use client';

import React from 'react';

export default function CitationFooter() {
  // Create a new Date instance and format it (e.g. "March 26, 2025")
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <footer style={{
      position: 'absolute',
      bottom: 10,
      width: '100%',
      textAlign: 'center',
      fontSize: '0.8rem',
      color: '#ccc'
    }}>
      Citation: Harris et al. (2017). Emerging Hot Spots. Accessed on {formattedDate} from Global Forest Watch.
    </footer>
  );
}

