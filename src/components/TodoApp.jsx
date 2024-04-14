import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from './Logout';
import Greeting from './Greeting';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useUser } from './UserContext';


function TodoApp() {
  const { setUserId } = useUser();

  onAuthStateChanged(auth, (user)=>{
    if(user){
      setUserId(user.uid)
    }
  })

  return (
    <div className="App rounded container mx -auto my-3 p-2">
      <Logout />
      <Greeting />
      <TodoForm />
      <TodoList />

    </div>
  );
}
// displayName = {username} 
export default TodoApp;