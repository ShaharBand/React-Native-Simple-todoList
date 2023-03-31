import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  TextInput,
  Keyboard,
  ScrollView,
} from "react-native";

import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    // Trim the task string to remove leading/trailing whitespaces
    const trimmedTask = task.trim();

    // Check if the trimmed task string is not empty
    if (trimmedTask.length > 0) {
      Keyboard.dismiss();
      setTaskItems([...taskItems, trimmedTask]);
      setTask("");
    }
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Today Tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>

          <View style={styles.items}>
            {/* This is where the tasks will go! */}
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeTask(index)}
                >
                  <Task text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      {/* Write a Task Section */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        styles={styles.writeTaskWrapper}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            autoFocus={true}
            style={styles.input}
            placeholder={"Write a task"}
            value={task}
            onChangeText={(text) => setTask(text)}
            onSubmitEditing={() => handleAddTask()}
          ></TextInput>
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },

  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    width: 250,
    marginLeft: 20,
    marginBottom: 20,
    flex: 1,
  },
  addWrapper: {
    marginHorizontal: 20,
    marginBottom: 20,
    width: 50,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {},
});
