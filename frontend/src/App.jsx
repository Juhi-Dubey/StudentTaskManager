import Header from "./components/Header.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import TaskList from './components/TaskList.jsx';


function App() {
  return (
    <div className="container">
      <Header />
      <AddTaskForm />
      <TaskList />
    </div>
  );
}

export default App;