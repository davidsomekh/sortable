import { StyleSheet } from "react-native";

export default StyleSheet.create({
  main: {
    padding: 6,
    color:"white",
  },
  hover: {
    width:"100%",
    cursor:"pointer",
    userSelect:"none",
    textAlign:"center",
    padding:12,
    backgroundColor:'#121432',
    color:"white",

    
  },
  textMoving:{
    color:"white",

  },
  moving:{
    
    width:"100%",
    cursor:"pointer",
    userSelect:"none",
    textAlign:"center",
    padding:12,
    backgroundColor:'#121432',
    color:"white",
  },
  active:{
    borderLeftWidth:3,
    borderLeftColor:"pink",
  },
  notHover:{
    width:"100%",
    cursor:"pointer",
    userSelect:"none",
    textAlign:"center",
    padding:12
  }
});