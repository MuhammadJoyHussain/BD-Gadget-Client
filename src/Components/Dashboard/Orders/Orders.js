import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import SideNav from '../SideNav/SideNav';

const Orders = () => {
    const [loggedInUser] = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.post('https://secure-lowlands-17883.herokuapp.com/api/orders/customer', { email: loggedInUser.email })
            .then(res => setOrders(res.data))
    }, [loggedInUser.email])

    return (
        <div>
            <SideNav />
            <div class="container col-xl-10 col-lg-10 col-md-10 col-sm-10 col-9">
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Ordered Item</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(({ name, address, cart }) => {
                                return (
                                    <tr>
                                        <td>{name}</td>
                                        <td>{address}</td>
                                        <td>
                                            <table className="table-sm">
                                                <thead>
                                                    <tr>
                                                        <th>Key</th>
                                                        <th>Quantity</th>
                                                    </tr>
                                                </thead>
                                                {
                                                    cart.map(cart => {
                                                        return (

                                                            <tbody>
                                                                <tr className="text-center">
                                                                    <td>{cart.key}</td>
                                                                    <td>{cart.quantity}</td>
                                                                </tr>
                                                            </tbody>

                                                        );
                                                    })
                                                }
                                            </table>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;