import TableListRow from './TableListRow';
import styles from './TodoListTable.module.css';

export default function TodoListTable() {
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
        <TableListRow />
      </tbody>
    </table>
  );
}