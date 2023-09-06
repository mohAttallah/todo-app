import React from 'react';
import Header from './Components/Header';
import Todo from './Components/Todo';
import Footer from './Components/Footer';
import { SettingsProvider } from './Context/Settings';
import List from './Components/List';
export default class App extends React.Component {
    render() {
        return (
            <>
                <SettingsProvider >
                    <Header />
                    <hr />
                    <Todo />
                    <hr />
                    <List/>
                    <Footer />
                </SettingsProvider >
            </>

        );
    }
}