import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getDatabaseCart, removeFromDatabaseCart } from '../../../utilities/databaseManager';
import Navbar from '../../Shared/Navbar/Navbar';
import Cart from './../CartItems/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const ReviewItems = () => {
    const [cart, setCart] = useState([]);
    const [modal, setModal] = useState();

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        axios.post('https://secure-lowlands-17883.herokuapp.com/api/products/byKeys', productKeys)
            .then(res => {
                const cartProducts = productKeys.map(key => {
                    const product = res.data.find(pd => pd.key === key);
                    product.quantity = savedCart[key];
                    return product;
                });
                setCart(cartProducts)
            })
    }, []);


    const toggle = () => {
        setModal(!modal);
    };

    return (
        <div>
            <Navbar cart={cart} />
            <section className="py-5 container">
                <div className="row px-4 px-lg-5 my-5">
                    <div className="gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-4 mb-5">
                            <Cart cart={cart}>
                                {
                                    cart.length === 0 ?
                                        <Link onClick={toggle} className="btn btn-dark">Proceed Checkout</Link> :
                                        <Link to="/shipment" className="btn btn-dark">Proceed Checkout</Link>
                                }
                            </Cart>
                            <Modal isOpen={modal} toggle={toggle}>
                                <ModalBody className="text-center p-5">
                                    <EmptyIcon>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </EmptyIcon>
                                    <h1 style={{ color: "#ff4545" }}>Failed</h1>
                                    <p>Cart is empty</p>
                                </ModalBody>
                            </Modal>
                        </div>
                        {
                            cart.map(product => {
                                return (
                                    <div key={product.key} className="col-md-6">
                                        <div className="small mb-1">{product.name}</div>

                                        <p className="lead">by {product.seller}</p>
                                        <div className="small mb-1">Quantity: {product.quantity}</div>
                                        <div className="fs-5 mb-3">
                                            <span>${product.price}</span>
                                        </div>
                                        <button onClick={() => removeProduct(product.key)} className="btn btn-outline-dark flex-shrink-0 mb-5">
                                            <i className="bi-cart-fill me-1"></i>
                                            Remove Item
                                        </button>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReviewItems;


const EmptyIcon = styled.div`
    font-size: 50px;
    color: #ff4545;
    height: 80px;
    width: 80px;
    border: 2px solid #ff4545;
    border-radius: 50%;
    margin: 30px 0 20px 160px;
`