import React from 'react';
import {Routes, Route} from "react-router-dom"
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ShopDetails from "./components/ShopDetails";
import Basket from "./components/Basket";
import Categories from "./components/card/Categories";


function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={< Home/>}/>
                <Route path="/shop-details/:id" element={< ShopDetails/>}/>
                <Route path="/shop-basket" element={< Basket/>}/>
                <Route path="/shop-category/:idCategory" element={< Categories/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
