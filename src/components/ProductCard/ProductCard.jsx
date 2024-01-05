import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  Box
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

// ---------dummy data---------
// // let product={
// //  
// orderIndex
// : 
// 5
// productCategoryId
// : 
// "402861f672b976380172b97ed41ef000013"
// productCategoryImage
// : 
// "https://d8kcpnmmec91a.cloudfront.net/categories/6.png"
// productCategoryName
// : 
// "Natural Sweeteners,Spices & Staples"
// retail
// : 
// true
// wholeSale
// : 
// false
//   }
const ProductCard = (product) => {
  
// console.log(product);
//   console.log("product img:",productObj.product.productCategoryImage);
  

  const {orderIndex, productCategoryId, productCategoryImage,productCategoryName,retail,wholeSale} = product.product
  // console.log("productObj: ",productCategoryName)
  return (
    // refer notes below
    <Card className="card">
    <CardMedia
        component="img"
        image={productCategoryImage }
        alt="product"
        style={{ width: '75%', padding: "auto", alignItems: "center", justifyContent: "center" }}
      />      
   <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {productCategoryName}
        </Typography>
      </CardContent>
      <CardActions className="card-actions">
        <Button
          color="primary"
          variant="contained"
          fullWidth
          className="card-button"
        >
          <AddShoppingCartOutlined /> ADD TO CART
        </Button>
      </CardActions>
    </Card> 
  );
};

export default ProductCard;


// ----------------notes---------------------
// <Typography gutterBottom variant="body2" component="div">
// This component is used for displaying the product name. 
// The gutterBottom prop adds some spacing at the bottom of the text. 
// The variant prop sets the text style to "body2," which is a smaller and less prominent text style. 
// The component prop specifies that this is a "div" element. 


// <AddShoppingCartOutlined />; ADD TO CART
// This code should provide you with a button containing the shopping cart icon and 
// the "ADD TO CART" label using Material-UI components.




