import React from 'react';
import {Link} from "react-router-dom";

const CategoryCart = ({el}) => {
    return (
        <div className="mx-5 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 duration-300">
            <Link to={`/shop-category/${el.id}`}
                  className="block p-6 max-w-sm bg-white border-gray-200  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="flex align-middle">
                    <p className="font-bold text-gray-700 dark:text-gray-400">{el.title}</p>
                </div>
            </Link>
        </div>
    );
};

export default CategoryCart;