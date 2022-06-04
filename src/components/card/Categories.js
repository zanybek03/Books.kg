import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCategory, getCategoryList, getProdList} from "../../redux/action/action";
import Slider from "react-slick";
import CategoryCartInside from "./CategoryCartInside";

const Categories = () => {
    const {idCategory} = useParams()
    const dispatch = useDispatch()
    const {shopProductList: product} = useSelector(s => s)
    const {shopIdCategory: cateqory} = useSelector(s => s)
    const {shopListCategory: cate} = useSelector(s => s)

    useEffect(() => {
        dispatch(getCategory(idCategory))
        dispatch(getProdList())
        dispatch(getCategoryList())
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

    const books = product.filter(el => el.category === cateqory.id)
    return (

        <div className="container mx-auto">
            <Slider
                {...categorySettings}>
                {
                    cate.map(el => (
                        <div key={el.id} className="py-2">
                            <CategoryCartInside el={el}/>
                        </div>
                    ))
                }
            </Slider>
            <div className="flex  flex-wrap">
                {
                    books.map(el => (
                        <div
                            className="sm:basis-1  md:basis-1/2 lg:basis-1/3 xl:basis-1/4 text-center flex justify-center font-robot"
                            key={el.id}>
                            <div
                                className="text-gray-900 my-4 body-font mx-3">
                                <div className="w-full">
                                    <Link to={`/shop-details/${el.id}`}>
                                        <img src={el.image} alt="image"
                                             className="w-60 h-90 object-cover "/>
                                    </Link>
                                </div>
                                <span className="flex flex-col mt-3 text-black">
                            <p className="text-left font-bold text-black text-xl">{el.price} сом</p>
                        <h4 className="font-head font-medium pb-5 w-60 text-left font-light text-sm">{el.title}</h4>
                    </span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Categories;