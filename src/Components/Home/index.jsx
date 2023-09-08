import Todo from '../Todo';
import List from '../List';
import './home.scss'
import { SettingContext } from '../../Context/Settings';
import { useContext } from 'react';

function Home() {
    const settings = useContext(SettingContext);

    return (
        <section >
            <header data-testid="todo-header" className='todo-header'>
                <h1 data-testid="todo-h1">To Do List: {settings.incomplete} items pending</h1>
            </header>
            <div className='Home-section'>

                <div className='left-section'>
                    <Todo />
                </div>

                <div className='right-section'>
                    <List />
                </div>
            </div>
        </section>
    );
}

export default Home;