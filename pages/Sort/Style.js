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
  },
  moving: {
    backgroundColor: "pink",
    textAlign: "center",
    userSelect: "none",
    padding: 24,
    width: "100%",
    zIndex: 2,
  },
});