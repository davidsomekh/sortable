import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Button,
  Animated,
} from "react-native";
import React, { useRef,useMemo } from "react";
import styles from "./Style.js";


export function Sort() {
  const point = React.useRef(new Animated.ValueXY());

  const flatlist = useRef<FlatList>(null);

  const panResponder = useMemo(() => 
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        console.log(gestureState);
        console.log("move event");

     //   flatlist.current?.scrollToEnd();

        Animated.event([{ y: point.current.y }], { useNativeDriver: false })({
          y: gestureState.moveY,
        });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    })
  , []);

  const data = [];
  data.push({ name: "david", key: 1 });
  data.push({ name: "roy", key: 2 });
  data.push({ name: "mike", key: 3 });
  data.push({ name: "john", key: 4 });
  data.push({ name: "daniel", key: 32});
  data.push({ name: "david", key: 5 });
  data.push({ name: "roy", key: 6 });
  data.push({ name: "mike", key: 7 });
  data.push({ name: "john", key: 8 });
  data.push({ name: "daniel", key: 9 });
  data.push({ name: "david", key: 10 });
  data.push({ name: "roy", key: 11 });
  data.push({ name: "mike", key: 12 });
  data.push({ name: "john", key: 13 });
  data.push({ name: "daniel", key: 14 });
  data.push({ name: "david", key: 15 });
  data.push({ name: "roy", key: 16 });
  data.push({ name: "mike", key: 17 });
  data.push({ name: "john", key: 18 });
  data.push({ name: "daniel", key: 19 });
  data.push({ name: "david", key: 20 });
  data.push({ name: "roy", key: 21 });
  data.push({ name: "mike", key: 22 });
  data.push({ name: "john", key: 23 });
  data.push({ name: "daniel", key: 24 });

  return (
    <View {...panResponder.panHandlers} style={styles.container}>
       
      <Animated.View style={[styles.moving, { top: point.current.getLayout().top }]}>
        <Text>Hello world</Text>
      </Animated.View>
      <FlatList
        ref={flatlist}
        style={styles.list}
        data={data}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

