import {API} from "../../API/API";
import {
    ADD_TO_BASKET,
    DECREASE_QUANTITY, GET_SHOP_CATEGORY,
    GET_SHOP_LIST_CATEGORY,
    GET_SHOP_PRODUCT_DETAIL,
    GET_SHOP_PRODUCT_LIST,
    REMOVE_PRODUCT_BASKET
} from "../type/type";

export const addToBasket = (item) =>{
    let basket = JSON.parse(localStorage.getItem("basket")) || []
    const productBasket = basket.find(el => el.id === item.id)
    if (productBasket){
        basket = basket.map(el => {
            return el.id === item.id ? {...el, quantity: el.quantity + 1} : el
        })
    } else {
        basket = [...basket , {...item , quantity: 1}]
    }
    localStorage.setItem("basket", JSON.stringify(basket))
    return {type:ADD_TO_BASKET , payload:item}
}

export const DecreaseToBasket = (item) => {
    let basket = JSON.parse(localStorage.getItem("basket")) || []
    basket = basket.map(el => {
        return el.id !== item ? {...el, quantity: el.quantity - 1} : el
    })
    localStorage.setItem("basket", JSON.stringify(basket))
    return {type:DECREASE_QUANTITY , payload:item}
}

export const RemoveProductBasket = (item) =>{
    let basket = JSON.parse(localStorage.getItem("basket")) || []
    basket = basket.filter( el => el. id !== item)

    localStorage.setItem("basket", JSON.stringify(basket))
    return {type:REMOVE_PRODUCT_BASKET , payload:item}
}


/////////////////////////////////////////////////////

export const getCategoryList = () =>{
    return(dispatch) =>{
        API.get(`categories/`)
            .then(({data})=>{
                dispatch({type:GET_SHOP_LIST_CATEGORY, payload:data})
            })
    }
}

export const getCategory = (id) =>{
    return(dispatch) =>{
        API.get(`categories/${id}`)
            .then(({data})=>{
                dispatch({type:GET_SHOP_CATEGORY, payload:data})
            })
    }
}

export const getProdList = () =>{
    return(dispatch) =>{
        API.get(`books/`)
            .then(({data})=>{
                dispatch({type:GET_SHOP_PRODUCT_LIST , payload:data})
            })
    }
}

export const getProdDetail = (id) =>{
    return(dispatch) =>{
        API.get(`books/${id}`)
            .then(({data})=>{
                dispatch({type:GET_SHOP_PRODUCT_DETAIL , payload:data})
            })
    }
}