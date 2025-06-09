import { useState, type FormEvent } from "react";
import { addTodo } from "../../api/api";
import styles from'./addTask.module.scss'
interface AddTaskProps {
    reloadList: () => void
}

type InputTytleError = ''| 'Error'
export default function AddTask( {reloadList}: AddTaskProps ) {

  const [addTitle, setAddTitle] = useState<string>('');
  const [inputTitleError, setInputTitleError] = useState<InputTytleError>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            if (addTitle.length >= 2 && addTitle.length <= 64) {
                await addTodo({
                    title: addTitle,
                    isDone: false,
                });
                reloadList();
                setInputTitleError('');
                setAddTitle('');
            } else {
                setInputTitleError('Error');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.inputTask}>
            <div>
                <input
                    className={inputTitleError === 'Error' ? styles.inputError : ''}
                    value={addTitle}
                    onChange={(e) => setAddTitle(e.target.value)}
                    placeholder='Task to be done...'
                />
                {inputTitleError === 'Error' && (
                    <p className={styles.errorText}>Введите значение от 2 до 64 символов</p>
                )}
            </div>
            <button type="submit">Add</button>
        </form>
    );
}