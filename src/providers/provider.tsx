'use client'

import { API_URL } from '@/config';
import { SocketContext } from '@/context/socketcontext'
import { HeroUIProvider } from '@heroui/react'
import { useEffect, useRef, useState } from 'react';
import io from "socket.io-client";
import { SolanaProvider } from './solana';

// Export individual socket connections
const crashSocket = io(`${API_URL}/crashx`);

export function Providers({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    const audio = audioRef.current;

    if (audio && !isPlaying) {
      const play = async () => {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (err) {
          console.warn('Autoplay blocked, user interaction needed:', err);
        }
      };
      play();
    }
  }, [isPlaying]);
  return (
    <HeroUIProvider>
      <audio
        ref={audioRef}
        src="/assets/audio/main.mp3"
        loop
        autoPlay
        preload="auto"
        style={{ display: 'none' }}
      />
      <SocketContext.Provider value={crashSocket}>
        <SolanaProvider>
          {children}
        </SolanaProvider>
      </SocketContext.Provider>
    </HeroUIProvider>
  )
}