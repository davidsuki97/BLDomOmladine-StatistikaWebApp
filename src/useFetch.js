import { useEffect, useState } from "react";
import getToken from './App.js';
import useToken from './useToken.js';
export function uzmiToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
   }

const useFetch = (url) => {
    const [data,setData]=useState(null);
    const [isPending,setIsPending]=useState(true);
    const [error,setError]=useState(null);
    const [token, setToken] = useState(getToken());
   
    const headers= {'Authorization': 'Bearer '+uzmiToken()};

    useEffect(()=>{
        const abortCont=new AbortController();
    setTimeout(()=>{
        fetch(url,{headers},{signal:abortCont.signal})
        .then(res=>{
            if(!res.ok){
                throw Error('Could not fetch the data resource')
            }
            return res.json();
        })
        .then(data=>{
            setIsPending(false);
            setData(data);
            setError(null);
        })
        .catch(err=>{
            if(err.name==='AbortError'){
            console.log('fetch aborted')
        } else {
            setIsPending(false);
            setError(err.message);
        }
    })
    },0);
    return ()=> abortCont.abort();
    },[url])
    return {data,isPending,error};
}
 
export default useFetch;