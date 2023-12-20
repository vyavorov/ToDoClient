import { useEffect, useState } from "react";
import * as todoService from '../services/todoService';
export default function Pagination({fetchData, pageState, setPageState}) {
  const pageSize = 5;
  const [pagesToShow, setPagesToShow] = useState(1);
  useEffect(() => {
    getTodosCount();
  }, [])

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
  };
  return (
    <>
      {Array.from({ length: pagesToShow }, (_, index) => (
        <button key={index + 1} onClick={() => pageHandler(index+1)}>{index + 1}</button>
      ))}
    </>
  );
}