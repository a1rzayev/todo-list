import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

type Task = {
  id: string;
  text: string;
  done: boolean;
};

export default function HomeScreen() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const add = () => {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), text, done: false }]);
    setText("");
  };
  const toggle = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <View style={stylesheet.box}>
      <View style={stylesheet.row}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="New task"
          style={stylesheet.input}
        />
        <TouchableOpacity onPress={add} style={stylesheet.btn}>
          <Text style={stylesheet.btnText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(t) => t.id}
        renderItem={({ item }) => (
          <View style={stylesheet.item}>
            <TouchableOpacity onPress={() => toggle(item.id)}>
              <Text style={[stylesheet.task, item.done && stylesheet.done]}>{item.text}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const stylesheet = StyleSheet.create({
  box: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  row: { flexDirection: "row", marginBottom: 15 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    padding: 10,
  },
  btn: {
    marginLeft: 10,
    backgroundColor: "#28a",
    borderRadius: 5,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  btnText: { color: "#fff", fontSize: 20 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  task: { fontSize: 16 },
  done: { textDecorationLine: "line-through", color: "gray" },
});
