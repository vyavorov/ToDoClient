import { useEffect, useState } from 'react';
import TableListRow from './TableListRow';
import styles from './TodoListTable.module.css';
import loaderStyle from './Loader.module.css';
import * as todoService from '../services/todoService';

export default function TodoListTable() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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

    fetchData();

  }, []);

  if (loading) {
    return (
      <div className={loaderStyle.loaderContainer}>
        <div className={loaderStyle.loader}></div>
      </div>
    )
  }



  return (
    <table className={styles.taskTable}>
      <thead>
        <tr>
          <th>Task</th>
          <th>Completed?</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo,index) => <TableListRow key={index} todo={todo}/>)}
        {console.log(todos)}
      </tbody>
    </table>
  );
}