import { createContext, useEffect, useState } from 'react';
const SettingContext = createContext();

function SettingsProvider(props) {

    const [defaultValues] = useState({
        difficulty: 4,
    });
    const [list, setList] = useState([]);
    const [incomplete, setIncomplete] = useState([]);



    const [itemsPerPage, setItemsPerPage] = useState(() => {
        const savedItemsPerPage = JSON.parse(localStorage.getItem("itemsPerPage"));
        return savedItemsPerPage !== null ? savedItemsPerPage : 3;
    });

    const [showCompleted, setShowCompleted] = useState(() => {
        const savedShowCompleted = JSON.parse(localStorage.getItem("showCompleted"));
        return savedShowCompleted !== null ? savedShowCompleted : false;
    });

    const [sortKeyword, setSortKeyword] = useState(() => {
        const savedSortKeyword = JSON.parse(localStorage.getItem("sortKeyword"));
        return savedSortKeyword !== null ? savedSortKeyword : "";
    });

    useEffect(() => {
        localStorage.setItem("itemsPerPage", JSON.stringify(itemsPerPage));
        localStorage.setItem("showCompleted", JSON.stringify(showCompleted));
        localStorage.setItem("sortKeyword", JSON.stringify(sortKeyword));
    }, [itemsPerPage, showCompleted, sortKeyword])

    console.log(itemsPerPage)
    return (
        <div>
            <SettingContext.Provider value={{ defaultValues, list, incomplete, setList, setIncomplete, setItemsPerPage, setShowCompleted, setSortKeyword, itemsPerPage, showCompleted, sortKeyword }}>
                {props.children}
            </SettingContext.Provider>

        </div>
    );
}

export { SettingsProvider, SettingContext };