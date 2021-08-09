import React from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import Product from '../Product/Product';
import ProductModal from '../ProductModal/ProductModal';

const ManageProduct = () => {
    return (
        <div>
            <Sidebar />
            <div className="container ms-3">
                <div className="row justify-content-center mt-5">
                    <div className="col-xl-10 col-lg-6 col-md-6 col-sm-8 col-10 mt-3">
                        <ProductModal />
                        <Product />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProduct;