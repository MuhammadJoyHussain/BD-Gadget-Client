import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('https://secure-lowlands-17883.herokuapp.com/api/orders')
            .then(res => setOrders(res.data))
    }, [])

    const onDelete = (id) => {
        const removedServices = orders.filter(item => item._id !== id);

        axios.delete(`https://secure-lowlands-17883.herokuapp.com/api/orders/${id}`)
            .then(res => setOrders(removedServices))
    }

    return (
        <div>
            <Sidebar />
            <div class="container col-xl-10 col-lg-10 col-md-10 col-sm-10 col-9 mt-5">
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Ordered Item</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(({ name, address, cart, _id }) => {
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
                                        <td><button onClick={() => onDelete(_id)} className="btn btn-danger btn-sm">Delete</button></td>
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

export default OrderList;