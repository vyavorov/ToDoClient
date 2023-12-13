import styles from './TodoListTable.module.css';
export default function TableListRow() {
    return (
        <tr>
            <td>Check car tires</td>
            <td>No</td>
            <td>
                <button className={styles.editBtn}>Edit</button>
                <button className={styles.deleteBtn}>Remove</button>
            </td>
        </tr>
    );
}