import React, { useEffect,useState } from 'react'
import './Popular.css'
// import data_product from '../Assets/data'
import Item from '../Item/Item'
const Popular = () => {
  
  const[popularProducts,setPopularProduct]= useState([]);
   
    

  useEffect(()=>{
    fetch('https://shopper-niju-backend.onrender.com/popularinwomens')
    .then((response)=>response.json())
    .then((data)=>setPopularProduct(data))

    },[])
  return (
    <div className='popular'>
     <h1>POPULAR IN WOMEN</h1> 
     <hr />
    <div className="popular_item">
     {popularProducts.map((item,i)=>{
      return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
      
     })} 
    </div>
    </div>
  )
}

export default Popular
