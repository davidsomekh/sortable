import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  Vibration,
  View,
  PanResponder,
  Button,
  Animated,
  SafeAreaView,
} from "react-native";
import React, { useRef, useMemo, useState } from "react";
import styles from "./Style.js";




import {isApple} from "../../Shared/GetPlatform";
import {isAndroid} from "../../Shared/GetPlatform";
import {isWeb} from "../../Shared/GetPlatform";

import { TaskRow } from "../../Components/TaskRow/TaskRow";
import { TaskPage } from "../../Components/TaskPage/TaskPage";

export function Sort() {
  const point = React.useRef(new Animated.ValueXY());
  const [dragging, setDraging] = useState(false);

  const [activeTask,setActiveTask] = useState("");
  const [showTask,setShowTask] = useState(false);

  const flatlist = useRef<FlatList>(null);

  let stillPressing = false;
  let longPress = false;

  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS
  ];

  const PATTERN_DESC =
    isAndroid()
      ? "wait 1s, vibrate 2s, wait 3s"
      : "wait 1s, vibrate, wait 2s, vibrate, wait 3s";
  

  const getLongPressDelay = () =>{
    if(isApple())
      return 500;
    else if(isAndroid())
      return 1000;
      
    return 150;
  }

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => false,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (evt, gestureState) => {
          stillPressing = true;

         // Vibration.vibrate(20);

          setTimeout(function () {
            if (stillPressing) {
              //if(isAndroid())
               // setDraging(true);
               Vibration.vibrate(20);

              longPress = true;
            }
          }, getLongPressDelay());

          // The gesture has started. Show visual feedback so the user knows
          // what is happening!
          // gestureState.d{x,y} will be set to zero now
        },
        onPanResponderMove: (evt, gestureState) => {
          if (longPress) {
            setDraging(true);
            Animated.event([{ y: point.current.y }], {
              useNativeDriver: false,
            })({
              y: gestureState.moveY - 15,
            });
          }
        },
        onPanResponderTerminationRequest: (evt, gestureState) => false,
        onPanResponderRelease: (evt, gestureState) => {
          // The user has released all touches while this view is the
          // responder. This typically means a gesture has succeeded
          longPress = false;
          stillPressing = false;
          setDraging(false);
        },
        onPanResponderTerminate: (evt, gestureState) => {
          longPress = false;
          stillPressing = false;
          setDraging(false);
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          // Returns whether this component should block native components from becoming the JS
          // responder. Returns true by default. Is currently only supported on android.
          return true;
        },
      }),
    []
  );

  const hideTaskPage = ()=>{
    setShowTask(false);
  }

  const onTask = (taskname:string)=>{
    setActiveTask(taskname);
    setShowTask(true);
    console.log('task clicked: ' + taskname);
  }

  const data: {}[] = [];
  data.push({ name: "dss", key: 1 });
  data.push({ name: "roy", key: 2 });
  data.push({ name: "mike", key: 3 });
  data.push({ name: "john", key: 4 });
  data.push({ name: "daniel", key: 32 });
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

  const renderDrag = () => (
    <TaskRow moving={true} name="john" />
  );

  return (
    <SafeAreaView style={styles.container}>
      {showTask && <TaskPage close={hideTaskPage} name={activeTask}/>}
      <Animated.View
        style={{
          zIndex: 2,
          width: "100%",

          top: point.current.getLayout().top,
        }}
      >
     
        {dragging && renderDrag()}
      </Animated.View>

      <FlatList
        scrollEnabled={isWeb() || !dragging}
        ref={flatlist}
        style={styles.list}
        data={data}
        renderItem={({ item }) => (
          <View {...panResponder.panHandlers}>
            <TaskRow onClick={onTask} name={item.name} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
