import { useState, useEffect } from "react" 
import { db } from "../data/db.js"
export function useCart(){
  const [ data ] = useState(db)

  const [ cart, setCart ] = useState(()=>{
    const carrito = localStorage.getItem('cart')
    return carrito ? JSON.parse(carrito) : []
  })
  const maxItems = 10

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart))
  },[cart])

  function addToCart(product) {
    const item = cart.findIndex(p => p.id === product.id)
    if(item < 0){
      product.quantity = 1
      setCart([...cart, product])
      
    }else{
      const newCart = [...cart]
      if(cart[item].quantity>= maxItems)return 
      newCart[item].quantity ++
      setCart(newCart)
      
    }
    
  }
  const removeItemCart = (id) => {
    const newCart = [...cart]
    const deleted = newCart.filter(p=> p.id !== id)
    setCart(deleted)
  }
  const removeCart = () => {
    setCart([])
  }
  const plusQuantity = (id) => {
    const newCart = [...cart]
    const agregated = newCart.map(p =>{
      if(p.id === id && p.quantity < maxItems){
        p.quantity ++
        return p
      }else{
        return p
      }
    })
    setCart(agregated)
  }

  const removeQuantity = (id) => {
    const newCart = [...cart]
    const deleted = newCart.map(p =>{
        if(p.id === id){
          p.quantity --
          return p
        }else{
          return p
        } 
      }).filter(guitar => guitar.quantity>0 )
    setCart(deleted)
  }

  const cartTotal = cart.reduce((total, item) => {
    total += item.price * item.quantity
    return total
  },0)
  return{
    data,
    cart,
    addToCart,
    removeItemCart,
    removeCart,
    plusQuantity,
    removeQuantity,
    cartTotal
  }
}