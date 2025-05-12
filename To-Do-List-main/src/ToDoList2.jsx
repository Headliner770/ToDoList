import { useState } from "react";
import { Input } from "./Input";
// import useInput from "./useInput";

const TODOS = [
  { id: 3, title: "Купить кофе", isCompleted: false, tasksDate: new Date() },
  { id: 4, title: "Помыть авто", isCompleted: false, tasksDate: new Date() },
  {
    id: 1,
    title: "Пожарить гвоздей",
    isCompleted: false,
    tasksDate: new Date(),
  },
  {
    id: 6,
    title: "Выбросить мусор",
    isCompleted: false,
    tasksDate: new Date(),
  },
  {
    id: 5,
    title: "Разогнать голубей",
    isCompleted: false,
    tasksDate: new Date(),
  },
  { id: 2, title: "Read a book", isCompleted: false, tasksDate: new Date() },
];

export default function ToDoList() {
  const [tasks, setTasks] = useState(TODOS);
  const [directionSort, setDirectionSort] = useState(true); //сорт по алф
  const [hideCompleted, setHideCompleted] = useState(true); //скрытие задач
  const [selectedTasks, setSelectedTasks] = useState("all"); //select
  // const input = useInput(); //кастомный хук (Минин)
  // const [newTask, setNewTask] = useState("");
  // const [editId, setEditId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  console.log("tasks PARENT", tasks);

  // function handleEditChange(event) {
  //   setEditTask(event.target.value);
  // }

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setNewTitle(task.title);
  };

  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
    setEditingTaskId(null);
    setNewTitle("");
  };

  function deleteTask(id) {
    const updatedTasks = tasks.filter((item) => item.id !== id);
    setTasks(updatedTasks);
  }

  function addTask(newTaskTitle) {
    const trimmedNewTask = newTaskTitle.trim();
    if (trimmedNewTask) {
      setTasks((prevState) => [
        ...prevState,
        {
          id: Date.now(),
          title: trimmedNewTask,
          isCompleted: false,
          tasksDate: new Date(), //добавл дату
        }, //генерим id
      ]);
    }
  }

  // function editTaskHandler(id) {
  //   setEditId(id);
  //   setEditTask(tasks[id].title);
  // }

  // ф-я с параметром id
  function toggleTaskCompletion(id) {
    //ф-я для обновл сост сп-ка задач (prevTasks)
    setTasks((prevTasks) =>
      // метод map проходит по каждому элементу (задаче) в массиве prevTasks.
      prevTasks.map((task) =>
        // совпад id
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  }

  // Сорт А - Я / Я - А
  function sortedTasks() {
    const sortedTasks = [...tasks].sort(
      (a, b) =>
        directionSort
          ? a.title.localeCompare(b.title) // А - Я
          : b.title.localeCompare(a.title) // Я - А
    );
    setTasks(sortedTasks);
    setDirectionSort(!directionSort); // меняем сорт
  }

  // Сорт id
  function sortedId() {
    const sortedId = [...tasks].sort((a, b) => a.id - b.id);
    setTasks(sortedId);
  }

  // Скрытие задач
  function hideTasks() {
    setHideCompleted((prev) => !prev);
  }

  // Актуал дата
  let currentDate = new Date();
  console.log(currentDate);

  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>
      <div>
        <Input addTask={addTask} />
        <button onClick={sortedTasks} style={{ backgroundColor: "orange" }}>
          A-Я / Я-А
        </button>
        <button onClick={sortedId} style={{ backgroundColor: "orange" }}>
          Сорт по ID
        </button>
        <button
          onClick={hideTasks}
          style={{ backgroundColor: "rgb(120, 119, 119)" }}
        >
          {hideCompleted ? "Hide 👓" : "Show 👀"}
        </button>
        <select
          // select
          value={selectedTasks}
          onChange={(e) => setSelectedTasks(e.target.value)}
        >
          <option value="all">Все</option>
          <option value="completed">Выполненные</option>
          <option value="notCompleted">Не выполненные</option>
        </select>
        <ol>
          {tasks
            // фильтр select
            .filter((task) => {
              if (selectedTasks === "completed") return task.isCompleted;
              if (selectedTasks === "notCompleted") return !task.isCompleted;
              return true;
            })
            .filter((task) => hideCompleted || !task.isCompleted) // фильтуем таски
            .map((task) => (
              <li
                key={task.id}
                style={{
                  textDecoration: task.isCompleted ? "line-through" : "white",
                  backgroundColor: task.isCompleted
                    ? "rgb(75, 188, 128)"
                    : "white",
                }}
              >
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => toggleTaskCompletion(task.id)} // знаю, чекбокс должен быть в комп Input
                  // className="control"
                  // {...input}
                />
                {editingTaskId === task.id ? (
                  <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                ) : (
                  <span className="text">{task.title}</span>
                )}

                {editingTaskId === task.id ? (
                  <button
                    onClick={() => saveEdit(task.id)}
                    style={{ backgroundColor: "rgb(152, 238, 147)" }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing(task)}
                    style={{ backgroundColor: "rgb(111, 92, 92)" }}
                  >
                    Edit
                  </button>
                )}

                <span className="date">
                  {/* вывод дата + время */}
                  {/* {task.tasksDate.toLocaleString()} */}
                </span>
                <button
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
                <>
                  <span className="date">
                    {/* вывод дата */}
                    {task.tasksDate.toLocaleDateString()}
                  </span>
                </>
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}
