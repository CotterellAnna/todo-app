import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from './Logout';
import Header from './Header';
import TodoForm from './TodoForm';
import TodoList from './TodoList';


function TodoApp() {
  

  return (
    <div className="App rounded container mx -auto my-3 p-2">
      <Logout />
      <Header />
      <TodoForm />
      <TodoList />

    </div>
  );
}

export default TodoApp;