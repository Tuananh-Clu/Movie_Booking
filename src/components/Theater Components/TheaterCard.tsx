import type React from "react"

type TheaterCardProps = {
  name: string
  img: string
}

export const TheaterCard: React.FC<TheaterCardProps> = ({ name, img }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 ring-1 ring-white/10 bg-white/5 backdrop-blur">
      <img
        src={img}
        alt="imgTheater"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold text-white">{name}</h1>
      </div>
    </div>
  )
}
