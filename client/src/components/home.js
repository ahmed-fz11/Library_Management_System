import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [userType, setUserType] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userDetail = localStorage.getItem('user_info');
        const userType = localStorage.getItem('user_type');

        // Redirect to login if user details are not found in localStorage
        if (!userDetail) {
            navigate('/login');
            return;
        }

        // Parsing the user_detail object from localStorage
        const userDetailsParsed = JSON.parse(userDetail);

        setUserInfo(userDetailsParsed);
        setUserType(userType);
        console.log("userType", userType)
        console.log("userDetailsParsed", userDetailsParsed)

    }, [navigate]);

    return (
        <div>
            <h1>Welcome to Home Page</h1>
            {userInfo && (
                <div>
                    <h2>User Information:</h2>
                    <p>Name: {userInfo.name}</p>
                    <p>Email: {userInfo.email}</p>
                    <p>User Type: {userType}</p>
                </div>
            )}
        </div>
    );
};

export default Home;
