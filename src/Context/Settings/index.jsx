import { createContext, useEffect, useState } from 'react';
const SettingContext = createContext();
function SettingsProvider(props) {


    const [list, setList] = useState([]);
    const [data, setData] = useState([]);


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



    return (
        <div>
            <SettingContext.Provider value={{ list, incomplete, setList, setIncomplete, setItemsPerPage, setShowCompleted, setSortKeyword, itemsPerPage, showCompleted, sortKeyword, data, setData }}>
                {props.children}
            </SettingContext.Provider>

        </div>
    );
}

export { SettingsProvider, SettingContext };