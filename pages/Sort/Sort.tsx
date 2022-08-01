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

  const [dragIndex, setDragIndex] = useState(-1);

  const [draggedName, setDraggedName] = useState("");

  const [activeTask, setActiveTask] = useState("");
  const [showTask, setShowTask] = useState(false);

  const [scrollOffset, setScrollOffset] = useState(0);

  const [flatlistTopOffset, setflatlistTopOffset] = useState(0);
  const [rowHeight, setRowHeight] = useState(0);

  const flatlist = useRef<FlatList>(null);

  const [startIndex, setStartIndex] = useState(0);
  const [dragend, setDragend] = useState(false);
  const [currentY, setCurrentY] = useState(0);

  const [height, setHeight] = useState(0);

  const [scrollPos, setScrollPos] = useState(0);
  const [listHeight, setListHeight] = useState(0);

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
            setDragend(false);
            let d = 0;
            setCurrentY(gestureState.moveY);
            setDragIndex(yToIndex(gestureState.moveY));
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
          resetDrag();
        },
        onPanResponderTerminate: (evt, gestureState) => {
          resetDrag();
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          return true;
        },
      }),
    [longpress]
  );

  const resetDrag = () => {
    if (longpress) {
      setDragend(true);
    }

    // setDragIndex(-1);
    // setStartIndex(0);

    setLongPress(false);
    setDragging(false);
  };

  const hideTaskPage = () => {
    setShowTask(false);
  };

  const immutableMove = (arr, from, to) => {
    return arr.reduce((prev, current, idx, self) => {
      if (from === to) {
        prev.push(current);
      }
      if (idx === from) {
        return prev;
      }
      if (from < to) {
        prev.push(current);
      }
      if (idx === to) {
        prev.push(self[from]);
      }
      if (from > to) {
        prev.push(current);
      }
      //setData(arr);
    }, []);
  };

  const yToIndex = (y: number) => {
    const value = Math.floor(
      (scrollOffset + y - flatlistTopOffset) / rowHeight
    );

    if (value < 0) {
      return 0;
    }

    if (value > data.length - 1) {
      return data.length - 1;
    }

    //console.log(value + 1);

    return value + 1;
  };

  const indexToName = (index: number) => {
    let name = "null";
    for (const row of data) {
      if (index === row.key) name = row.name;
    }

    // setDraggedName(name);
  };

  const onTask = (taskname: string) => {
    setActiveTask(taskname);
    setShowTask(true);
  };

  const handleRemove = (indexRemove) => {
    const items = data;
    if (items.length > 0) {
      const lastIndex = items.length - 1;
      setData(items.filter((item, index) => index !== indexRemove));
    }
  };

  useEffect(() => {
    if (dragend) {
      console.log(startIndex);
      console.log(dragIndex);
      setDragIndex(-1);
      setStartIndex(0);
    }
  }, [dragend]);

  useEffect(() => {
    requestAnimationFrame(() => {
      // check if we are near the bottom or top
      if (currentY != 0 && currentY + 150 > height) {
        flatlist?.current?.scrollToOffset({
          offset: scrollOffset + 35,
          animated: false,
        });
      } else if (currentY < 100) {
        flatlist?.current?.scrollToOffset({
          offset: scrollOffset - 35,
          animated: false,
        });
      }
    });
  }, [currentY]);

  let recs = [{ name: "", key: 0 }];
  recs.push({ name: "dave", key: 1 });
  recs.push({ name: "roy", key: 2 });
  recs.push({ name: "mike", key: 3 });
  recs.push({ name: "john", key: 4 });
  recs.push({ name: "david", key: 5 });
  recs.push({ name: "roy", key: 6 });
  recs.push({ name: "mike", key: 7 });
  recs.push({ name: "john", key: 8 });
  recs.push({ name: "daniel", key: 9 });
  recs.push({ name: "david", key: 10 });
  recs.push({ name: "roy", key: 11 });
  recs.push({ name: "mike", key: 12 });
  recs.push({ name: "john", key: 13 });
  recs.push({ name: "daniel", key: 14 });
  recs.push({ name: "david", key: 15 });
  recs.push({ name: "roy", key: 16 });
  recs.push({ name: "mike", key: 17 });
  recs.push({ name: "john", key: 18 });
  recs.push({ name: "daniel", key: 19 });
  recs.push({ name: "david", key: 20 });
  recs.push({ name: "roy", key: 21 });
  recs.push({ name: "mike", key: 22 });
  recs.push({ name: "john", key: 23 });
  recs.push({ name: "daniel", key: 24 });

  const [data, setData] = useState(recs); //[{name: string, key: number }[]];

  const setLong = (long, name: string, index: number) => {
    if (long) {
      Vibration.vibrate(50);
      setDraggedName(name);
      setStartIndex(index);
      setLongPress(long);
    }
  };

  const renderDrag = () => <TaskRow moving={true} name={draggedName} />;

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
        onScroll={(e) => {
          setScrollOffset(e.nativeEvent.contentOffset.y);
        }}
        onLayout={(e) => {
          setHeight(e.nativeEvent.layout.height);

          setflatlistTopOffset(e.nativeEvent.layout.y);
        }}
        ref={flatlist}
        style={styles.list}
        data={data}
        renderItem={({ item }) => (
          <View
            onLayout={(e) => {
              setRowHeight(e.nativeEvent.layout.height);
            }}
            style={{
              opacity: dragIndex === item.key ? 0 : 1,
            }}
          >
            {item.key != 0 && (
              <TaskRow
                onLong={setLong}
                onClick={onTask}
                name={item.name}
                index={item.key}
              />
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}
