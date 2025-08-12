import { useReducer, createContext } from "react";


//create cart context
const CartContext = createContext({
    items:[],
    addItem : (item)=>{},
    removeItem: (id)=>{},
    clearCart: ()=>{}
})

//reducer method
function cartReducer(state,action){

    if(action.type === 'ADD_ITEM'){
       const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id)   
       const updatedItems =  [...state.items]
       if(existingItemIndex > -1){
        //item exist in cart
         const existingItem = updatedItems[existingItemIndex]
         updatedItems[existingItemIndex] = {...existingItem, quantity: existingItem.quantity+1}

       }
        else{
            // new item
            updatedItems.push({...action.item, quantity:1})
       }
       return {...state , items:updatedItems}
    }
    if(action.type === 'REMOVE_ITEM'){
        const existingItemIndex = state.items.findIndex((item) => item.id === action.id)  
        const updatedItems =  [...state.items]
        const existingItem = updatedItems[existingItemIndex];
        
        if (existingItemIndex === -1) {
        return state;
       }

        if(existingItem.quantity >1){
             //reduce quantity
            updatedItems[existingItemIndex] = {...existingItem, quantity : existingItem.quantity-1}
        }
        else{
            //remove item
            updatedItems.splice(existingItemIndex,1)
        }
      return {...state, items:updatedItems}
     
    }

    if(action.type === 'CLEAR_CART'){
        return {...state, items: []}
    }

    return state;
}





export function CartContextProvider({children}){
    
const [cartState, dispatchCartAction] = useReducer(cartReducer, {items:[]})

function addItem(item){
    dispatchCartAction({type:"ADD_ITEM",item});
}

function removeItem(id){
    dispatchCartAction({type:"REMOVE_ITEM",id});
}

function clearCart(){
    dispatchCartAction({type:"CLEAR_CART"})
}

const cartCtx = {
    items:cartState.items,
    addItem,
    removeItem,
    clearCart
}

return(<CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>)
}

export default CartContext;