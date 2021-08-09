import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faClipboardList, faPlus, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
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
                        <Link to="/admin" className="nav-link">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/ManageProduct" className="nav-link">Manage Product</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/orderList" className="nav-link">Manage Order</Link>
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
                        <Link to="/admin" className="nav-link"><FontAwesomeIcon icon={faUser} style={{ fontSize: "20px" }} /></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/manageProduct" className="nav-link"><FontAwesomeIcon icon={faPlus} style={{ fontSize: "20px" }} /></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/orderList" className="nav-link"><FontAwesomeIcon icon={faClipboardList} style={{ fontSize: "20px" }} /></Link>
                    </li>
                </ul>
            </IconNav>
        </Sidenav >
    );
};

export default Sidebar;


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