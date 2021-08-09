import React from 'react';
import styled from 'styled-components';
import img from '../../../Image/header-bg.jpg';

const Header = () => {
    return (
        <Headers>
            <header class="masthead">
            <div class="container">
                <div class="masthead-subheading">Welcome To Our Shop!</div>
                <div class="masthead-heading text-uppercase">It's Nice To Having You Here</div>
                <a class="btn btn-primary btn-lg text-uppercase" href="#Products">Products</a>
            </div>
            </header>
        </Headers>
    );
};

export default Header;

const Headers = styled.div`
    .masthead {
    padding-top: 10.5rem;
    padding-bottom: 6rem;
    text-align: center;
    color: #fff;
    background-image: url(${img});
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-position: center center;
    background-size: cover;
  }
  
  .masthead-subheading {
    font-size: 1.5rem;
    font-style: italic;
    line-height: 1.5rem;
    margin-bottom: 25px;
    font-family: "Roboto Slab", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }
  
  .masthead-heading {
    font-size: 3.25rem;
    font-weight: 700;
    line-height: 3.25rem;
    margin-bottom: 2rem;
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }
  
  @media (min-width: 768px) {
    masthead {
      padding-top: 17rem;
      padding-bottom: 12.5rem;
    }
    .masthead-subheading {
      font-size: 2.25rem;
      font-style: italic;
      line-height: 2.25rem;
      margin-bottom: 2rem;
    }
    .masthead-heading {
      font-size: 4.5rem;
      font-weight: 700;
      line-height: 4.5rem;
      margin-bottom: 4rem;
    }
  }

  .btn-primary {
    color: #fff;
    background-color: #ffc800;
    border-color: #ffc800;
  }
  .btn-primary:hover {
    color: #fff;
    background-color: #d9aa00;
    border-color: #cca000;
  }
`