import React from 'react';
import {Link} from "react-router-dom";

const CategoryCartInside = ({el}) => {
    return (
        <div>
            <div className="flex">
                <Link to={`/shop-category/${el.id}`}
                      className="block p-6  bg-white   border-gray-200  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div className="flex align-middle">
                        <p className="font-bold text-gray-700 dark:text-gray-400">{el.title}</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default CategoryCartInside;