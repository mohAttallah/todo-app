import { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form';
import { v4 as uuid } from 'uuid';
import { SettingContext } from '../../Context/Settings';

const Todo = () => {
    const settings = useContext(SettingContext);


    // difficulty State
    const [defaultValues] = useState({
        difficulty: 4,
    });

    const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

    function addItem(item) {
        item.id = uuid();
        console.log(item);

        item.complete = false;
        // destruct prevoius array then set a new one 
        settings.setList([...settings.list, item]);
    }

    function deleteItem(id) {
        // find the item then delete 
        const items = list.filter(item => item.id !== id);
        settings.setList(items);
    }



    useEffect(() => {
        let incompleteCount = settings.list.filter(item => !item.complete).length;
        settings.setIncomplete(incompleteCount);
        document.title = `To Do List: ${settings.incomplete}`;
        // linter will want 'incomplete' added to dependency array unnecessarily. 
        // disable code used to avoid linter warning 
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [settings.list]);

    return (
        <>
            <header data-testid="todo-header">
                <h1 data-testid="todo-h1">To Do List: {settings.incomplete} items pending</h1>
            </header>

            <form onSubmit={handleSubmit}>

                <h2>Add To Do Item</h2>

                <label>
                    <span>To Do Item</span>
                    <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
                </label>

                <label>
                    <span>Assigned To</span>
                    <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
                </label>

                <label>
                    <span>Difficulty</span>
                    <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
                </label>

                <label>
                    <button type="submit">Add Item</button>
                </label>
            </form>

        </>
    );
};

export default Todo;


