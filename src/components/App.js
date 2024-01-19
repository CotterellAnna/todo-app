import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import TodoForm from './TodoForm';
import TodoList from './TodoList';


function App() {
  

  return (
    <div className="App rounded container mx -auto my-3 p-2">
      <Header />
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
