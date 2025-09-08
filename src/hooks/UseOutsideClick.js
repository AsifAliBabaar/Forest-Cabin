import { useEffect,useRef } from "react";
export function UseOutsideClick(handler,listenCapturing=true) {
  let ref=useRef();

  useEffect(function(){
    function handleClick(e){
      if(ref.current && !ref.current.contains(e.target)){
        handler();
        console.log("clicked outsied");
      }

    }
      document.addEventListener("click",handleClick,listenCapturing)
     return()=> document.removeEventListener("click",handleClick,listenCapturing)
  },[handler,listenCapturing])

  return ref;

}

