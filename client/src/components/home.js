import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentHomePage from './studentfolder/StudentHomePage';

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
            {/* {userInfo?.name} */}
            <StudentHomePage userInfo={userInfo}></StudentHomePage>
        </div>
    );
};

export default Home;
