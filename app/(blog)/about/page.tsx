import AboutUs2 from '@/components/mvpblocks/about-us-2'
import { ThemeToggler } from '@/components/ThemeToggler'
import { Metadata } from 'next';
import React from 'react'



export const metadata: Metadata = {
  title: "About",
  description: "...",
};

export default function aboutPage() {
  return (
    <div>
        
        <AboutUs2/>
    </div>
  )
}
