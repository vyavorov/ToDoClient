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
        <tr>
          <td>Check car tires</td>
          <td>No</td>
          <td>
            <button class={styles.editBtn}>Edit</button>
            <button class={styles.deleteBtn}>Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}