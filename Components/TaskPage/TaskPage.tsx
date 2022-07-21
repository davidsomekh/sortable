import React, { useEffect, useState } from "react";
import { View, Text,Button} from "react-native";
import { Modal } from "react-native";

import styles from "./Style.js";


export function TaskPage(props) {
  return (
    <>
      <View style={styles.page}>
       <Modal
          animationType="fade"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            //setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.box}>
            <Text>{props.name}</Text>
          </View>
          <Button
           onPress={props.close}
        title="Close"
        color="#121432"
  
      />
        </Modal>
      </View>
    </>
  );
}
