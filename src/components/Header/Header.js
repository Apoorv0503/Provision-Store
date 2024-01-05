import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useHistory, Link } from "react-router-dom";
import "./Header.css";


const Header = ({ children, hasHiddenAuthButtons }) => {
  // console.log("children :");
  // console.log(children);

  //get email form local storage
  var email = localStorage.getItem("email");
  

  //use useHistory for navigation
  let history = useHistory();

  // Logout btn handler
  let handleLogout = () => {
      //Redirect to same page - /products
      history.push("/");
      //Refresh the page
      history.go();
      //Remove all items
      localStorage.clear();
    };

  //1. for login page, use hasHiddenAuthButtons to check if you are on login page, true means you are on login
  //2. for logged out view, show login box in header
  //3. for logged in view, show user icon, email form local storage and logout option

  return (
    <Box className="header">
      <Box className="header-title">
        <Link to="/">
          <img src="pro.png" className="pro-style" alt="pro-icon"></img>
        </Link>
      </Box>
      
      {hasHiddenAuthButtons ? (
        <Button
          className="explore-button"
          variant="contained"
        >
            Login Page      
        </Button>
        // agar ham login page pe nai hai to ya fir main page(product) pe hoge ya currently logged in hoge
      ) : !email ? (
        // not currently loggin so, need to show product page here with search bar and login/Register buttons
        <>
        <Box width="30vw">{children && children}</Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            className="header-title"
            variant="text"
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </Button>
        </Stack>
        </>
      ) : (
        // currently logged-in so show logout button and other things
        <>
        <Box width="30vw">{children && children}</Box>
        <Stack direction="row" spacing={1} alignItems="center">
           <Avatar alt={email} src="./" />
           {/* <p>{email}</p> */}
           <Button
            className="header-title"
            variant="contained"
            onClick={() => {
               history.push("/about");
            }}
            >
            About
           </Button>
           <Button
            className="header-title"
            variant="text"
            onClick={() => {
              handleLogout()
            }}
          >
            Logout
          </Button>
        </Stack>
        </>
      )}
    </Box>
  );
};

export default Header;
