import { useEffect, useState } from "react";
import * as todoService from '../services/todoService';
import styles from './Pagination.module.css';

export default function Pagination({fetchData, pageState, setPageState, todos}) {
  const pageSize = 5;
  const [pagesToShow, setPagesToShow] = useState(1);
  const [activePage, setActivePage] = useState(1);
  useEffect(() => {
    getTodosCount();
  }, [todos])

  const getTodosCount = async () => {
    try {
      const count = await todoService.GetTodosCount();
      setPagesToShow(Math.ceil(count / pageSize));
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const pageHandler = async (currentPage) => {
    fetchData(currentPage);
    setPageState(currentPage);
    setActivePage(currentPage);
  };
  return (
    <div className={styles.buttonWrapper}>
      {Array.from({ length: pagesToShow }, (_, index) => (
        <button className={activePage === index + 1 ? `${styles.eachPage} ${styles.activePage}` : styles.eachPage} key={index + 1} onClick={() => pageHandler(index+1)}>{index + 1}</button>
      ))}
    </div>
  );
}