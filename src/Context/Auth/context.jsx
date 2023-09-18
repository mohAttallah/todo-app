import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';
import { createContext, useState, useEffect } from 'react';
import axios from "axios";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({ capabilities: [] });
    const [error, setError] = useState(null);

    const can = (capability) => {
        return user?.capabilities?.includes(capability);
    };



    //Login methode 
    const login = async (username, password) => {

        try {
            const loginRequest = await axios.post(
                "https://api-auth-ehg1.onrender.com/signin",
                {},
                {
                    headers: {
                        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                    },
                }
            );
            const capabilities = loginRequest.data.user.capabilities;
            const token = loginRequest.data.token;
            await validateToken(token, capabilities)
        } catch (e) {
            setLoginState(false, null, {}, e);
            console.error(e);
        }
    };

    const logout = () => {
        setLoginState(false, null, {});
    };

    const validateToken = (token, capabilities) => {
        try {
            let validUser = jwt_decode(token);
            validUser.capabilities = capabilities;
            console.log("wwwwwww", validUser)

            setLoginState(true, token, validUser);
        } catch (e) {
            setLoginState(false, null, {}, e);
            console.log('Token Validation Error', e);
        }
    };

    const setLoginState = (loggedIn, token, user, error) => {
        console.log("ssssssssssssafwe", user.capabilities)
        cookie.save('auth', token);
        cookie.save('capabilities', user.capabilities);
        setLoggedIn(loggedIn);
        setUser(user);
        setError(error || null);
    };

    useEffect(() => {

        const qs = new URLSearchParams(window.location.search);
        const cookieToken = cookie.load('auth');
        const cookieCapabilities = cookie.load('capabilities');
        const token = qs.get('token') || cookieToken || null;
        const capabilities = qs.get('capabilities') || cookieCapabilities || null;
        validateToken(token, capabilities);
    }, []);

    const contextValue = {
        loggedIn,
        can,
        login,
        logout,
        user,
        error,
    };

    return (
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
    );
};

export { LoginProvider, LoginContext };
