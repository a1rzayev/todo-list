import React, { useState } from "react";
import { v4 } from "uuid";

type Task = {
  id: string;
  text: string; 
  done: boolean
 };

export default function HomeScreen() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const add = () => {
    if (!text.trim()) return;
    setTasks([...tasks, { id: v4(), text, done: false }]);
    setText("");
  };
}
