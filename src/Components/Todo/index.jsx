import { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form';
import { v4 as uuid } from 'uuid';
import { SettingContext } from '../../Context/Settings';
import Auth from '../Auth/auth';
import axios from 'axios';
import "./todo.scss"
const Todo = () => {
    const settings = useContext(SettingContext);


    // difficulty State
    const [defaultValues] = useState({
        difficulty: 4,
    });

    const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

    async function addItem(item) {
        item.id = uuid();
        item.complete = false;
        settings.setList([...settings.list, item]);
    }

    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get("https://api-auth-ehg1.onrender.com/api/v1/todo");
                settings.setData(response.data); 
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, [settings.data]);
    



    useEffect(() => {
        let incompleteCount = settings.list.filter(item => !item.complete).length;
        settings.setIncomplete(incompleteCount);
        document.title = `To Do List: ${settings.incomplete}`;

    }, [settings.list]);
    
return (
    <form onSubmit={handleSubmit} className='todo-section'>
        <Auth capability='create'>
            <h4>Add To Do Item</h4>
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
        </Auth>
    </form>


);
};

export default Todo;


