// call http get , post , input url config obj
// output isLoading , error, data, sendRequest method for call on user action
// page onLoad call through useEffect
import { useCallback } from "react";
import { useEffect, useState } from "react";

async function sendHttpRequest(url,config){
 
    const response = await fetch(url,config);
    const resData = await response.json();
   
    if(!response.ok){
        throw new Error(resData.message || "Some thing went wrong, request failed")
    }
    
   return resData;
}

export default function useHttp(url,config,initialData){
  

   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState(initialData);
   const [error, setError] = useState('');

  function clearData() {
    setData(initialData);
  }

   const sendRequest = useCallback(async function sendRequest(data){
       setIsLoading(true);
       try{
        console.log('data>>'+data)
        const resData = await sendHttpRequest(url,{...config,body:data})
        setData(resData)
       }catch(e){
        console.log(JSON.stringify(e))
        setError(e.message || 'Something went wrong')
       }
       setIsLoading(false);
    },[url,config])


   useEffect(()=>{
        if((config && ( config.method ==='GET' || !config.method)) || !config){
                sendRequest();
        }
    }
    ,[sendRequest,config])


    console.log(error)

   return {
    isLoading,
    data,
    error,
    sendRequest,
    clearData
   }
}