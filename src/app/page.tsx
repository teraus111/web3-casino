'use client';
import React, { useState } from "react";
import Layout from "@/layout/layout";
import { Button, Image } from "@heroui/react";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import styled from "styled-components";

const dancing = Dancing_Script({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});


const GameBoard = () => {

    return (
        <StyledWrapper>
            <div className="relative">
                <video muted autoPlay loop poster="/assets/image/post.png" className="object-fill w-screen h-screen">
                    <source src="/assets/video/car.mp4" />
                </video>
                <Image src="/assets/image/logo.png" alt="logo" className="w-44 fixed top-5 left-5" />
                <div className="absolute w-screen h-screen z-10 bg-black/70 top-0">
                    <div className="relative w-screen h-screen">
                        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center flex-col">
                            <p className={`${dancing.className} text-white text-4xl -rotate-12 -translate-x-40 translate-y-12`}>Online Casino</p>
                            <h1 className="text-[200px] text-white masked-text px-12">Mu<span className="text-8xl font-extralight">x</span>sin</h1>
                            <p className="text-white text-2xl">
                                Betting means you are not alione!
                            </p>
                            <Link href={"/landing"}>
                                <Button className="synthwave-laser-button mt-8">Launch App</Button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </StyledWrapper>
    );
}


const StyledWrapper = styled.div`
    .masked-text {
    font-weight: bold;
    color: transparent;
    background-image: url('https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    background-size: 200%;
    /* Enlarged for smooth animation */
    background-position: 0 50%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: animate-background 5s infinite alternate linear;
    }
    @keyframes animate-background {
        0% {
            background-position: 0 50%;
        }

        100% {
            background-position: 100% 50%;
        }

    }

  .synthwave-laser-button {
    position: relative;
    padding: 20px 60px;
    font-size: 20px;
    text-transform: uppercase;
    color: #fff;
    background: #101020; /* Base color */
    border: none;
    cursor: pointer;
    letter-spacing: 2px;
    text-shadow:
      0 0 5px #00ffe0,
      0 0 15px #00ffe0,
      0 0 25px #00ffe0;
    box-shadow:
      inset 0 0 15px #00ffe0,
      0 0 20px rgba(0, 255, 224, 0.7);
    overflow: hidden;
    border-radius: 10px;
    z-index: 1;
    transition:
      box-shadow 0.3s ease,
      transform 0.3s ease;
  }

  .synthwave-laser-button::before,
  .synthwave-laser-button::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 255, 224, 0.6),
      transparent
    );
    z-index: -1;
    filter: blur(5px);
    transform: translateX(-100%);
    animation: laser-glow 2.5s infinite linear;
  }

  .synthwave-laser-button::after {
    animation-delay: 1.25s;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 0, 144, 0.6),
      transparent
    );
  }

  @keyframes laser-glow {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  .synthwave-laser-button:hover {
    transform: translateY(-5px);
  }

  .synthwave-laser-button:active {
    transform: scale(0.95);
    box-shadow:
      inset 0 0 15px #00ffe0,
      0 0 25px rgba(255, 0, 144, 0.7);
  }`;


export default GameBoard;

