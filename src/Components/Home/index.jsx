import Todo from '../Todo';
import List from '../List';
import { When } from 'react-if';
import './home.scss'
import { SettingContext } from '../../Context/Settings';
import { useContext } from 'react';
import { LoginContext } from '../Auth/context';
function Home() {
    const settings = useContext(SettingContext);
    const context = useContext(LoginContext)
    
    return (
        <When condition={context.loggedIn}>
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
        </When>
    );
}

export default Home;