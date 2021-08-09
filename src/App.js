import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home/Home/Home';
import Review from './Components/Review/Review';
import ReviewItems from './Components/Cart/ReviewItems/ReviewItems';
import Dashboard from './Components/Dashboard/Dashboard/Dashboard';
import Admin from './Components/Admin/Admin/Admin';
import ManageProduct from './Components/Admin/ManageProduct/ManageProduct/ManageProduct';
import Orders from './Components/Dashboard/Orders/Orders';
import OrderList from './Components/Admin/OrderList/OrderList';
import CustomerReview from './Components/Dashboard/Review/CustomerReview';
import Login from './Components/Login/Login/Login';
import PrivateRoute from './Components/Login/PrivateRoute/PrivateRoute';
import { initializeLoginFramework } from './Components/Login/LoginManager/LoginManager';
import firebase from "firebase/app";
import "firebase/auth"
import './App.css'
import Shipment from './Components/Cart/Shipment/Shipment';
import axios from 'axios';
import Forbidden from './Components/Shared/404/404';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [admin, setAdmin] = useState(false);
  initializeLoginFramework();

  useEffect(() => {
    axios.post(`https://secure-lowlands-17883.herokuapp.com/api/admins/email`, { email: loggedInUser.email })
      .then(res => setAdmin(res.data))
  }, [loggedInUser?.email]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setLoggedInUser(user)
      } else {
        setLoggedInUser({})
      }
      return () => {
        unsubscribe();
      }
    })
  }, []);

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>

      <Router>
        <Switch>

          <Route path="/home">
            <Home />
          </Route>

          <Route path="/addToCart/:key">
            <Review />
          </Route>

          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>

          <PrivateRoute path="/orders">
            <Orders />
          </PrivateRoute>

          <Route path="/review">
            <CustomerReview />
          </Route>

          <PrivateRoute path="/cart">
            <ReviewItems />
          </PrivateRoute>

          <PrivateRoute path="/shipment">
            <Shipment />
          </PrivateRoute>

          <PrivateRoute path="/admin">
            {admin ? <Admin /> : <Forbidden />}
          </PrivateRoute>

          <PrivateRoute path="/manageProduct">
            {admin ? <ManageProduct /> : <Forbidden />}
          </PrivateRoute>

          <PrivateRoute path="/orderList">
            {admin ? <OrderList /> : <Forbidden />}
          </PrivateRoute>

          <Route path="/login">
            <Login />
          </Route>



          <Route exact path="/">
            <Home />
          </Route>

        </Switch>
      </Router>

    </UserContext.Provider>
  );
}

export default App;
