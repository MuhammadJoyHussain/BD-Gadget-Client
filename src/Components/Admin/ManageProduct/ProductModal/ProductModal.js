import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { useForm } from 'react-hook-form';

const ProductModal = () => {
    const [data, setData] = useState('');
    const [file, setFile] = useState();
    const [modal, setModal] = useState();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onBlur = e => {
        const newProducts = { ...data }
        newProducts[e.target.name] = e.target.value;
        setData(newProducts)
    };

    const fileUpload = event => {
        const imageData = new FormData();
        imageData.set('key', '929607410336dd8665739445d36176b1');
        imageData.append('img', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(res => {
                setFile(res.data.data.display_url);
            })
            .then(err => {
            })

    }

    const onSubmit = e => {
        const productData = {
            key: data.key,
            name: data.name,
            seller: data.seller,
            img: file,
            price: data.price
        };
        axios.post('https://secure-lowlands-17883.herokuapp.com/api/products', productData)
            .then(res => {
            })
        toggle();
    }

    const toggle = () => {
        setModal(!modal);
    };


    return (
        <div>
            <Button color="dark" style={{ marginBottom: "2rem" }} onClick={toggle}>Add Product</Button>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>
                    Add To Food List
                    <button className="btn btn-light" style={{ marginLeft: "260px" }} onClick={toggle}>&times;</button>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>

                            <Label className="mt-3 mb-2" for="Product">Product Key</Label>
                            <Input className="form-control" type="text" name="key" placeholder="Add Key" onBlur={onBlur} />

                            <Label className="mt-3 mb-2" for="Product">Product Name</Label>
                            <Input className="form-control" type="text" name="name" placeholder="Add Name" onBlur={onBlur} />

                            <Label className="mt-3 mb-2" for="Product">Product Seller</Label>
                            <Input className="form-control" type="text" name="seller" placeholder="Add Seller" onBlur={onBlur} />

                            <Label className="mt-3 mb-2" for="Product">Upload Image</Label>
                            <Input className="form-control" type="file" name="img" placeholder="Add Image" onChange={fileUpload} />

                            <Label className="mt-3 mb-2">Product Price</Label>
                            <Input className="form-control" type="text" name="price" placeholder="Add Price" onBlur={onBlur} />

                            <Button color="dark" style={{ marginTop: "2rem" }} block >Add Food</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default ProductModal;