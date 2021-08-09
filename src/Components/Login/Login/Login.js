import React, { useContext, useState } from 'react';
import styled from 'styled-components';
// import { FcGoogle } from "react-icons/fc";
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleGoogleSignIn, signInWithEmailAndPassword, initializeLoginFramework, authToken } from '../LoginManager/LoginManager';
import { UserContext } from '../../../App';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  initializeLoginFramework()

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
  })


  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    authToken(res, true);
    if (redirect) {
      history.replace(from);
    }
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 5;
      isFieldValid = isPasswordValid;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    console.log(user.email && user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }

    e.preventDefault();
  }
  return (
    <Container>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-10 col-lg-12 col-md-9">
            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="card-body p-0">
                <div class="row">
                  <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div class="col-lg-6">
                    <div class="p-5">
                      <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form class="user">
                        <div className="mb-3">
                          <input type="email" class="form-control form-control-user" placeholder="Enter Email Address..." />
                        </div>

                        <div class="mb-3">
                          <input type="password" class="form-control form-control-user" placeholder="Password" />
                        </div>

                        <div class="mb-3 form-check">
                          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                          <label class="form-check-label" for="exampleCheck1">Remember Me</label>
                        </div>
                        <a class="btn btn-primary btn-user form-control">
                          Login
                        </a>
                      </form>
                      <hr />
                      <button onClick={googleSignIn} class="btn btn-google btn-user form-control">
                        <FontAwesomeIcon icon={faGoogle} /> Login with Google
                      </button>
                      <a class="btn btn-facebook btn-user form-control mt-2">
                        <FontAwesomeIcon icon={faFacebookF} /> Login with Facebook
                      </a>
                      <hr />
                      <div class="text-center">
                        <a class="small">Forgot Password?</a>
                      </div>
                      <div class="text-center">
                        <a class="small">Create an Account!</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;

const Container = styled.div`
.bg-login-image {
    background: url(https://wallpaperaccess.com/full/1393334.jpg);
    background-position: center;
    background-size: cover;
  }
  
  .bg-register-image {
    background: url("https://source.unsplash.com/Mv9hjnEUHR4/600x800");
    background-position: center;
    background-size: cover;
  }
  
  .bg-password-image {
    background: url("https://source.unsplash.com/oWTW-jNGl9I/600x800");
    background-position: center;
    background-size: cover;
  }

.form-control-user {
    font-size: 0.8rem;
    border-radius: 10rem;
    padding: 1rem 1rem;
  }
  
  .btn-user {
    font-size: 0.8rem;
    border-radius: 10rem;
    padding: 0.75rem 1rem;
  }
  
  .btn-google {
    color: #fff;
    background-color: #ea4335;
    border-color: #fff;
  }
  
  .btn-google:hover {
    color: #fff;
    background-color: #e12717;
    border-color: #e6e6e6;
  }
  
  .btn-google:focus,
  .btn-google.focus {
    color: #fff;
    background-color: #e12717;
    border-color: #e6e6e6;
    box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.5);
  }
  
  .btn-facebook {
    color: #fff;
    background-color: #3b5998;
    border-color: #fff;
  }
  
  .btn-facebook:hover {
    color: #fff;
    background-color: #30497c;
    border-color: #e6e6e6;
  }
  
  .error {
    color: #5a5c69;
    font-size: 7rem;
    position: relative;
    line-height: 1;
    width: 12.5rem;
  }
  
  .error:after {
    content: attr(data-text);
    position: absolute;
    left: 2px;
    text-shadow: -1px 0 #e74a3b;
    top: 0;
    color: #5a5c69;
    background: #f8f9fc;
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
    animation: noise-anim 2s infinite linear alternate-reverse;
  }
  
  .error:before {
    content: attr(data-text);
    position: absolute;
    left: -2px;
    text-shadow: 1px 0 #4e73df;
    top: 0;
    color: #5a5c69;
    background: #f8f9fc;
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
    animation: noise-anim-2 3s infinite linear alternate-reverse;
  }
  
`