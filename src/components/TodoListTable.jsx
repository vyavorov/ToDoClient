import { useEffect, useState } from 'react';
import TableListRow from './TableListRow';
import styles from './TodoListTable.module.css';
import formStyles from './TodoListForm.module.css';
import loaderStyle from './Loader.module.css';
import * as todoService from '../services/todoService';
import Pagination from './Pagination';
import Nav from './Nav';
import { useAuth } from '../contexts/authContext';

export default function TodoListTable() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState('');
  const [isModalShown, setIsModalShown] = useState(false);
  const [currentRowId, setCurrentRowId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [activePageFromParent, setActivePageFromParent] = useState(1);
  const { setAuthenticated } = useAuth();

  useEffect(() => {
    fetchData(1);
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  const fetchData = async (page) => {
    try {
      let response = await todoService.GetAll(page);
      if (response.length === 0) {
        if (page === 1) {
          response = [];
        }
        else {
          response = await todoService.GetAll(page - 1);
          setActivePageFromParent(page - 1);
        }
      }
      else {
        setActivePageFromParent(page);
      }
      setTodos(response);
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
        fetchData(currentPage);
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
      fetchData(currentPage);
    }
    catch (error) {
      console.log(error)
    }
  }

  const completeTask = async (id) => {
    try {
      await todoService.Complete(id);
      fetchData(currentPage);
      // await todoService.Complete(id);
    } catch (error) {
      console.log(error);
    }
  }

  const unCompleteTask = async (id) => {
    try {
      await todoService.Uncomplete(id);
      fetchData(currentPage);
    } catch (error) {
      console.log(error);
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
          <button onClick={hideModal} className={formStyles.modalBtns}>Cancel</button>
          <button onClick={deleteTask} className={formStyles.modalBtns}>Yes</button>
        </div>
      }
      <nav>
        <Nav />
      </nav>
      <div className={formStyles.todoList}>
        <h1>Todo List</h1>
        <div className={formStyles.todoForm}>
          <input
            type="text"
            placeholder="New task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask} className={formStyles.addTaskBtn}>Add Task</button>
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
          {todos.map((todo) =>
            <TableListRow
              key={todo.id}
              todo={todo}
              showModal={showModal}
              completeTask={completeTask}
              uncompleteTask={unCompleteTask}
            />
          )}
        </tbody>
      </table>

      <Pagination activePageFromParent={activePageFromParent} fetchData={fetchData} pageState={currentPage} setPageState={setCurrentPage} todos={todos} />
    </>
  );
}