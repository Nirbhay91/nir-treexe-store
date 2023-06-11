import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductList.css";
import { FaShoppingCart } from "react-icons/fa"; 
import ShoppingCart from "./ShoppingCart"; // Import the ShoppingCart component

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    gender: [],
    colour: [],
    priceRange: [],
    type: []
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);

  
 

//   const selectCategoryHandler=(e)=>{
//         const {checked,value}=e.target;
//         if(checked){
//          setSelectedCategory([...selectedCategory,value]);
//          console.log("value check"+value)
         
//         }
//         else{
//            setSelectedCategory([...selectedCategory.filter((e)=>e!=value)])
//         }
//   }
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (filterType, value) => {
    const newFilters = { ...filters };
    if (newFilters[filterType].includes(value)) {
      newFilters[filterType] = newFilters[filterType].filter(
        (item) => item !== value
      );
    } else {
      newFilters[filterType].push(value);
    }
    setFilters(newFilters);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterProducts = (product) => {
    if (
      (filters.gender.length > 0 && !filters.gender.includes(product.gender)) ||
      (filters.colour.length > 0 && !filters.colour.includes(product.colour)) ||
      (filters.priceRange.length > 0 &&
        !filters.priceRange.includes(product.priceRange)) ||
      (filters.type.length > 0 && !filters.type.includes(product.type))
    ) {
      return false;
    }
    if (searchQuery.trim() === "") {
      return true;
    }
    const searchKeywords = searchQuery.trim().toLowerCase().split(" ");
    const attributesToSearch = [product.gender, product.colour, product.type]
      .join(" ")
      .toLowerCase();
    return searchKeywords.every((keyword) =>
      attributesToSearch.includes(keyword)
    );
  };

  const renderProductList = () => {
    return products.filter(filterProducts).map((product) => (
      <div key={product.id} className="product-item">
       <p className='product-title'>{product.name}</p> 
        <img
          src={
            "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/polo-tshirts.png"
          }
          alt={product.name}
        />
        <div className="item_details">
        <p>Price: {product.price}</p>
        <button className="Add-to-Cart" onClick={() => addToCart(product.id)}>
          Add to Cart
        </button>
        </div>
      </div>
    ));
  };

  const addToCart = (productId) => {
    const product = products.find((item) => item.id === productId);
    if (product) {
      const existingCartItem = cartItems.find((item) => item.id === productId);
      if (existingCartItem) {
        const updatedCartItems = cartItems.map((item) => {
          if (item.id === productId) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        setCartItems(updatedCartItems);
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
    }
  };

  const increaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const deleteItem = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  return (
    <>
    <div id="navBar">
    <div className="menu">
        <h3>Teerex Store</h3>
        <h2>
       <a style={{cursor:"pointer"}} href="/">Products</a> <FaShoppingCart className="cart-icon" style={{fontSize:"35px" , cursor:"pointer"}}/> 
      </h2>

        {/* <i class="fa fa-shopping-cart" aria-hidden="true" style={{fontSize:"35px" , cursor:"pointer"}}
         onClick={()=>{
           navigate("/cart")
         }}
        >
            <span id='cart_item_count'>{cartData.length?cartData.length:""}</span>
        </i> */}
      </div>
    </div>
    <div className="search-input">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="search-icon">
          <i className="fa fa-search" aria-hidden="true" 
        //  onClick={()=>{
        //    navigate("/cart")
        //  }}
        ></i>
        </div>
        </div>
    <div className="product-list-container">
         
      <div className="contentDiv">
      <div className='filter_div'>
         
        <h4>Filters</h4>
         {/* Gender filter box */}
        <div className="checkBoxDiv">
          <h5>Gender</h5>
          <div className="check_box">
          <input type="checkbox" onChange={() => handleCheckboxChange("gender", "Male")} /> <label htmlFor="">Male</label>
          {/* <input type="checkbox" onChange={selectCategoryHandler} value={'Male'}/> <label htmlFor="">Male</label> */}
          </div>
          <div className="check_box">
          <input type="checkbox" onChange={() => handleCheckboxChange("gender", "Female")} /> <label htmlFor="">Female</label>
          </div>
        </div>
        {/* Colour filter box */}
        <div className="checkBoxDiv">
          <h5>Colour</h5>
          <div className="check_box">
          <input type="checkbox" onChange={() => handleCheckboxChange("colour", "Red")} /> <label htmlFor="">Red</label>
          </div>
          <div className="check_box">
          <input type="checkbox" onChange={() => handleCheckboxChange("colour", "Blue")} /> <label htmlFor="">Blue</label>
          </div>
          <div className="check_box">
          <input type="checkbox" onChange={() => handleCheckboxChange("colour", "Green")} /> <label htmlFor=""> Green</label>
          </div>
        </div>
         {/* Price filter box */}
         <div className="checkBoxDiv">
          <h5>Price Range</h5>
          <div className="check_box">
          <input type="checkbox" onChange={() => handleCheckboxChange("priceRange", "Low")} /> <label htmlFor="">Rs0-250</label>
          </div>
          <div className="check_box">
          <input type="checkbox" onChange={() => handleCheckboxChange("priceRange", "Medium")} /> <label htmlFor="">Rs251-450</label>
          </div>
          <div className="check_box">
          <input type="checkbox" onChange={() => handleCheckboxChange("priceRange", "Medium")} /> <label htmlFor=""> Rs 450</label>
          </div>
        </div>
       {/* Type filter box */}
       <div className="checkBoxDiv">
          <h5>Type</h5>
          <div className="check_box">
          <input type="checkbox" onChange={() => handleCheckboxChange("type", "Shirt")} /> <label htmlFor="">Polo</label>
          </div>
          <div className="check_box">
          <input type="checkbox" onChange={() => handleCheckboxChange("type", "Shirt")} /> <label htmlFor="">Hoodie</label>
          </div>
          <div className="check_box">
          <input type="checkbox" onChange={() => handleCheckboxChange("type", "Shirt")} /> <label htmlFor="">Basic</label>
          </div>
        </div>
      </div>
      <div className="product_list_div">
      
        {renderProductList()}
        </div> 
        <div className="shopping-cart-container">
        <ShoppingCart
          cartItems={cartItems}
          increaseQuantity={increaseQuantity}
          deleteItem={deleteItem}
        />
      
      </div> 
      </div>
    </div>
    </>
  );
};

export default ProductList;
