import type React from "react"

type TheaterCardProps = {
  name: string
  img: string
}

export const TheaterCard: React.FC<TheaterCardProps> = ({ name, img }) => {
  return (
    <div className="border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
      <img
        src={img}
        alt="imgTheater"
        className="w-full h-48 object-cover"
      />
      <div className="p-4 bg-white">
        <h1 className="text-lg font-semibold text-gray-800">{name}</h1>
      </div>
    </div>
  )
}
