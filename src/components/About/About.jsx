import React from 'react';
import { Typography } from '@material-ui/core';
import './About.css'; // Import the CSS file

const About = () => {
  return (
    <div className='Main-container'>
      <Typography variant="h2" className="paragraph">
        Problems Faced and Approach to Counter Them
      </Typography>
{/*-----------------------------------------problems in login----------------------------------- */}
      <ul>
      <li>
       <h3>A. Login Page-</h3>
        <li className="point">
        <strong>Point 1: In making the fetch post request call, we need to take care of the formate of the data passed in the body.</strong>
          <Typography variant="body1" className="paragraph">
            I have created an object with the required data in it like: email, password (sha256 encoded). Also for the post request I have used the 
            required header key-value pairs provided in the assignment which was basically a base64 encoded key.
        </Typography>
        </li>
        <li className="point">
        <strong>Point 2: In validation and sha256 encoding.</strong>
          <Typography variant="body1" className="paragraph">
            I have used a npm package: 'crypto-js/sha256', for email and password validation I have used the regex syntax 
            in order to reduced the manual validation and unneccesary code.
        </Typography>
        </li>
        <li className="point">
        <strong>Point 3: Using conditional rendering.</strong>
        <Typography variant="body1" className="paragraph">
            I have used ternary operator in the return function to render jsx conditionally, like show loader materialUI icon while making the http post 
            request. I have used a isLoading state for this purpose , whenever there is any change in the state UI will be re-rendered.
        </Typography>
        </li>
        </li>
      </ul>

{/*-------------------------------------------problems in Products------------------------------------ */}
<ul>
      <li>
       <h3>B. Products Page-</h3>
        <li className="point">
        <strong>Point 1: Making the get request and storing and handling the data.</strong>
          <Typography variant="body1" className="paragraph">
            I have created 2 state for storing the products one is productDetails to store the array of all the products, and one is filteredProduct
            which will be used to render the grid of cards, this state will be storing the actual products after searching.
        </Typography>
        </li>
        <li className="point">
          <strong>Point 2: Searching the products.</strong>
          <Typography variant="body1" className="paragraph">
            I have used an onChange function in materialUI TextField and using the event.target.value to actually catch the types value in search bar.
            A separate function performSearch is used to search, I have used filter function in JS to filter the matched product from productDetails. Also 
            includes() is used to check if the searched item is present or not.
        </Typography>
        </li>
        <li className="point">
        <strong>Point 3: Card for showing the products.</strong>
        <Typography variant="body1" className="paragraph">
            Made a dedicated ProductCard component for showing the cards in the grid, I have used TextField, Button,
            Card, CardActions, CardContent, CardMedia, Typography, Box etc materialUI components here.
        </Typography>
        </li>
        </li>
      </ul>
  {/* -------------------------------folder structure---------------------------------- */}
  <ul>
  <li>
  <h3>C. Folder Structure-</h3>
    <li className="point">
      <p>I have created separate folders for each components which are present inside "components" folder, stored almost all the images in public folder
       </p>
      <img src="./folder.png" alt="folder structure" className='my-img'/>
      
    </li>
    </li>
  </ul>
    </div>
  );
};

export default About;
