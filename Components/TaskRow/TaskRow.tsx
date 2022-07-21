import React, { useEffect, useState } from "react";
import { TouchableOpacity, TextInput, View, Text } from "react-native";
import { useHover } from "react-native-web-hooks";
import { useRef } from "react";

import styles from "./Style.js";

export function TaskRow(props) {
  const ref = useRef(null);
  const isHovered = useHover(ref);

  console.log(props);

  return (
    <>
      <TouchableOpacity
        style={[props.active && styles.active, styles.main]}
        ref={ref}
        onPress={props.onClick}
      >
        <View>
          <Text style={[isHovered && styles.hover,!isHovered && styles.notHover]}>{props.name}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}