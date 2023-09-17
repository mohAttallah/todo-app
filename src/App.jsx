import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SettingsForm from './Components/SettingsForm';
import Home from './Components/Home';
import { SettingsProvider } from './Context/Settings';
import Layout from './Components/layout';
import { LoginProvider } from './Context/Auth/context'
import Signup from './Components/signup';
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
                                <Route path='/Signup' element={<Signup />} />
                            </Routes>
                        </Layout>
                    </Router>
                </SettingsProvider >
            </LoginProvider>

        );
    }
}