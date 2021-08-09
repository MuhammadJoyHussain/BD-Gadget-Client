import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Review = () => {
    const [review, setReview] = useState({});

    const { key } = useParams();

    useEffect(() => {
        axios.get(`https://secure-lowlands-17883.herokuapp.com/api/product/${key}`)
        .then(res => setReview(res.data))
    }, [])

    return (
        <div>
            <h2>{review.name}</h2>
        </div>
    );
};

export default Review;