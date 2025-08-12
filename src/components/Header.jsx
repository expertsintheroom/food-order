import LOGO from "../assets/logo.jpg"
import Button from "./UI/Button"
import CartContext from "../store/CartContext"
import { useContext } from "react"
import UserProgressContext from "../store/UserProgressContext"

export default function Header(){

    const cartCtx = useContext(CartContext)
    const userStateCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((totalCount,item) =>
         {return totalCount + item.quantity},0)
  
    function openCart(){
      userStateCtx.setCartState()
    }
    
    return (
        <header id="main-header">  
             <div id="title">
                 <img src={LOGO}  alt="A resteurent app" />
                 <h1>REACT FOOD ORDER</h1>
             </div>
             <nav>
               <Button textOnly onClick={openCart} >Cart ({totalCartItems})</Button>
             </nav>
    </header>

    )
}