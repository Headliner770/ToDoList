import { useState } from "react";

export default function ToDoList() {
  const [tasks, setTasks] = useState([
    "Купить кофе",
    "Помыть авто",
    "Пожарить гвоздей",
  ]);
  const [newTask, setNewTask] = useState("");

  const [editIndex, setEditIndex] = useState(null); // индекс задачи
  const [editTask, setEditTask] = useState(""); // текст задачи

  // Состояние для отслеживания завершенных задач
  const [completedTasks, setCompletedTasks] = useState(
    Array(tasks.length).fill(false)
  );

  function handleInputChange(event) {
    setNewTask(event.target.value); //ввод текста
  }

  function handleEditChange(event) {
    setEditTask(event.target.value);
  }

  function addTask() {
    //удаление пробелов
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]); //????
      setNewTask(""); //добавляем новую задачу через input
    }
  }

  function editTaskHandler(index) {
    setEditIndex(index);
    setEditTask(tasks[index]); //  редактирование
  }

  function saveTask(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editTask; // рекатир текст
    setTasks(updatedTasks);
    setEditIndex(null); // сброс индекса редактир?????
  }

  function toggleTaskCompletion(index) {
    const updatedCompletedTasks = [...completedTasks];
    updatedCompletedTasks[index] = !updatedCompletedTasks[index];
    setCompletedTasks(updatedCompletedTasks);
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
        setTasks(updatedTasks),
      ];
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
        setTasks(updatedTasks),
      ];
    }
  }

  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>

        <ol>
          {tasks.map((task, index) => (
            <li
              key={index}
              style={{
                backgroundColor: completedTasks[index]
                  ? "rgb(2, 159, 2)"
                  : "white",
              }}
            >
              <input
                type="checkbox"
                checked={completedTasks[index]}
                onChange={() => toggleTaskCompletion(index)}
              />
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editTask}
                    onChange={handleEditChange}
                  />
                  <button
                    className="save-button"
                    onClick={() => saveTask(index)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="text">{task}</span>
                  <button
                    className="edit-button"
                    onClick={() => editTaskHandler(index)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>

                  <button
                    className="move-button"
                    onClick={() => moveTaskUp(index)}
                  >
                    👆
                  </button>

                  <button
                    className="move-button"
                    onClick={() => moveTaskDown(index)}
                  >
                    👇
                  </button>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
