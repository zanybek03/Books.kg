import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addToBasket, getProdDetail, getProdList} from "../redux/action/action";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import BooksCard from "./card/BooksCard";
import Slider from "react-slick";

const ShopDetails = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {shopProductDetail: prodDetail} = useSelector(s => s)
    const {shopProductList: product} = useSelector(s => s)
    const {basket} = useSelector(s => s)
    const basketItems = basket.some(basket => basket.id === prodDetail.id)

    useEffect(() => {
        dispatch(getProdDetail(id))
        dispatch(getProdList())
    }, [])

    const categorySettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="bg-gray-200 min-h-screen">
            <div className="container mx-auto ">
                <div className="py-20">

                    <div className="w-full h-full flex justify-around">
                        <img src={prodDetail.image} alt="image"
                             className="w-96 h-[50%]"/>
                        <div className="w-6/12">
                            <h1 className="text-4xl font-medium w-9/12 py-4">{prodDetail.title}</h1>
                            <h1 className="text-3xl font-bold py-4">{prodDetail.price} сом</h1>
                            <h2 className="font-medium">Описание</h2>
                            <p className="w-full py-5">{prodDetail.description}</p>

                            <div className="flex justify-between">
                                {
                                    basketItems ?
                                        <button
                                            className="bg-gray-400 hover:bg-gray-700 w-60 text-white font-bold py-2 px-4 mt-44 ">
                                            <FontAwesomeIcon icon={faCheck}/>Добавлено</button> :

                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 w-60 text-white font-bold py-2 px-4 mt-44  "
                                            onClick={() => dispatch(addToBasket(prodDetail))}
                                        > Добавить в корзину</button>

                                }
                            </div>
                            <div className="flex justify-between">
                                <Link to={'/shop-basket'}>
                                    <button
                                        onClick={() => dispatch(addToBasket(prodDetail))}
                                        className=" bg-blue-500 w-60 hover:bg-blue-700 text-white font-bold py-2 mt-4">
                                        Купить сейчас
                                    </button>
                                </Link>


                            </div>

                        </div>
                    </div>

                    <div className="container mx-auto p-12 flex-col md:flex-row items-center mx-auto">

                        <h1 className="ml-3 sm:text-center md:text-center lg:text-left xl:text-left text-3xl w-full text-black py-5 font-bold">Возможно,
                            Вам понравится</h1>
                        <Slider classname=""
                                {...categorySettings}>
                            {
                                product.map(el => (
                                    <div key={el.id}>
                                        <BooksCard el={el}/>
                                    </div>
                                ))
                            }
                        </Slider>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopDetails;