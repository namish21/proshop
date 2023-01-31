import React ,{useEffect} from 'react'
// import products from '../products';
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    },[dispatch] )


    return (
        <>
            <h1 className='text-2xl uppercase font-medium mx-8 mt-5 font-serif' >Latest Products</h1>
            {loading ? <Loader /> :
                error ? <Message variant='danger' >{error} </Message> :
                <div className='grid grid-cols-4 m-4 p-2 pt-0 gap-6'>
                {products.map( product => (
                <div key={product._id} >
                <Product product={product} />
                </div>
            ))}
        </div> }
        
        </>
    )

}

export default HomeScreen
