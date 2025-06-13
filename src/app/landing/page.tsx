import Card from '@/components/Cards/Card'
import React from 'react'

export default function page() {
    const rooms = [
        {
            name:"Mine",
            link:"/mine",
            background:"mine",
            desc:"Find Gem"
        },
        {
            name:"Jackport",
            link:"/slide",
            background:"jackport",
            desc:"Anyhow, it stops"
        },
        {
            name:"Poker",
            link:"/videopoker",
            background:"poker",
            desc:"Poker king"
        },
        {
            name:"Crash",
            link:"/crash",
            background:"crash",
            desc:"Never stop!"
        },
    ]
    return (
        <div className='bg-casino w-screen min-h-screen bg-center bg-cover bg-no-repeat'>
            <div className='w-full md:w-4/5 lg:w-2/3 xl:w-1/2 bg-black/60 backdrop-blur-sm min-h-screen relative flex items-center justify-center'>
                <div className='grid grid-cols-2 gap-4'>
                    {rooms.map((room, idx)=>(
                        <Card {...room} key={idx} />
                    ))}
                </div>
                <div className='hidden bg-jackport bg-mine bg-poker bg-crash'></div>
            </div>
        </div>
    )
}
