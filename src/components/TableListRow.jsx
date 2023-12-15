import styles from './TodoListTable.module.css';
import * as todoService from '../services/todoService';

export default function TableListRow(props) {
    return (
        <>
            <tr>
                <td>{props.todo.title}</td>
                <td>{props.todo.isCompleted ? 'Yes' : 'No'}</td>
                <td>
                    <button className={styles.editBtn}>Edit</button>
                    <button className={styles.deleteBtn} onClick={() => props.showModal(props.todo.id)}>Remove</button>
                    {/* <button className={styles.deleteBtn} onClick={() => removeHandler(props.todo.id)}>Remove</button> */}
                </td>
            </tr>
        </>
    );
}