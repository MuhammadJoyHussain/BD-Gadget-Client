import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faClipboardList, faBars, faTimes, faStar } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SideNav = () => {
    const [burgerStatus, setBurgerStatus] = useState(false);

    return (
        <Sidenav>
            <BurgerNav className="text-start" show={burgerStatus}>
                <ul className="mt-4 list-unstyled">
                    <li className="nav-item">
                        <Link className="nav-link"></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/home" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/dashboard" className="nav-link">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/orders" className="nav-link">Orders</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/review" className="nav-link">Review</Link>
                    </li>
                </ul>
            </BurgerNav>
            <IconNav className="text-center">
                <ul className="mt-4 list-unstyled">
                    <li className="nav-item">
                        {burgerStatus ? <Link className="nav-link" onClick={() => setBurgerStatus(false)}><FontAwesomeIcon icon={faTimes} style={{ fontSize: "20px" }} /></Link>
                            :
                            <Link className="nav-link" onClick={() => setBurgerStatus(true)}><FontAwesomeIcon icon={faBars} style={{ fontSize: "20px" }} /></Link>
                        }
                    </li>
                    <li className="nav-item">
                        <Link to="/home" className="nav-link"><FontAwesomeIcon icon={faHome} style={{ fontSize: "20px" }} /></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/dashboard" className="nav-link"><FontAwesomeIcon icon={faUser} style={{ fontSize: "20px" }} /></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/orders" className="nav-link"><FontAwesomeIcon icon={faClipboardList} style={{ fontSize: "20px" }} /></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/review" className="nav-link"><FontAwesomeIcon icon={faStar} style={{ fontSize: "20px" }} /></Link>
                    </li>
                </ul>
            </IconNav>
        </Sidenav >
    );
};

export default SideNav;

const Sidenav = styled.div`
    a {
        padding: 10px 0;
        font-size: 15px;
        color: #818181;
        transition: 0.3s;
       }

    a:hover {
        color: #f1f1f1;
      }
`

const BurgerNav = styled.div`
position: fixed;
top: 0;
bottom: 0;
background: #111;
width: 150px;
padding-top: 24px;
flex-direction: column;
transform: ${props => props.show ? 'translateX(50px)' : 'translateX(-200px)'};
transition: transform 0.9s;
`

const IconNav = styled.div`
    position: fixed;
    background: #111;
    width: 50px;
    top: 0;
    bottom: 0;
`