import React, { useContext, useEffect, useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../../App';
import { handleSignout } from './../../Login/LoginManager/LoginManager';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const Navbar = ({ cart }) => {
    const [loggedInUser] = useContext(UserContext);
    const { isSignedIn } = loggedInUser;
    const [admin, setAdmin] = useState(false);
    const [modal, setModal] = useState();

    const toggle = () => {
        setModal(!modal);
    };


    useEffect(() => {
        axios.post(`https://secure-lowlands-17883.herokuapp.com/api/admins/email`, { email: loggedInUser.email })
            .then(res => setAdmin(res.data))
    }, [loggedInUser?.email]);

    const logout = () => {
        localStorage.removeItem('token');
        handleSignout();
    }

    return (
        <Nav>
            <nav class="navbar navbar-expand-lg navbar-light bg-dark fixed-top" id="mainNav">
                <div class="container">
                    <Link to="/" class="navbar-brand">BD Gadget</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                            <li class="nav-item">
                                <Link to="/home" class="nav-link">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/dashboard" class="nav-link">Dashboard</Link>
                            </li>
                            {
                                admin ?
                                    <li class="nav-item">
                                        <Link to="/admin" class="nav-link">Admin</Link>
                                    </li> : null
                            }
                            <li class="nav-item">
                                {isSignedIn || localStorage.getItem('token') ? <Link onClick={logout} class="nav-link">Logout</Link> :
                                    <Link to="/login" class="nav-link">Login</Link>}
                            </li>
                        </ul>
                        <div className="cart">
                            {
                                cart.length === 0 ?
                                    <Link to="/home" class="btn btn-outline-light" onClick={toggle}>
                                        <i class="bi-cart-fill me-1"></i>
                                        Cart
                                        <span class="badge bg-dark text-white ms-1 rounded-pill">{cart.length}</span>
                                    </Link> :
                                    <Link to="/cart" class="btn btn-outline-light">
                                        <i class="bi-cart-fill me-1"></i>
                                        Cart
                                        <span class="badge bg-dark text-white ms-1 rounded-pill">{cart.length}</span>
                                    </Link>

                            }
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
                    </div>
                </div>
            </nav>
        </Nav>
    );
};

export default Navbar;

const Nav = styled.div`
     #mainNav {
    padding - top: 1rem;
    padding-bottom: 1rem;
    background-color: #212529;
  }

    .navbar-toggler {
    padding: 0.75rem;
    font-size: 0.75rem;
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    text-transform: uppercase;
    font-weight: 700;
  }

    .navbar-brand {
    color: #ffc800;
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-weight: 700;
    letter-spacing: 0.0625em;
    text-transform: uppercase;
  }


     #mainNav .navbar-nav .nav-item .nav-link {
     font - family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
     font-size: 0.95rem;
     color: #fff;
     letter-spacing: 0.0625em;
  }
        #mainNav .navbar-nav .nav-item .nav-link.active, #mainNav .navbar-nav .nav-item .nav-link:hover {
            color: #ffc800;
  }

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