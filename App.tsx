import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View,PanResponder, Animated } from 'react-native';
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


