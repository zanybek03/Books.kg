import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCategoryList, getProdList} from "../redux/action/action";
import BooksCard from "./card/BooksCard";
import Slider from "react-slick";
import Bg from "../images/slyder_img.png"
import {GET_SHOP_PRODUCT_LIST} from "../redux/type/type";
import {API} from "../API/API";
import CategoryCart from "./card/CategoryCart";

const Home = () => {
    const dispatch = useDispatch()
    const {shopProductList: product} = useSelector(s => s)
    const {shopListCategory: category} = useSelector(s => s)
    console.log(product, "[[[")
    console.log(category, "qq")

    useEffect(() => {
        dispatch(getProdList())
        dispatch(getCategoryList())
    }, [])


    const handleSelect = (e) => {
        API(`/books/?ordering=${e.target.value}`)
            .then(({data}) => {
                dispatch({type: GET_SHOP_PRODUCT_LIST, payload: data})
            })
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
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
        <div className="min-h-screen bg-blue-100">
            <div className="w-full">
                <div className="w-full mx-auto">
                    <div className="container mx-auto">
                        <Slider{...settings}>
                            <div className="bg-gray-900 w-full">
                                <img src={Bg} alt=""/>
                                1
                            </div>

                            <div className="bg-gray-900 w-full">
                                <img src={Bg} alt=""/>
                                2
                            </div>

                            <div className="bg-gray-900 w-full">
                                <img src={Bg} alt=""/>
                                3
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>

            <div className=" container mx-auto p-12 flex-col md:flex-row items-center ">
                <div className="flex flex-row flex-wrap ">
                    <h1 className="sm:text-center md:text-center lg:text-left xl:text-left text-3xl w-full text-black py-5 font-bold">Категории</h1>

                    <div className="w-full">
                        <Slider
                            {...categorySettings}>
                            {
                                category.map(el => (
                                    <div key={el.id} className="py-2 ">
                                        <CategoryCart el={el}/>
                                    </div>
                                ))
                            }
                        </Slider>
                    </div>

                    <div className="flex container text-[#010049]">
                        <h1 className=" sm:text-center md:text-center lg:text-left xl:text-left text-3xl w-full text-black py-5 font-bold">Возможно,
                            Вам понравится</h1>
                        <select
                            onChange={(e) => handleSelect(e)}
                            className="form-select appearance-none text-[#010049] h-10 mt-5 text-base text-center font-normal bg-white bg-clip-padding
                            bg-no-repeat border border-solid border-gray-300
                            transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                            aria-label="Default select example">
                            <option value="">Сортировка</option>
                            <option value="-pub_date">По популярности</option>
                            <option value="-price">По цене</option>
                            <option value="title">По буквам</option>

                        </select>
                    </div>

                    {
                        product.map(el => (
                            <div key={el.id}>
                                <BooksCard el={el}/>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    );
};
export default Home;