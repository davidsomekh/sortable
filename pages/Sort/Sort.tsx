import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
} from "react-native";
import React, { useRef,useMemo } from "react";

export function Sort() {
  const point = React.useRef(new Animated.ValueXY());

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
  data.push({ name: "roy", key: 1 });
  data.push({ name: "mike", key: 1 });
  data.push({ name: "john", key: 1 });
  data.push({ name: "daniel", key: 1 });
  data.push({ name: "david", key: 1 });
  data.push({ name: "roy", key: 1 });
  data.push({ name: "mike", key: 1 });
  data.push({ name: "john", key: 1 });
  data.push({ name: "daniel", key: 1 });
  data.push({ name: "david", key: 1 });
  data.push({ name: "roy", key: 1 });
  data.push({ name: "mike", key: 1 });
  data.push({ name: "john", key: 1 });
  data.push({ name: "daniel", key: 1 });
  data.push({ name: "david", key: 1 });
  data.push({ name: "roy", key: 1 });
  data.push({ name: "mike", key: 1 });
  data.push({ name: "john", key: 1 });
  data.push({ name: "daniel", key: 1 });
  data.push({ name: "david", key: 1 });
  data.push({ name: "roy", key: 1 });
  data.push({ name: "mike", key: 1 });
  data.push({ name: "john", key: 1 });
  data.push({ name: "daniel", key: 1 });

  return (
    <View {...panResponder.panHandlers} style={styles.container}>
      <Animated.View style={[styles.moving, { top: point.current.getLayout().top }]}>
        <Text>Hello world</Text>
      </Animated.View>
      <FlatList
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
  },
  row: {
    backgroundColor: "orange",
    textAlign: "center",
    padding: 24,
  },
  moving: {
    backgroundColor: "pink",
    textAlign: "center",
    padding: 24,
    width: "100%",
    zIndex: 2,
  },
});
