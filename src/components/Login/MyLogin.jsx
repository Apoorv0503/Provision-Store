import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
// import { config } from "../App";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./MyLogin.css";
import sha256 from 'crypto-js/sha256';

const Login = () => {
    ////maintained a state for formData
    const { enqueueSnackbar } = useSnackbar();
    let history = useHistory();

    //maintained 2 states one for storing inputs and one for loader
    const [formData, setformData] = useState({});
    const [isLoading, setISloading] = useState(false);

    //handling the input by user
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setformData((prevState) => ({ ...prevState, [name]: value }));
    };


    // Hashing the password using SHA-256
    const passwordToSha256 = (password) => {
        return sha256(password).toString(); //return encoded string
    };


//--------------------------------------------our main login function------------------------------------
    const login = async (formData) => {
        //validation test
        if (validateInput(formData) === false) {
            return;
        }


        setISloading(true);
        try {

            const hashedPassword = passwordToSha256(formData.password);

            //prepared the data to be sent in body according to the requirement
            const MyformData = {
                username: formData.email,
                password: hashedPassword,
                grant_type: 'password'
            };

            console.log("MyformData", MyformData);

            const response = await fetch('https://apiv2stg.promilo.com/user/oauth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic UHJvbWlsbzpxNCE1NkBaeSN4MiRHQg==',
                },
                body: new URLSearchParams(MyformData).toString(), //converted into required formate before sending the body
            });

            const data = await response.json();
            console.log('Login Response:', data);

            //token can be stored in local storage for logout/login purposes
            const accessToken = data.response.access_token;
            console.log(accessToken);
            persistLogin(data.response.access_token,formData.email);

            //Redirect to products page
            history.push("/product");

            //Form reset
            setformData({
                email: "",
                password: "",
            });

            if (data.status.code === 200) {
                enqueueSnackbar("Logged in successfully", { variant: 'success' });
            }
        }

        catch (error) {
            // console.log(error.response); //observe this to find all the fields
            if (error.response.status === 401) {
                enqueueSnackbar("Invalid Credentials", { variant: 'error' });
            }
            else {
                enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
                    {
                        variant: 'error',
                    });

            }

        }
        setISloading(false);
    };


//--------------------------------validation functions----------------------------------------------- 
    //regex validation for email
    const isValidEmail = (email) => {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);  //returning true or false
    };

    //regex validation for password
    const isValidPassword = (password) => {
        // Regular expression for password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);  //returning true or false
    };

    //actual validator function
    const validateInput = (data) => {
        if (!isValidEmail(data.email)) {
            enqueueSnackbar('Invalid email format', { variant: 'error' })
            return false;
        }

        if (!isValidPassword(data.password)) {
            console.error('Invalid password format');
            return false;
        }

        return true;
    };

//-----------------------------------storing token,email in local storage---------------------------
    const persistLogin = (token, email) => {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            minHeight="100vh"
        >
            <Header hasHiddenAuthButtons />
            <Box className="content">
                <Stack spacing={3} className="form">
                    <h2 className="title">Login</h2>
                    <TextField
                        id="email"
                        label="email"
                        variant="outlined"
                        title="Email"
                        name="email"
                        placeholder="email"
                        fullWidth
                        value={formData.email || ""}
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        id="password"
                        variant="outlined"
                        label="password"
                        name="password"
                        type="password"
                        helperText="Password must be atleast 6 characters length"
                        fullWidth
                        placeholder="Password"
                        value={formData.password || ""}
                        onChange={(e) => handleChange(e)}
                    />
                    {isLoading ? (
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <CircularProgress color="success" size={30} />
                        </Box>
                    ) : (
                        <Button className="button" variant="contained" onClick={async () => {
                            await login(formData);
                        }}>
                            LOGIN HERE
                        </Button>
                    )}

                    <p className="secondary-action">
                        Don’t have an account?{" "}
                        <Link className="link" to="/">
                            Register now
                        </Link>
                    </p>
                </Stack>
            </Box>
            <Footer />
        </Box>
    );
};

export default Login;







