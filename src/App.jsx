import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SettingsForm from './Components/SettingsForm';
import Home from './Components/Home';
import { SettingsProvider } from './Context/Settings';

export default class App extends React.Component {
    render() {
        return (
            <SettingsProvider >
                <Router>
                    <Routes>
                        <Route path='/' element={< Home />} />
                        <Route path='/Settings' element={<SettingsForm />} />
                    </Routes>
                </Router>
            </SettingsProvider >
        );
    }
}