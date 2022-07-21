import React, { useRef ,useEffect,useState} from "react";

import { Sort } from "./pages/Sort/Sort";




export default function App() {

  const [name,setName] = useState("");

  useEffect(() => {

    setName("ds");
  
  
    }, []);
  
  
  

  return (
    <Sort/>
  );
}


