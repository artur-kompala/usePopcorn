import { useEffect } from "react";

export function useKey(key,action){
    useEffect(()=>{
        function callback(e){
          if (e.key === key) {
            action();
          }
        }
        document.addEventListener("keyup", callback)
        return ()=>document.removeEventListener('keyup',callback); 
    },[action,key])
}