import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductDetailsAction, clearErrors } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { useAlert } from "react-alert";
import { Carousel } from "react-bootstrap";
import CustomTitle from "../COMPONENTS/layouts/CustomTitle";
import { addItemToCartAction } from "../actions/cartActions";

export default function ProductDetails() {
  const { productId } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();

  // global state
  const { product, error, loading } = useSelector((state) => state.productDetails);

  // local state
  const [quantity, setQuantity] = useState(1);

  // side Effects
  useEffect(() => {
    dispatch(getProductDetailsAction(productId));
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch]);

  // handlers
  function addToCart() {
    dispatch(addItemToCartAction(productId, quantity));
    alert.success("Product added to cart");
  }
  function increaseQty() {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  }
  function decreaseQty() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <>
      {error ? (
        <h1>Error</h1>
      ) : loading === true ? (
        <Loader />
      ) : (
        <>
          <CustomTitle title={product.name} />
          <div className="container container-fluid">
            <div className="product-mainDiv">
              <div id="product_image" className="left-part">
                <Carousel pause="hover">
                  {product.images !== undefined &&
                    product.images.map((i) => (
                      <Carousel.Item key={i.public_id}>
                        <img
                          src={i.url}
                          alt={product.title}
                          className="d-block w-100"
                          width="auto"
                          height="auto"
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
              </div>
              <div className="right-part">
                <h3>{product.name}</h3>
                <p id="product_id">Product #{product._id}</p>
                <hr />

                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(product.ratings / 5) * 100}%` }}
                  ></div>
                </div>
                <span id="no_of_reviews">{product.numOfReviews} Reviews</span>

                <hr />

                <p id="product_price">${product.price}</p>
                <div className="stockCounter d-inline">
                  <span className="btn btn-danger minus" onClick={decreaseQty}>
                    -
                  </span>
                  <input
                    type="number"
                    className="form-control count d-inline"
                    value={quantity}
                    readOnly
                  />
                  <span type="button" className="btn btn-primary plus" onClick={increaseQty}>
                    +
                  </span>
                </div>

                <button
                  type="button"
                  id="cart_btn"
                  className="btn btn-primary d-inline ml-4"
                  disabled={product.stock === 0 ? true : false}
                  onClick={addToCart}
                >
                  Add to Cart
                </button>

                <hr />

                <p>
                  Status:
                  <span id="stock_status" styles={{ color: "red" }}>
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </p>

                <hr />

                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr />
                <p id="product_seller mb-3">
                  Sold by: <strong>Amazon</strong>
                </p>

                <button
                  id="review_btn"
                  type="button"
                  className="btn btn-primary mt-4"
                  data-toggle="modal"
                  data-target="#ratingModal"
                >
                  Submit Your Review
                </button>

                <div className="row mt-2 mb-5">
                  <div className="rating w-50">
                    <div
                      className="modal fade"
                      id="ratingModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="ratingModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="ratingModalLabel">
                              Submit Review
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <ul className="stars">
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                            </ul>

                            <textarea
                              name="review"
                              id="review"
                              className="form-control mt-3"
                            ></textarea>

                            <button
                              className="btn my-3 float-right review-btn px-4 text-white"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
