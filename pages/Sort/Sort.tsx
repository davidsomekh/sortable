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
import React, { useRef, useMemo, useState, useEffect } from "react";
import styles from "./Style.js";

import { isApple } from "../../Shared/GetPlatform";
import { isAndroid } from "../../Shared/GetPlatform";
import { isWeb } from "../../Shared/GetPlatform";

import { TaskRow } from "../../Components/TaskRow/TaskRow";
import { TaskPage } from "../../Components/TaskPage/TaskPage";

export function Sort() {
  const point = React.useRef(new Animated.ValueXY());
  const [dragging, setDragging] = useState(false);

  const [activeTask, setActiveTask] = useState("");
  const [showTask, setShowTask] = useState(false);

  const [scrollOffset,setScrollOffset] = useState(0);

  const flatlist = useRef<FlatList>(null);

  let flatListHeight = 0;
 

  const [currentY,setCurrentY] = useState(0);

  const [height,setHeight] = useState(0);




  const [scrollPos,setScrollPos]  = useState(0);
  const [listHeight,setListHeight] = useState(0);

  const [longpress, setLongPress] = useState(false);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => {
          return false;
        },
        onStartShouldSetPanResponderCapture: (evt, gestureState) => {
          // console.log('testing');
          return longpress;
        },
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          return false;
        },
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
          //   console.log('testing move');

          // if(longpress)
          // console.log('draggoing');
          return longpress;
        },

        onPanResponderGrant: (evt, gestureState) => {
          // console.log('onPanResponderGrant');
        },
        onPanResponderMove: (evt, gestureState) => {
          if (longpress) {
            let d = 0;
            setCurrentY(gestureState.moveY);  
            setDragging(true);
            // setDraging(true);
            Animated.event([{ y: point.current.y }], {
              useNativeDriver: false,
            })({
              y: gestureState.moveY - 15,

            });
          }
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
          setLongPress(false);
          setDragging(false);
        },
        onPanResponderTerminate: (evt, gestureState) => {
          setLongPress(false);
          setDragging(false);
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          return true;
        },
      }),
    [longpress]
  );

  const hideTaskPage = () => {
    setShowTask(false);
  };

  const onTask = (taskname: string) => {
       setActiveTask(taskname);
    setShowTask(true);
  
  };

  useEffect(() => {
    requestAnimationFrame(() => {
    
       // check if we are near the bottom or top
       if (currentY != 0 && (currentY + 150 > height)) {
        console.log('bottom');
        flatlist?.current?.scrollToOffset({
          offset: scrollOffset + 35,
          animated: false
        });
        
     
      }
     else if (currentY < 100) {
        flatlist?.current?.scrollToOffset({
        offset: scrollOffset - 35,
        animated: false
      });
    }
    })
  }, [currentY]);



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

  const setLong = (long) => {
    if (long) 
    {
      Vibration.vibrate(50);
      setLongPress(long);
    }
  };

  const renderDrag = () => <TaskRow moving={true} name="john" />;

  return (
    <SafeAreaView {...panResponder.panHandlers} style={styles.container}>
      {showTask && <TaskPage close={hideTaskPage} name={activeTask} />}
      <Animated.View
        style={{
          zIndex: 2,
          width: "100%",
          position: "absolute",
          top: point.current.getLayout().top,
        }}
      >
        {dragging && renderDrag()}
      </Animated.View>

      <FlatList
        scrollEnabled={isWeb() || !dragging}
        onScroll={e => {
          setScrollOffset(e.nativeEvent.contentOffset.y);
        }}
        onLayout={e => {
          console.log(e.nativeEvent.layout.height);
          setHeight(e.nativeEvent.layout.height);
        }}
        ref={flatlist}
        style={styles.list}
        data={data}
        renderItem={({ item }) => (
          <View>
            <TaskRow onLong={setLong} onClick={onTask} name={item.name} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
