import {useState} from 'react';

const Todos = () => {
    const [tasks, setTasks] = useState < string[] > ([]);
    const [newTask, setNewTask] = useState < string > ('');
    const [editingTaskIndex, setEditingTaskIndex] = useState < number | null > (null);

    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, newTask])
            setNewTask('')
        }
    }

    const editTask = (index: number, newText: string) => {
        const updatedTasks = [...tasks]
        updatedTasks[index] = newText
        setTasks(updatedTasks)
        setEditingTaskIndex(null)
    }

    const deleteTask = (index: number) => {
        const updatedTasks = [...tasks]
        updatedTasks.splice(index, 1)
        setTasks(updatedTasks)
        if (editingTaskIndex === index) {
            setEditingTaskIndex(null)
        }
    }

    const startEditingTask = (index: number) => {
        setEditingTaskIndex(index)
        setNewTask(tasks[index])
    }

    return (
        <div>
            <h1>Список задач</h1>
            <div>
                <input
                    type="text"
                    placeholder="Новая задача"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button
                    onClick={addTask}>Добавить
                </button>
            </div>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {editingTaskIndex === index ? (
                            <div>
                                <input
                                    type="text"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                />
                                <button
                                    onClick={() => editTask(index, newTask)}>Сохранить
                                </button>
                            </div>
                        ) : (
                            <div>
                                {task}
                                <button
                                    onClick={() => startEditingTask(index)}>Редактировать
                                </button>
                                <button
                                    onClick={() => deleteTask(index)}>Удалить
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todos;