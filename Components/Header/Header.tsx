import React from "react";
import { TextInput, View, Text } from "react-native";
import useCheckMobile from "../../Hooks/useCheckMobile";

import styles from "./Style.js";

export function Header(props) {
  const isMobile = useCheckMobile();
  return (
    <>
      <View style={styles.main}>
  
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </>
  );
}
