import React, { createContext, useEffect, useState } from "react";
export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart ={}; 
    for (let index = 0; index < 300+1; index++) {
        cart[index]= 0;
     }
    return cart;
}


const ShopContextProvider = (props) => {

    const[all_product,setAll_product]= useState([]);
   
    const [cartItems,setCartItems]= useState(getDefaultCart());

    useEffect(()=>{
        fetch('https://shoppify-nijuu-backend.vercel.app/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_product(data))

        if(localStorage.getItem('auth-token')){
            fetch('https://shoppify-nijuu-backend.vercel.app/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }

    },[])
    

     const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        if(localStorage.getItem('auth-token')){
            fetch('https://shoppify-nijuu-backend.vercel.app/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
     }
    
    
     const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('https://shoppify-nijuu-backend.vercel.app/removeFromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
     }
     const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems)
            {
              if(cartItems[item]>0) 
                {
                    let itemInfo = all_product.find((product) => product.id === Number(item))

                    if (itemInfo && typeof itemInfo.new_price === 'number') {  // Ensure itemInfo is defined and new_price is a number
                        totalAmount += itemInfo.new_price * cartItems[item];
                    } else {
                        console.warn(`Product with id ${item} not found or new_price is invalid`);
                    }
                } 
            }
                return totalAmount ;
            }
             const getTotalCartItems =()=>{
                let totalItem = 0;
                for(const item in cartItems)
                    {
                      if(cartItems[item]>=0)
                        {
                            totalItem+= cartItems[item];
                        }  
                    }
                   
                    return totalItem ;

                    
             }
  
     const contextValue ={getTotalCartItems,getTotalCartAmount,all_product,cartItems, addToCart,removeFromCart};


    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

 export default ShopContextProvider;


//  import React, { createContext, useEffect, useState } from "react";
// export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//     let cart = {}; 
//     for (let index = 0; index < 300+1; index++) {
//         cart[index] = 0;
//     }
//     return cart;
// }

// const ShopContextProvider = (props) => {
//     const [all_product, setAll_product] = useState([]);
//     const [cartItems, setCartItems] = useState(getDefaultCart());

//     useEffect(() => {
//         fetch('http://localhost:4000/allproducts')
//             .then((response) => response.json())
//             .then((data) => setAll_product(data));

//         if (localStorage.getItem('auth-token')) {
//             fetch('http://localhost:4000/getcart', {
//                 method: 'POST',
//                 headers: {
//                     Accept: 'application/form-data',
//                     'auth-token': `${localStorage.getItem('auth-token')}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body: "",
//             })
//                 .then((response) => response.json())
//                 .then((data) => setCartItems(data));
//         }
//     }, []);

//     const addToCart = (itemId) => {
//         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//         if (localStorage.getItem('auth-token')) {
//             fetch('http://localhost:4000/addtocart', {
//                 method: 'POST',
//                 headers: {
//                     Accept: 'application/form-data',
//                     'auth-token': `${localStorage.getItem('auth-token')}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ "itemId": itemId })
//             })
//                 .then((response) => response.json())
//                 .then((data) => console.log(data));
//         }
//     }

//     const removeFromCart = (itemId) => {
//         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//         if (localStorage.getItem('auth-token')) {
//             fetch('http://localhost:4000/removeFromcart', {
//                 method: 'POST',
//                 headers: {
//                     Accept: 'application/form-data',
//                     'auth-token': `${localStorage.getItem('auth-token')}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ "itemId": itemId })
//             })
//                 .then((response) => response.json())
//                 .then((data) => console.log(data));
//         }
//     }

//     const getTotalCartAmount = () => {
//         let totalAmount = 0;
//         for (const item in cartItems) {
//             if (cartItems[item] > 0) {
//                 let itemInfo = all_product.find((product) => product.id === Number(item));
//                 if (itemInfo && itemInfo.new_price) {  // Ensure itemInfo is defined and has new_price
//                     totalAmount += itemInfo.new_price * cartItems[item];
//                 } else {
//                     console.warn(`Product with id ${item} not found or new_price is missing`);
//                 }
//             }
//         }
//         return totalAmount;
//     }

//     const getTotalCartItems = () => {
//         let totalItem = 0;
//         for (const item in cartItems) {
//             if (cartItems[item] > 0) {
//                 totalItem += cartItems[item];
//             }
//         }
//         return totalItem-1;
//     }

//     const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };

//     return (
//         <ShopContext.Provider value={contextValue}>
//             {props.children}
//         </ShopContext.Provider>
//     )
// }

// export default ShopContextProvider;





