import { createContext, useState } from 'react';
const SettingContext = createContext();

function SettingsProvider(props) {

    const [defaultValues] = useState({
        difficulty: 4,
    });
    const [list, setList] = useState([]);
    const [incomplete, setIncomplete] = useState([]);

    return (
        <div>
            <SettingContext.Provider value={{ defaultValues, list, incomplete, setList, setIncomplete }}>
                {props.children}
            </SettingContext.Provider>

        </div>
    );
}

export { SettingsProvider, SettingContext };