

export const DashBoard = ({quantity}:{quantity:number}) => {
  return (
    <div>
        <div className='bg-red-900 text-white p-5'>
            <h1>Người Dùng:</h1>
            <h1>{quantity}</h1>
        </div>
    </div>
  )
}
