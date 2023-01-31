import React from 'react'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Product = ( {product} ) => {
    return (
        <div className="card card-bordered border-dashed border-2 rounded-md shadow-sm p-2 ease-out duration-300 hover:scale-105">
        <figure >
                 <Link to={`/product/${product._id}`}>
                     <img className='rounded-lg' alt='image' src={product.image}/>
                 </Link>
        </figure> 
        <div className="card-body -space-y-1 -mt-4 -mb-10 ">
          <h3 className="card-title text-sm ">
                <Link to={`/product/${product._id}`}>
              <div>{product.name}</div>
              </Link>
          </h3> 
                {/* <p classNameName='text-xs' >{product.description}</p>  */}
            <Rating value={product.rating} text = {`${product.numReviews} reviews`} color='rgb(253 224 71)' />
          <div className="card-actions justify-end font-semibold text-lg p-3 ">
            {product.price}$
          </div>
        </div>
      </div> 
    )
}

export default Product
