import Header from "./components/Header.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import TaskList from './components/TaskList.jsx';
import { useState } from "react";


function App() {
  const[editingTask, setEditingTask] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container">
      <Header />

      <AddTaskForm 
        editingTask={editingTask}
        setEditingTask={setEditingTask}
        setRefresh={setRefresh}
      />

      <TaskList 
        setEditingTask={setEditingTask}
        refresh={refresh}
      />
    </div>
  );
}

export default App;
