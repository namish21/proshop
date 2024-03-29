import React from 'react'

const Rating = ({value,text,color}) => {
    return (
        <div className='text-xs' >
            <span>
                <i style={{color}} className={value >= 1 ? 'fa fa-star' : value >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                <i style={{color}} className={value >= 2 ? 'fa fa-star' : value >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                <i style={{color}} className={value >= 3 ? 'fa fa-star' : value >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                <i style={{color}} className={value >= 4 ? 'fa fa-star' : value >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                <i style={{color}} className={value >= 5 ? 'fa fa-star' : value >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span className='pl-2 text-xs ' >
                {text && text}
            </span>
            
        </div>
    )
}

export default Rating
