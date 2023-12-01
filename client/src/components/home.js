import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentHomePage from "./student/StudentHomePage";
import StaffHomePage from "./staff/StaffHomePage";
import ManagerHomePage from "./manager/ManagerHomePage";
import backgroundImage from "../styles/library_pic.jpg"

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
    if (a === "manager") {
        setUserType("manager");
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
    <div style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh", // Adjust the height as needed
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // Add more styles as needed
      }}>
      {userType === "student" && <StudentHomePage />}
      {userType === "staff" ? <StaffHomePage userInfo={userInfo} /> : true}
      {userType === "manager" ? <ManagerHomePage /> : true}
    </div>
  );
};

export default Home;
