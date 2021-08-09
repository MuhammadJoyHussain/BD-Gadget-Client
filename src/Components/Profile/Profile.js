import { useContext } from 'react';
import { UserContext } from '../../App';
import { handleSignout } from './../Login/LoginManager/LoginManager';

const Profile = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const logout = () => {
        setLoggedInUser({});
        localStorage.removeItem('token');
        handleSignout();
    }

    return (
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col-xl-5 col-lg-6 col-md-6 col-sm-8 col-9 mt-3">
                    <div className="text-center shadow p-5" style={{ width: "25rem" }}>
                        <img style={{ borderRadius: "100%" }} src={loggedInUser.photoURL} />
                        <h6 className="mt-5">Name: {loggedInUser.displayName}</h6>
                        <button onClick={logout} className="btn btn-outline-danger mt-3">Log Out</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;