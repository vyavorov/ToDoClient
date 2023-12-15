import { useEffect, useState } from 'react';
import TableListRow from './TableListRow';
import styles from './TodoListTable.module.css';
import formStyles from './TodoListForm.module.css';
import loaderStyle from './Loader.module.css';
import * as todoService from '../services/todoService';

export default function TodoListTable() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState('');
  const [isModalShown, setIsModalShown] = useState(false);
  const [currentRowId, setCurrentRowId] = useState();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await todoService.GetAll();
      setTodos(response);
      console.log(todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
      // Handle the error, e.g., display an error message to the user
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (newTask.trim() !== '') {
      try {
        await todoService.Create(newTask.trim());
        setNewTask('');
        setTodos((prevTodos) => [...prevTodos, { title: newTask, isCompleted: false }]);
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  const deleteTask = async () => {
    try {
      await todoService.Remove(currentRowId);
      setIsModalShown(false);
      setCurrentRowId(0);
      fetchData();
    }
    catch (error) {
      console.log(error)
    }
  }

  const showModal = (id) => {
    setIsModalShown(true);
    setCurrentRowId(id);
  }

  const hideModal = () => {
    setIsModalShown(false);
    setCurrentRowId(0);
  }

  if (loading) {
    return (
      <div className={loaderStyle.loaderContainer}>
        <div className={loaderStyle.loader}></div>
      </div>
    )
  }

  return (
    <>
      {isModalShown &&
        <div className={styles.modalWrapper}>
          <p>Are you sure you want to delete this task?</p>
          <button onClick={hideModal}>Cancel</button>
          <button onClick={deleteTask}>Yes</button>
        </div>
      }

      <div className={formStyles.todoList}>
        <h1>Todo List</h1>
        <div className={formStyles.todoForm}>
          <input
            type="text"
            placeholder="New task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>

      <table className={styles.taskTable}>
        <thead>
          <tr>
            <th>Task</th>
            <th>Completed?</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => <TableListRow key={todo.id} todo={todo} showModal={showModal}/>)}
          {console.log(todos)}
        </tbody>
      </table>
    </>
  );
}