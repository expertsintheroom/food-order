import {useState, createContext } from "react"

//empty means load page
//cart means cart model open
//checkout means checkout model open
const UserProgressContext = createContext({
    progress:'',
    setCartState : () =>{},
    clearCartState  : () =>{},
    setCheckoutState : () =>{},
    clearCheckoutState : () =>{}
})

export function UserProgressContextProvider({children}){
  const [userState,setUserState] = useState('');

  function setCartState(){
         setUserState('cart');
  }

  function clearCartState(){
        setUserState('');
  }

  function setCheckoutState(){
        setUserState('checkout');
  }

  function clearCheckoutState(){
     setUserState('');
  }

  const userProgressCtx = {
    progress : userState,
    setCartState,
    clearCartState,
    setCheckoutState,
    clearCheckoutState

  }
  
  return(<UserProgressContext.Provider value={userProgressCtx}>
          {children}
    </UserProgressContext.Provider>)
}

export default UserProgressContext;