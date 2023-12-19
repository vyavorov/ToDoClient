import styles from './TodoListTable.module.css';
import * as todoService from '../services/todoService';
import { useState } from 'react';

export default function TableListRow(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditexText] = useState('');

    const editClickHandler = () => {
        setEditexText(props.todo.title);
        setIsEditing(true);
    }

    const editCancelHandler = () => {
        setIsEditing(false);
    }

    const editSaveHandler = async () => {
        const newEditedTodo = { title: editedText, isCompleted: props.todo.isCompleted };
        try {
            await todoService.Edit(props.todo.id, newEditedTodo);
            props.todo.title = editedText;
            setIsEditing(false);
            // console.log(editedTodo);
        } catch (error) {
            throw new Error(error.message);
        }
    }
    return (
        <>
            <tr>
                <td>
                    {isEditing
                        ? (<input type="text" value={editedText} onChange={(e) => setEditexText(e.target.value)} />)
                        : (props.todo.title)}
                </td>
                <td className={props.todo.isCompleted
                    ? styles.completed
                    : styles.notCompleted}>{props.todo.isCompleted ? 'Yes' : 'No'}</td>
                <td>
                    {
                        !isEditing
                            ? (
                                <>
                                    <button className={styles.editBtn} onClick={editClickHandler}>Edit</button>
                                    <button className={styles.deleteBtn} onClick={() => props.showModal(props.todo.id)}>Remove</button>
                                    <button
                                        className={props.todo.isCompleted
                                            ? styles.notCompletedBtn
                                            : styles.completeBtn}
                                        onClick={props.todo.isCompleted
                                            ? () => props.uncompleteTask(props.todo.id)
                                            : () => props.completeTask(props.todo.id)}>
                                        {props.todo.isCompleted ? 'Not Completed' : 'Complete'}
                                    </button>
                                </>
                            )
                            : (
                                <>
                                    <button className={styles.editBtns} onClick={editCancelHandler}>Cancel</button>
                                    <button className={styles.editBtns} onClick={editSaveHandler}>Save</button>
                                </>

                            )
                    }
                    {/* <button className={styles.deleteBtn} onClick={() => removeHandler(props.todo.id)}>Remove</button> */}
                </td>
            </tr>
        </>
    );
}