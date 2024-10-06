import React, { FC, useState, useEffect, ChangeEvent } from "react";
import "./App.css";
import { ITask } from "./interfaces";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadLine, setDeadLine] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  // Загружаем задачи из локального хранилища при первой загрузке компонента
  useEffect(() => {
    const savedTodos = localStorage.getItem("todoList");
    if (savedTodos) {
      setTodoList(JSON.parse(savedTodos));
    }
  }, []);

  // Сохраняем задачи в локальное хранилище каждый раз, когда обновляется todoList
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadLine(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    if (task.trim() && deadLine > 0) {
      const newTask = { taskName: task, deadline: deadLine };
      setTodoList([...todoList, newTask]);
      setTask("");
      setDeadLine(0);
    }
  };

  const deleteTask = (taskToDelete: string): void => {
    setTodoList(todoList.filter((item) => item.taskName !== taskToDelete));
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            name="deadline"
            value={deadLine}
            placeholder="Deadline (in Days)..."
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map((item, index) => (
          <div key={index} className="task">
            <span>
              {item.taskName} - {item.deadline} days
            </span>
            <button onClick={() => deleteTask(item.taskName)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
