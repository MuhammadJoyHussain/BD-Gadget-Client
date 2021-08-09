import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/databaseManager';
import ProductList from './ProductList';
import Pagination from './../Pagination/Pagination';

const Product = ({cart, setCart}) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(12);

    useEffect(() => { 
        axios.get('https://secure-lowlands-17883.herokuapp.com/api/products')
            .then(res => setProducts(res.data))
    }, [])

    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProduct = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

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

    const addToCart = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <section class="py-5" id="Products">
            <div class="container px-4 px-lg-5 mt-5">
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {
                        currentProduct.map(product => <ProductList addToCart={addToCart} product={product} />)
                    }
                </div>
                <div>
                    <Pagination productPerPage={productPerPage} totalProduct={products.length} paginate={paginate} />
                </div>
            </div>
        </section>
    );
};

export default Product;