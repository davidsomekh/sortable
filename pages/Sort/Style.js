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
  row: {
    backgroundColor: "orange",
    textAlign: "center",
    padding: 24,
    userSelect: "none",
    zIndex: 1,
  },
  moving: {
    width:"100%",
    zIndex: 2,
    backgroundColor:"pink",
    userSelect:"none",
    textAlign:"center",
    padding:12,
  },
  standing:{
    width:"100%",
    userSelect:"none",
    textAlign:"center",
    padding:12,
   

  }

});