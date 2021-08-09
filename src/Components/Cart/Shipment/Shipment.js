import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import { clearLocalShoppingCart, getDatabaseCart } from '../../../utilities/databaseManager';
import Navbar from '../../Shared/Navbar/Navbar';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Link, useHistory, useLocation } from 'react-router-dom';

const Shipment = () => {
    const [loggedInUser] = useContext(UserContext);
    const [order, setOrder] = useState();
    const [cart, setCart] = useState([]);
    const [modal, setModal] = useState();
    const [empty, setEmpty] = useState();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };


    const handleBlur = (e) => {
        const newOrder = { ...order };
        newOrder[e.target.name] = e.target.value;
        setOrder(newOrder);
    }

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


    const onSubmit = () => {
        const orderDetails = {
            name: order.name,
            phone: order.phone,
            address: order.address,
            cart: cart,
            email: loggedInUser.email,
        }
        axios.post('https://secure-lowlands-17883.herokuapp.com/api/orders', orderDetails)
            .then(res => {
                clearLocalShoppingCart();
                toggle();
            })
    }

    const toggle = () => {
        setModal(!modal);
    };

    const cartLength = () => {
        setEmpty(!empty);
    };

    const onClose = () => {
        history.replace(from);
    }

    return (
        <div>
            <Navbar cart={cart} />
            <div className="container">
                <Form onSubmit={handleSubmit(onSubmit)} className="row mt-5 form">
                    <FormGroup>

                        <Label className="mt-5 mb-2" for="Order">Your Name</Label>
                        <Input className="form-control" {...register("name", { required: true })} type="text" placeholder="Enter Name" onBlur={handleBlur} />
                        {errors.name && <span>Name is required</span>}
                        <br />

                        <Label className="mt-3 mb-2" for="Order">Your Phone</Label>
                        <Input className="form-control" {...register("phone", { required: true })} type="text" placeholder="Enter Phone Number" onBlur={handleBlur} />
                        {errors.phone && <span>Phone is required</span>}
                        <br />

                        <Label className="mt-3 mb-2">Your Address</Label>
                        <Input className="form-control" {...register("address", { required: true })} type="text" placeholder="Enter Address" onBlur={handleBlur} />
                        {errors.address && <span>Address is required</span>}
                        <br />

                        <Label className="mt-3 mb-2" for="Product">Your Email</Label>
                        <Input className="form-control" {...register("email", { required: true })} type="email" placeholder={loggedInUser.email} />
                        {errors.email && <span>Email is required</span>}
                        <br />

                        {
                            cart.length === 0 ?
                                <Link className="btn btn-dark" onClick={cartLength}>Place Order</Link>
                                :
                                <Button color="dark" style={{ marginTop: "2rem" }} block >Place Order</Button>
                        }
                    </FormGroup>
                </Form>
            </div>
            <>
                <Modal isOpen={modal} onClosed={onClose} toggle={toggle} >
                    <ModalBody className="text-center">
                        <CheckIcon>
                            <FontAwesomeIcon icon={faCheck} />
                        </CheckIcon>
                        <h1 style={{ color: "#82ce34" }}>Awesome!</h1>
                        <h6>Your order has been confirmed</h6>
                    </ModalBody>
                </Modal>
            </>
            <>
                <Modal isOpen={empty} toggle={cartLength} onClosed={onClose}>
                    <ModalBody className="text-center p-5">
                        <EmptyIcon>
                            <FontAwesomeIcon icon={faTimes} />
                        </EmptyIcon>
                        <h1 style={{color: "#ff4545"}}>Failed</h1>
                        <p>Cart is empty</p>
                    </ModalBody>
                </Modal>
            </>
        </div>
    );
};

export default Shipment;

const CheckIcon = styled.div`
    font-size: 50px;
    color: #82ce34;
    height: 80px;
    width: 80px;
    border: 2px solid #82ce34;
    padding-top: 2px;
    border-radius: 50%;
    margin: 30px 0 20px 180px;
`

const EmptyIcon = styled.div`
    font-size: 50px;
    color: #ff4545;
    height: 80px;
    width: 80px;
    border: 2px solid #ff4545;
    border-radius: 50%;
    margin: 30px 0 20px 160px;
`