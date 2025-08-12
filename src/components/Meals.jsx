
import MealItem from "./MealItem";
import Error from "./Error";
import useHttp from "../hooks/useHttp";

const requestConfig = {}

export default function Meals(){
    //fetch meals list from backen
    // display list with button - add to cart

    
    const {isLoading, 
           error :errorMessage,
            data:availableMeals}  = useHttp('http://localhost:3000/meals',requestConfig,[]);    

    if(isLoading){
        return <p>Loading Meals...</p> 
    }

    if(errorMessage){
        return <Error title="Error Occured" message={errorMessage}></Error> 
    }

    return (
       <ul id ="meals">
            {availableMeals.map( (meal) => (
                <MealItem key={meal.id} meal={meal}></MealItem>
               ))}
        </ul>
       )
}