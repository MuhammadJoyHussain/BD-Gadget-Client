import React from 'react';
import SideNav from '../SideNav/SideNav';

const CustomerReview = () => {
    return (
        <div>
            <SideNav />
            <div class="container mt-5">
                <div class="text-center mb-5">
                    <h2 class="section-heading text-uppercase">Review</h2>
                </div>

                <form>
                    <div class="row mb-5">
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <input class="form-control" id="name" type="text" placeholder="Your Name *" />
                            </div>

                            <div class="form-group mb-3">
                                <input class="form-control" id="email" type="email" placeholder="Your Email *" />
                            </div>
                            
                            <div class="form-group mb-3">
                                <input class="form-control" type="file" placeholder="Your Image" />
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group mb-md-0">
                                <textarea class="form-control" id="message" placeholder="Your Message *" rows="6"></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="text-center"><button class="btn btn-primary btn-xl text-uppercase" id="submitButton" type="submit">Send Message</button></div>
                </form>
            </div>
        </div>
    );
};

export default CustomerReview;