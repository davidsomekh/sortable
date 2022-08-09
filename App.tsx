import React, { useRef ,useEffect,useState} from "react";

import { Sort } from "./pages/Sort/Sort";
import { Header } from "./Components/Header/Header";


export default function App() {

  const [name,setName] = useState("");

  useEffect(() => {

    setName("ds");
  
  
    }, []);
  
  
  

  return (
    <>
  
    <Header title="inbox"/>
    <Sort/>
    </>
 
  );
}


