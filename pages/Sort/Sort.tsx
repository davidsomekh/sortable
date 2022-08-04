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

  const [startPos, setStartPos] = useState(-1);

  const [scrollOffset, setScrollOffset] = useState(0);

  const [flatlistTopOffset, setflatlistTopOffset] = useState(0);
  const [rowHeight, setRowHeight] = useState(0);

  const flatlist = useRef<FlatList>(null);

  const [startIndex, setStartIndex] = useState(0);
  const [dragend, setDragend] = useState(false);

  const [height, setHeight] = useState(0);

  const [scrollPos, setScrollPos] = useState(0);
  const [listHeight, setListHeight] = useState(0);

  const [longpress, setLongPress] = useState(false);

  // console.log('another render');

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => {
          return false;
        },
        onStartShouldSetPanResponderCapture: (evt, gestureState) => {
          return longpress;
        },
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          return false;
        },
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
          return longpress;
        },

        onPanResponderGrant: (evt, gestureState) => {

        },
        onPanResponderMove: (evt, gestureState) => {
          if (longpress) {
            let iMoveDir = 0;

            let start = gestureState.y0 > 0 ? gestureState.y0 : startPos;

            if (startPos === -1) setStartPos(gestureState.y0);

            if (start == 0) iMoveDir = 0;
            else if (start > gestureState.moveY) iMoveDir = 2;
            else if (start < gestureState.moveY) iMoveDir = 1;

            setDragend(false);
            if (start != gestureState.moveY)
              dragAndScroll(gestureState.moveY, iMoveDir);

            setDragIndex(yToIndex(gestureState.moveY));

            if (startIndex != dragIndex && dragIndex > 0 && startIndex > 0) {
              arraymove(data, startIndex - 1, dragIndex - 1);
              fixArrayKeys();
              setStartIndex(dragIndex);
            }

            setDragging(true);

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
    [longpress, scrollOffset, dragIndex, startIndex]
  );

  const resetDrag = () => {
    if (longpress) {
      setDragend(true);
    }

    setLongPress(false);
    setDragging(false);
  };

  const hideTaskPage = () => {
    setShowTask(false);
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

    return value + 1;
  };

  const onTask = (taskname: string) => {
    setActiveTask(taskname);
    setShowTask(true);
  };

  useEffect(() => {
    if (dragend) {
      setStartPos(-1);
      setDragIndex(-1);
      setStartIndex(0);
    }
  }, [dragend]);

  const dragAndScroll = (CurrY: number, MoveDir: number) => {
    let bMoveDown = MoveDir == 0 || MoveDir == 1;
    let bMoveUp = MoveDir == 0 || MoveDir == 2;

    if (bMoveDown && CurrY != 0 && CurrY + 150 > height) {
      flatlist?.current?.scrollToOffset({
        offset: scrollOffset + 35,
        animated: false,
      });

      // setScrollOffset(scrollOffset + 35);
    } else if (bMoveUp && CurrY < 100) {
      flatlist?.current?.scrollToOffset({
        offset: scrollOffset - 35,
        animated: false,
      });
    }
  };

  interface Task {
    name: string;
    key: number;
  }

  const getRandomInt = (max)=> {
    return Math.floor(Math.random() * max);
  }

  const getRandomObject = () =>{
    let ds : Task = {key: 1, name: "bobo"};
    return ds;
  }

  const buildRanomData = () => {
    let test : Task[] = [];

    let cont = 1;
    let testItems = 25;

    while(cont <= testItems)
    {
       let ds : Task = {key: cont, name: getRandomInt(testItems).toString()};
      test.push(ds);
      cont++;
    }

    return test;
  };

  let recs: Task[] = buildRanomData();

  const [data, setData] = useState(recs); //[{name: string, key: number }[]];

  const setLong = (long, name: string, index: number) => {
    if (long) {
      Vibration.vibrate(50);
      setDraggedName(name);
      setStartIndex(index);
      setLongPress(long);
    }
  };

  function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }

  const fixArrayKeys = () => {
    for (var i = 0; i < data.length; i++) {
      data[i].key = i + 1;
      //Do something
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
            {item.key != 0 && item.name != "" && (
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
