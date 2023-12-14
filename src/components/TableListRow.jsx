import styles from './TodoListTable.module.css';
export default function TableListRow(props) {
    return (
        <tr>
            <td>{props.todo.title}</td>
            <td>{props.todo.isCompleted ? 'Yes' : 'No'}</td>
            <td>
                <button className={styles.editBtn}>Edit</button>
                <button className={styles.deleteBtn}>Remove</button>
            </td>
        </tr>
    );
}