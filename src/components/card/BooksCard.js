import React from 'react';
import {Link} from "react-router-dom";
import Logo_2 from "../../images/basket-2.svg";
import {addToBasket} from "../../redux/action/action";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

const BooksCard = ({el}) => {
    const dispatch = useDispatch()
    const {basket} = useSelector(s => s)
    const basketItems = basket.some(basket => basket.id === el.id)

    return (
        <div className="sm:basis-1  md:basis-1/2 lg:basis-1/3 xl:basis-1/4 my-5 text-center items-center flex-wrap justify-center"
             key={el.id}>
            <div className="sm:px-2 py-2  md:px-2 py-3 lg:px-3 py-4 xl:px-4 py-5 bg-gray-50 px-4 py-4 body-font hover:scale-105 mx-3
                transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">

                <div className="w-full">
                    <Link to={`/shop-details/${el.id}`}>
                        <img src={el.image} alt="image"
                             className="w-60 h-80 object-cover rounded-md"/>
                    </Link>
                </div>

                <span className="flex flex-col mt-3 ">

                    <div className="flex justify-between">
                        <p className="text-left font-bold">{el.price} сом</p>
                        {
                            basketItems ?
                                <button>
                                    <FontAwesomeIcon icon={faCheck}/>

                                </button> :
                                <button
                                    onClick={() => dispatch(addToBasket(el))}>
                                    <img src={Logo_2} alt=""/>
                                </button>
                        }
                    </div>

                    <div className="flex justify-between">
                        <div className="text-blue font-bold py-2 rounded">
                            <h4 className="font-head pb-5 w-60 text-left">{el.title}</h4>
                        </div>
                    </div>

                </span>

            </div>

        </div>
    );
};

export default BooksCard;