import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { increment } from '../redux/slices/counterSlice'
import { addToBasket } from '../redux/Basketslice'

const Product = () => {
  const [data, setData] = useState([])
const dispatch = useDispatch()
  const GetProduct = async () => {
    try {
      const request = await fetch('https://dummyjson.com/products')
      const response = await request.json()
      setData(response.products)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    GetProduct()
  }, [])

  return (
    <div className='flex flex-wrap gap-8 justify-center p-6 mt-12'>
      {data.map(item => (
        <div key={item.id} className="card bg-base-100 w-96 shadow-sm shadow-white">
          <figure>
            <img src={item.thumbnail} alt={item.title} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.title}</h2>
            <p>${item.price}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={()=> dispatch(addToBasket())}>Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Product
