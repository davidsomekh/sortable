import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
    height:1,
  
  },
 
  draggedText:{
    color:'white',
  },
  
  dragged:{
    width:"100%",
    userSelect:"none",
    textAlign:"center",
    padding:12,
    cursor:"pointer",

  },
  standing:{
    width:"100%",
    cursor:"pointer",
    userSelect:"none",
    textAlign:"center",
    padding:12,
   

  }

});