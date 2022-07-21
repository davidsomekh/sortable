import React, { useEffect, useState } from "react";
import { TouchableOpacity, TextInput, View, Text } from "react-native";
import { useHover } from "react-native-web-hooks";
import { useRef } from "react";
import {  Modal } from "react-native";


import styles from "./Style.js";

export function TaskPage(props) {


  return (
    <>
      <View style={styles.page}> <Modal
      
        transparent={true}
        visible={true}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          //setModalVisible(!modalVisible);
        }}
        
      ><View style={styles.box}><Text>{props.name}</Text></View></Modal></View>
    </>
  );
}
