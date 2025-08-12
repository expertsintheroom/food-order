import { useContext } from "react";
import Modal from "./UI/Modal";

import UserProgressContext from "../store/UserProgressContext";
import CartContext from "../store/CartContext";
import CartItem from "./CartItem";
import Button from "./UI/Button";

import { currencyFormatter } from '../util/formatting.js';

export default function Cart(){
 
  const userStateCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext) 
  
  
  const totalPrice = cartCtx.items.reduce((total,item) => 
    total + item.quantity * item.price,0)

  function handleCloseCart(){
       userStateCtx.clearCartState();
  }

  function handleGoToCheckout(){
      userStateCtx.setCheckoutState();
  }

  return(
    <Modal open={userStateCtx.progress === 'cart'}
    onClose={userStateCtx.progress === 'cart' ? handleCloseCart : null}
    >
   <h2>Your Cart</h2>
        <ul>
           { 
             cartCtx.items.map ((item) => (
                <CartItem key={item.id}
                 price={item.price} 
                 quantity={item.quantity}
                 name={item.name}
                 onIncrease = {() => cartCtx.addItem(item)}
                 onDecrease={() => cartCtx.removeItem(item.id)}
                ></CartItem>
            ))
           }
        </ul>  
        <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
              <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>
                  Close
                </Button>
                {cartCtx.items.length > 0 &&
                 (<Button onClick={handleGoToCheckout}>Go to Checkout
                    </Button>)}
              </p>
     </Modal>
  )

}