import React, { useEffect, useState } from "react";
import { Pressable, TextInput, View, Text } from "react-native";
import { useHover } from "react-native-web-hooks";
import { useRef } from "react";
import { isApple } from "../../Shared/GetPlatform";
import { isAndroid } from "../../Shared/GetPlatform";
import { isWeb } from "../../Shared/GetPlatform";

import styles from "./Style.js";

export function TaskRow(props) {
  const ref = useRef(null);
  const isHovered = useHover(ref);

  const moving = props.moving;

  const onTask = () => {
    props.onClick(props.name);
  };

  const onLong = () => {
    props.onLong(true,props.name,props.index);
  };

  const onRelease = () => {
    //  console.log('on relesae called');
    props.onLong(false,props.name,props.index);
  };

  const getLongPressDelay = ()=>{
    if(isAndroid())
      return 110;
    else if(isApple())
      return 110;

    //Web
    return 100;
  }
  
  return (
    <>
      {!moving && (
        <Pressable
          style={[props.active && styles.active, styles.main]}
          ref={ref}
          onPress={onTask}
          onPressOut={onRelease}
          onLongPress={onLong}
          delayLongPress={getLongPressDelay()}
        >
          <Text
            style={[
              moving && styles.moving,
              !moving && isHovered && styles.hover,
              !isHovered && styles.notHover,
            ]}
          >
            {props.name}
          </Text>
        </Pressable>
      )}
      {moving && (
        <View  ref={ref} style={styles.moving}>
          <Text style={styles.textMoving}>{props.name}</Text>
        </View>
      )}
    </>
  );
}
