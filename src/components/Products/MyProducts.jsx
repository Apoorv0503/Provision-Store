import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ProductCard from "../ProductCard/ProductCard";
import "./MyProducts.css";


const Products = () => {
  // Original products list fetched from API
  const [productDetails, setProductDetails] = useState([]);

  //filtered list after user tried to search somthing by product category/name.
  const [filteredProduct, setFilteredProduct]= useState([]);

 //  Loading Animation
 const [isLoading, setIsLoading] = useState(false);


 // to use snackbar 
  const { enqueueSnackbar } = useSnackbar();
  let accessToken = localStorage.getItem("accessToken");
  let username = localStorage.getItem("username");

  //----------------------------actual request to fetch products----------------------
  const performAPICall = async () => {
    setIsLoading(true);
    try {
      
        const res = await fetch('https://api.kalpav.com/api/v1/product/category/retail')
        let data= await res.json();
        // , {
        //     headers: {
        //       'Authorization': `Bearer ${accessToken}`,
        //     },
        //   });
      console.log(data.response);
      
      setProductDetails(data.response);
      setFilteredProduct(data.response);

     
    } catch (error) {
      if (error.response && error.response.status === 400) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      else{
        enqueueSnackbar("Somthing went wrong at backend", { variant: "error" });
      }
      }
    
    //End loading
    setIsLoading(false);
    // return productDetails;
    
  };

  
//intial api call to populate the products on product page
  useEffect(() => { 
    performAPICall();
  }, []);


  //------------------------------------------search functionalities-----------------------------------------
  const performSearch = async (searchTerm) => {

    // console.log("searchTerm",searchTerm);
        searchTerm = searchTerm.toLowerCase(); // Convert search term to lowercase for case-insensitive search


        let newArr=productDetails.filter((item) => {
          const categoryName = item.productCategory.productCategoryName.toLowerCase();
          
          return categoryName.includes(searchTerm);
        });
        
        console.log("newArr ",newArr);
        setFilteredProduct(newArr);     
  };

return (
  <div>
    <Header>
      <TextField
        className="search-desktop"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        // value={searchValue} ,since passing event from here, hence on need to give value
        onChange={(e) => {performSearch(e.target.value)}}
      />
      </Header>
    

    {/* Search view for desktop, we are passing this <TextField/> code from here, and access this textField in header with the "chidren" keyword */}
    {/* also we need to show this search bar only when we are on the product page + "hasHiddenAuthButtons" is not passed from here to header, 
    hence that will be undefined when used in header.js, 
    but if we do this: {hasHiddenAuthButtons} ,  then it will be harmless, bcz undefined is inside {}*/}

    <TextField
      className="search-mobile"
      size="small"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search color="primary" />
          </InputAdornment>
        ),
      }}
      placeholder="Search for items/categories"
      name="search"
      onChange={(e) => performSearch(e.target.value)}
    />
    {/* here our main container grid starts */}
    <Grid container>
      {/* first item in main grid containing: hero section and another grid having products and cart (70+30)*/}
      <Grid
        item
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        xs
        md
      >
      <Grid item className="product-grid" >
        <Box className="hero">
          <p className="hero-heading">
            India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
            to your door step
          </p>
        </Box>
      </Grid>
      {/* used a loading condition here to show loading during api call else show products */}
      {isLoading ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{margin:"auto"}}
          py={10}
        >
          <CircularProgress size={30} />
          <h4> Loading Products... </h4>
        </Box>
      ) : (
        // now show filtered products OR products using another grid...2nd item in item container grid
          //also check if filtered product array is not empty 
 
        <Grid
          container
          item
          spacing={10}
          direction="row"
          justifyContent="center"
          alignItems="center"
          my={2}
          mx={3}
        >
        {/* {console.log("223",filteredProduct.length)}; */}
        {
          filteredProduct.length ? (
          filteredProduct.map((product, idx) => (
            // a particular card in a grid
            <Grid item  xs={6} md={3} key={idx}>    
            {/* product.productCategory.productCategoryId */}
              <ProductCard 
              product={product.productCategory} 
              />
            </Grid>
          ))
        ):(
          <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                py={10}
                sx={{margin: "auto"}}
              >
                <SentimentDissatisfied size={40} />
                <h4>No products found</h4>
              </Box>

        )}
        {/* product grid end here */}
    </Grid>
    )}
    {/* 1st grid item of main conatiner ends here */}
    </Grid>
    </Grid>

    <Footer/>
  </div>
);
};

export default Products;