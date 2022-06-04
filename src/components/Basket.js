import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addToBasket, DecreaseToBasket, RemoveProductBasket} from "../redux/action/action";
import {API} from "../API/API";
import {useForm} from "react-hook-form";

const Basket = () => {
    const {basket: el} = useSelector(s => s)
    const {register, handleSubmit, formState: {}} = useForm();
    const onSubmit = data => {
        API.post('contact/', data)
            .then(response => {
                alert("ok")
                console.log(response)
            }).catch(e => {
            console.log(e)
            console.log(data)
        })
        console.log(data)
    };
    console.log(el, "ELEMENT")
    const dispatch = useDispatch()
    const [price, setPrice] = useState(0)


    useEffect(() => {
        setPrice(el.reduce((acc, el) => {
            return el.quantity * el.price + acc
        }, 0))

    })
    return (
        <div className="min-h-screen">
            <div className="container mx-auto">
                {
                    el.length === 0 ? <div className="font-normal text-2xl text-center">Корзина пустая</div> :
                        <div className="flex justify-between bg-blue-100">
                            <div className="px-10 py-10">
                                <form
                                    className="flex justify-between min-h-screen"
                                    onSubmit={handleSubmit(onSubmit)}>
                                    <div className="w-5/12">
                                        <h1 className="text-[#010049] text-3xl font-bold ">Контактные
                                            данные</h1>
                                        <input
                                            className="border-2 border-[#010049] text-[#010049] rounded w-full py-2 px-3 outline-none my-2"
                                            type="text" placeholder="Фио*" {...register("fullname", {
                                            required: true,
                                            maxLength: 80
                                        })} />
                                        <input
                                            className="mb-32 border-2 border-[#010049] text-[#010049] rounded w-full py-2 px-3 outline-none my-2"
                                            type="tel" placeholder="Телефон*" {...register("Mobile number", {
                                            required: true,
                                            minLength: 6
                                        })} />
                                        <div className="">
                                            <h1 className="text-[#010049] text-3xl font-bold ">Оплата</h1>
                                            <div className="flex justify-between pb-5">
                                                <input
                                                    className="mt-1 mr-3"
                                                    {...register("payment_method", {required: true})} type="radio"
                                                    value="Cart"/>
                                                <p className="text-[#010049]  text-base">Оплачу наличными при
                                                    получении заказа</p>
                                            </div>
                                            <div className="flex justify-between pb-2">
                                                <input
                                                    className="mt-1 mr-3"
                                                    {...register("payment_method", {required: true})} type="radio"
                                                    value="Cash"/>
                                                <p className="text-[#010049]  text-base">Оплата с банковской
                                                    картой через <span className="text-green-600">PayBox</span></p>
                                            </div>
                                            <input
                                                type="submit" className='bg-[#010049] text-white py-2 w-full'/>
                                        </div>
                                    </div>
                                    <div className="w-5/12">
                                        <h1 className="text-[#010049] text-3xl font-bold ">Доставка</h1>
                                        <p className="text-gray-500 pb-2">Выберите удобный способ доставки
                                            для этого заказа.</p>
                                        <div className="flex pb-5">
                                            <input
                                                className="mt-1 mr-3"
                                                {...register("delivery", {required: true})} type="radio"
                                                value="Самовывоз"/>
                                            <p className="text-[#010049]  text-base">Самовывоз</p>
                                        </div>
                                        <div className="flex pb-5">
                                            <input
                                                className="mt-1 mr-3"
                                                {...register("delivery", {required: true})} type="radio"
                                                value="Доставка курьером"/>
                                            <p className="text-[#010049]  text-base">Доставка курьером</p>
                                        </div>
                                        <input
                                            className="mb-32 border-2 border-[#010049] text-[#010049] rounded w-full h-36 pb-24 px-3 outline-none my-2"
                                            type="text"
                                            placeholder="Область, город (район, село), улица, дом№, кв.№*" {...register("address", {
                                            required: true,
                                            minLength: 1
                                        })} />
                                        <div className="bg-[#010049] py-3 px-3 text-white">
                                            <div className="flex justify-between">
                                                <p>Общая сумма</p>
                                                {price} сом
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="w-[50%] mx-auto ">
                                {
                                    el.map((el, idx) => (
                                        <div className="py-3 " key={el.id}>

                                            <hr className="border-1 mb-3"/>

                                            <div className="w-full flex justify-between pt-5 px-7">

                                                <img src={el.image} alt="image"
                                                     className="w-40 h-70  object-cover "/>

                                                <div className="flex flex-col w-[50%]  ">
                                                    <p className="text-xl font-medium">{el.title}</p>
                                                    <p className="text-lg font-medium">{el.price * el.quantity} Сом</p>
                                                    <span className="text-md font-medium">
                                                        {
                                                            el.quantity === 1 ? ''
                                                                :
                                                                <button
                                                                    className="bg-blue-900 hover:bg-gray-700 text-white font-bold px-4 "
                                                                    onClick={() => dispatch(DecreaseToBasket(idx))}>-</button>
                                                        }

                                                        {el.quantity} шт.
                                                        <button
                                                            className="bg-blue-900 hover:bg-gray-700 text-white font-bold px-4 "
                                                            onClick={() => dispatch(addToBasket(el))}>+</button>
                                                    </span>
                                                    <button
                                                        onClick={() => dispatch(RemoveProductBasket(el.id))}
                                                        className="bg-gray-50 rounded shadow-lg py-3 text-md mt-5 font-medium">Удалить
                                                    </button>


                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};
export default Basket;
