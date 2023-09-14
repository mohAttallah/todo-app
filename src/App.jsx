import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SettingsForm from './Components/SettingsForm';
import Home from './Components/Home';
import { SettingsProvider } from './Context/Settings';
import Layout from './Components/layout';
import { LoginProvider } from './Components/Auth/context'

export default class App extends React.Component {
    render() {
        return (
            <LoginProvider>
                <SettingsProvider >
                    <Router>
                        <Layout>
                            <Routes>
                                <Route path='/' element={< Home />} />
                                <Route path='/Settings' element={<SettingsForm />} />
                            </Routes>
                        </Layout>
                    </Router>
                </SettingsProvider >
            </LoginProvider>

        );
    }
}