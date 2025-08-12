import Header from "./components/header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import {UserProgressContextProvider} from "./store/UserProgressContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import CheckoutWithFormAction from "./components/CheckoutWithFormAction.jsx"

function App() {
  return (
    <>
      <UserProgressContextProvider>
        
       <CartContextProvider>    
        <Header/>
        <Meals/>
        <Cart/>
        <Checkout/>
       </CartContextProvider>
      </UserProgressContextProvider>
     
     </>
  );
}

export default App;
