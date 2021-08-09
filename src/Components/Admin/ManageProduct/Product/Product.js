import axios from 'axios';
import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import Pagination from '../Pagination/Pagination';

const Product = () => {
    const [product, setProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(12);

    const onDelete = (id) => {
        const removedServices = product.filter(item => item._id !== id);

        axios.delete(`https://secure-lowlands-17883.herokuapp.com/api/products/${id}`)
            .then(res => setProduct(removedServices))
    }

    axios.get('https://secure-lowlands-17883.herokuapp.com/api/products')
        .then(res => setProduct(res.data))

    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProduct = product.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <Transition>
            <TransitionGroup>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th></th>
                    </tr>
                </thead>
                {
                    currentProduct.map(({key, price, _id}) => {
                        return (
                            <CSSTransition key={key} classNames="item" timeout={500}>
                                <tbody>
                                <tr>
                                    <td>{key}</td>
                                    <td>{price}</td>
                                    <td><button onClick={() => onDelete(_id)} className="btn btn-danger btn-sm">Delete</button></td>
                                </tr>
                            </tbody>
                            </CSSTransition>
                        );
                    })
                }
            </table>
            <Pagination productPerPage={productPerPage} totalProduct={product.length} paginate={paginate} />
        </TransitionGroup>
        </Transition>
    );
};

export default Product;

const Transition = styled.div`
.item-enter {
    opacity: 0;
  }
  .item-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }
  .item-exit {
    opacity: 1;
  }
  .item-exit-active {
    opacity: 0;
    transition: opacity 500ms ease-in;
  }
`