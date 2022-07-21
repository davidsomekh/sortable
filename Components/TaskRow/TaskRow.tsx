import React, { useEffect, useState } from "react";
import { TouchableOpacity, TextInput, View, Text } from "react-native";
import { useHover } from "react-native-web-hooks";
import { useRef } from "react";

import styles from "./Style.js";

export function TaskRow(props) {
  const ref = useRef(null);
  const isHovered = useHover(ref);

  const moving = props.moving;

  const onTask = ()=>{
    props.onClick(props.name);
  }

  return (
    <>
      {!moving && 
        <TouchableOpacity
        delayPressIn={10000}      
          style={[props.active && styles.active, styles.main]}
          ref={ref}
          onPress={onTask}
        >
          <View>
            <Text
              style={[
                moving && styles.moving,
                !moving && isHovered && styles.hover,
                !isHovered && styles.notHover,
              ]}
            >
              {props.name}
            </Text>
          </View>
        </TouchableOpacity>
      }
      {moving && 
        <View style={styles.moving}>
          <Text style={styles.textMoving}>{props.name}</Text>
        </View>
      }
    </>
  );
}
