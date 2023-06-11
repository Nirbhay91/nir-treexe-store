import React from 'react'
import {Routes,Route} from "react-router-dom"
import ProductList from '../component/ProductList'
import ShoppingCart from '../component/ShoppingCart'

const RoutesAll = () => {
  return (
    <>
    <Routes>
     <Route path='/' element={<ProductList />}/>
     <Route path='/cart' element={<ShoppingCart />}/>
    </Routes>
    </>
  )
}

export default RoutesAll