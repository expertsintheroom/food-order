import UserProgressContext from "../store/UserProgressContext.jsx"
import CartContext from "../store/CartContext.jsx"
import Modal from "./UI/Modal.jsx"
import Input from "./UI/Input.jsx"
import Button from "./UI/Button.jsx"
import { useContext, useActionState } from "react"
import { currencyFormatter } from "../util/formatting.js"
import Error from "./Error.jsx"
import useHttp from "../hooks/useHttp.jsx"

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function CheckoutWithFormAction(){
   const userStateCtx = useContext(UserProgressContext);
   const cartCtx = useContext(CartContext);
  
  const { data, error:errorMessage, isLoading, sendRequest,clearData } = useHttp(
               'http://localhost:3000/orders',
               requestConfig
             );
  

   const cartTotal = cartCtx.items.reduce((totalPrice, item) =>
     totalPrice = totalPrice +  item.quantity * item.price , 0
)
     
 
  
  function handleCloseCheckout(){
       userStateCtx.clearCheckoutState();
  }

  function handleFinish(){
      userStateCtx.clearCheckoutState();
      cartCtx.clearCart();
      clearData();

  }


  async function checkoutAction(prevState,fd){
    const customerData = Object.fromEntries(fd.entries()); // { email: test@example.com }
    console.log("checkoutAction")
    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );       
   
      }

 const [formState, formAction, pending] = useActionState(checkoutAction);


       if(data && !errorMessage){
            return( 
              <Modal onClose = {handleFinish} open={userStateCtx.progress ==='checkout'}>

                   <h2>Success!</h2>
                        <p>Your order was submitted successfully.</p>
                        <p>
                          We will get back to you with more details via email within the next
                          few minutes.
                        </p>
                        <p className="modal-actions">
                          <Button onClick={handleFinish}>Okay</Button>
                        </p>
                     
              </Modal>
            )
       }

      return (
      
        <Modal open ={userStateCtx.progress === 'checkout'}
         onClose = {handleCloseCheckout}
        >
           
            
            <form action={formAction}>
                 <h2>Checkout</h2>
                        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                
                        <Input label="Full Name" type="text" id="full-name" name="name"/>
                        <Input label="E-Mail Address" type="email" id="email" name="email"/>
                        <Input label="Street" type="text" id="street" name="street"/>
                        <div className="control-row">
                          <Input label="Postal Code" type="text" id="postal-code" />
                          <Input label="City" type="text" id="city" />
                        </div>

                         {errorMessage && <Error title="error at checkout" message={errorMessage}></Error>}

                
                        <p className="modal-actions">
                                 <Button type="button" textOnly onClick={handleCloseCheckout}>
                                   Close
                                 </Button>
                                {pending ?<span>Submitting...</span> :
                                 <Button>Submit Order</Button> }                   
                         </p>

                         


            </form>

        </Modal>
                                
    )
  }
