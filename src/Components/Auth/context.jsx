import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';
import { createContext, useState, useEffect } from 'react';

const testUsers = {
    admin: {
        password: 'admin',
        name: 'admin',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
    },
    editor: {
        password: 'editor',
        name: 'editor',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s'
    },
    writer: {
        password: 'writer',
        name: 'writer',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68'
    },
    user: {
        password: 'user',
        name: 'user',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
    },
};

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
        const auth = testUsers[username];
        // if tokrn valid on Cokkies or not 
        if (auth && auth.password === password) {
            try {
                const token = auth.token;
                validateToken(token);

            } catch (e) {
                setLoginState(false, null, {}, e);
                console.error(e);
            }
        }
    };

    const logout = () => {
        setLoginState(false, null, {});
    };

    const validateToken = (token) => {
        try {
            const validUser = jwt_decode(token);
            console.log("sssssssss ",validUser)
            setLoginState(true, token, validUser);
        } catch (e) {
            setLoginState(false, null, {}, e);
            console.log('Token Validation Error', e);
        }
    };

    const setLoginState = (loggedIn, token, user, error) => {
        cookie.save('auth', token);
        setLoggedIn(loggedIn);
        setUser(user);
        setError(error || null);
    };

    useEffect(() => {

        const qs = new URLSearchParams(window.location.search);
        const cookieToken = cookie.load('auth');
        const token = qs.get('token') || cookieToken || null;
        validateToken(token);
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
