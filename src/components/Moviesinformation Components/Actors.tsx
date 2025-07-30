
import { useState } from 'react'
import type { Actor } from '../../types/type'

export const Actors = () => {
    const [ActorList]=useState<Actor[]>([{
        Name:"Anjelica Huston",
        Profile:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Anjelica_Huston_March_21%2C_2014_%28cropped%29.jpg/250px-Anjelica_Huston_March_21%2C_2014_%28cropped%29.jpg"
    },
    {
       Name:"Gabriel Byrne",
        Profile:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Gabriel_Byrne_2010.jpg/250px-Gabriel_Byrne_2010.jpg"
    },
    {
       Name:"Lance Reddick",
        Profile:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lance_Reddick_by_Gage_Skidmore.jpg/250px-Lance_Reddick_by_Gage_Skidmore.jpg"
    },
    {
       Name:"Norman Reedus",
        Profile:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/NormanReedus2023a.jpg/250px-NormanReedus2023a.jpg"
    },
    {
       Name:"Ian McShane",
        Profile:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/McShaneTamLinRio311022_%281_of_21%29_%2852470810951%29_%28cropped_3%C3%974%29.jpg/250px-McShaneTamLinRio311022_%281_of_21%29_%2852470810951%29_%28cropped_3%C3%974%29.jpg"
    },{
       Name:"Sandino Moreno",
        Profile:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Catalina_Sandino_Moreno_2022.jpg/250px-Catalina_Sandino_Moreno_2022.jpg"
    },
    {
       Name:"Keanu Reeves",
        Profile:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/LanaDRPrimavera310524_%2810_of_155%29_%28cropped%29.jpg/250px-LanaDRPrimavera310524_%2810_of_155%29_%28cropped%29.jpg"
    }
  ])
  return (
    <div className='mt-20 md:px-30 px-10 flex flex-col gap-5'>
      <h1 className='text-2xl font-bold'>Your Favourite Cast</h1>
      <div className='flex md:flex-row flex-wrap  gap-4'>
        {ActorList.map((item)=>{
          return(
            <div className='flex flex-col gap-3 '>
              <img className='w-40 h-50 rounded-2xl' src={item.Profile} alt="Profile" />
              <h1 className='text-2xs font-bold'>{item.Name}</h1>
            </div>
          )
        })}
      </div>
    </div>
  )
}
