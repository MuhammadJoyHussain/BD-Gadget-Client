import React from 'react';
import { useHistory } from 'react-router-dom';

const ProductList = (props) => {
    const {img, name, price, key} = props.product;
    const history = useHistory();

    const reviewItem = () => {
        const url = `/addToCart/${key}`;
        history.push(url);
    }

    return (
        <div class="col mb-5">
            <div class="card h-100">

                <img class="card-img-top" src={img} />

                <div class="card-body p-3">
                    <div onClick={reviewItem} class="text-center">

                        <p className="fs-6" style={{ height: "200px" }}>{name}</p>

                        ${price}
                    </div>
                </div>

                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                        <button onClick={() => props.addToCart(props.product)} class="btn btn-outline-dark mt-auto"><i class="bi-cart-fill me-1"></i> Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;