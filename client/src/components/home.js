import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentHomePage from "./studentfolder/StudentHomePage";
import StaffHomePage from "./staff/StaffHomePage";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userType, setUserType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
      let a = JSON.parse(localStorage.getItem("user_type"))
    const userDetail = localStorage.getItem("user_info");
    setUserType(JSON.parse(localStorage.getItem("user_type")));

    // Redirect to login if user details are not found in localStorage
    if (!userDetail) {
      navigate("/login");
      return;
    }
    if (a === "student") {
        setUserType("student");
        return;
      }
    // Parsing the user_detail object from localStorage
    const userDetailsParsed = JSON.parse(userDetail);

    // Convert salary to integer
    console.log("userDetailsParsed.salary",userDetailsParsed.salary.$numberDecimal)
    const salaryAsInt = parseInt(userDetailsParsed.salary.$numberDecimal);
console.log("salaryAsInt",salaryAsInt)
    // setUserType(userTypeFromLocalStorage);
    if (userType === "staff") {
      console.log("Setting Staff");
      setUserType("staff");
    }
    if (userType === "student") {
      setUserType("student");
    }
    if (userType === "manager") {
      setUserType("manager");
    }
    // Update user details with the integer salary
    const updatedUserDetails = { ...userDetailsParsed, salary: salaryAsInt };
    console.log("user_info:", userDetail);
    console.log("user_type:", userType);
    // console.log("user_type:", { ...userDetailsParsed, salary: salaryAsInt.numberDecimal });

    setUserInfo(updatedUserDetails);
  }, []);

  useEffect(() => {
    console.log("userType Changing", userType);
    if (userType === '"staff"') {
      console.log("Setting Staff");
      setUserType("staff");
    }
    if (userType === "student") {
      setUserType("student");
    }
    if (userType === "manager") {
      setUserType("manager");
    }
  }, [userType]);

  return (
    <div>
      {userType === "student" && <StudentHomePage userInfo={userInfo} />}
      {userType === "staff" ? <StaffHomePage userInfo={userInfo} /> : true}
    </div>
  );
};

export default Home;
