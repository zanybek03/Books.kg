import React from 'react';
import {Link} from "react-router-dom";
import Logo from "../images/basket.svg"

const Header = () => {
    return (
        <div className="bg-[#010049] py-6 md:py-4">
            <div className="container mx-auto ">
                <div className="flex justify-between">
                    <Link to={"/"}
                          className="py-2 text-white font-medium text-2xl">BOOKShop
                    </Link>
                    <Link to={'/shop-basket'}>
                        <button className="text-white font-medium ">
                            <img className="ml-5" src={Logo} alt=""/>Корзина</button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default Header;