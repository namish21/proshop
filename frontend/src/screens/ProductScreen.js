import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = () => {

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`)
  };

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(params.id, {
        rating,
        comment,
      })
    )
  }

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(params.id));
  }, [dispatch,params,successProductReview]);


  return (
    <div class='container' >
      <Link className='btn btn-light my-3 mx-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div class = 'ml-36 justify-around'>
          <Row>
            <Col md={4} >
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2 class='mt-7 font-bold'>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush' >
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p class='mb-3'>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  )

  // return (
  //   <div className="flex flex-col">
  //     <Link
  //       to="/"
  //       className="btn btn-ghost w-28 text-md justify-self-start mx-24 mt-2"
  //     >
  //       Go back
  //     </Link>
  //     {loading ? (
  //       <Loader />
  //     ) : error ? (
  //       <Message variant="danger">{error}</Message>
  //     ) : (
  //       <div className="mt-3 container mx-auto gap-8 flex justify-center">
  //         <div className="w-1/3">
  //           <figure className="">
  //             <img className="rounded-md shadow-md" src={product.image} />
  //           </figure>
  //         </div>
  //         <div className="w-1/4">
  //           <div className="flex flex-col gap-3 content-between divide-y divide-blue-100">
  //             <div className="text-xl uppercase text-cyan-900 ">
  //               <h1>{product.name}</h1>{" "}
  //             </div>
  //             <div className="pt-2">
  //               <Rating
  //                 className="justify-self-center"
  //                 value={product.rating}
  //                 text={`${product.numReviews} reviews`}
  //                 color="rgb(253 224 71)"
  //               />
  //             </div>
  //             <div className="text-sm">
  //               <p>Description: {product.description}</p>{" "}
  //             </div>
  //             <div className="pt-2"> Price: {product.price}$ </div>
  //           </div>
  //         </div>
  //         <div className="w-1/10">
  //           <table className="table-fixed border-collapse border shadow-sm">
  //             <tbody>
  //               <tr className="border">
  //                 <td className="p-2">Price</td>
  //                 <td className="p-2"> ${product.price} </td>
  //               </tr>
  //               <tr className="border">
  //                 <td className="p-2">Status</td>
  //                 <td className="p-2">
  //                   {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
  //                 </td>
  //               </tr>

  //               {product.countInStock > 0 && (
  //                 <tr className="border">
  //                   <td className="p-2">Quantity</td>
  //                   <td className="p-2">
  //                     <Form.Control
  //                       as="select"
  //                       value={qty}
  //                       onChange={ (e) => setQty(e.target.value) }
  //                     >
  //                       {[...Array(product.countInStock).keys()].map((x) => (
  //                         <option key={x + 1} value={x + 1}>
  //                           {x + 1}
  //                         </option>
  //                       ))}
  //                     </Form.Control>{" "}
  //                   </td>
  //                 </tr>
  //               )}
  //             </tbody>
  //           </table>
  //           {product.countInStock > 0 ? (
  //             <button
  //               onClick={addToCartHandler}
  //               className="btn rounded-none justify-center btn-sm px-2 m-2"
  //             >
  //               Add to Cart
  //             </button>
  //           ) : (
  //             <button className="btn rounded-none btn-disabled justify-center btn-sm px-2 m-2">
  //               Add to Cart
  //             </button>
  //           )}
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
}

export default ProductScreen;
