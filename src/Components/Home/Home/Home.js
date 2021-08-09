import React, { useState } from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navbar from '../../Shared/Navbar/Navbar';
import Products from '../Products/Product';
import Header from '../Header/Header';

const Home = () => {
    const [cart, setCart] = useState([])
    return (
        <div>
            <Navbar cart={cart} />
            <Header />
            <Products cart={cart} setCart={setCart} />
            <Footer />
        </div>
    );
};

export default Home;