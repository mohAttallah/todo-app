import { useContext, useState } from 'react';
import { SettingContext } from '../../Context/Settings';
import { Pagination } from '@mantine/core';
import Auth from "../Auth/auth";

function List() {
    const settings = useContext(SettingContext);
    let list = settings.list;

    const [currentPage, setCurrentPage] = useState(1);
    // Number of items to display per page
    const itemsPerPage = settings.itemsPerPage;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    //check if the item complete or not
    if (settings.showCompleted === false) {
        list = list.filter(element => element.complete === false);
    }

    // Calculate start and end indices for displaying items
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = list.slice(startIndex, endIndex);

    function toggleComplete(id) {
        // Find the item and update the value 'complete'
        const updatedItems = list.map(item => {
            if (item.id === id) {
                item.complete = !item.complete;
            }
            return item;
        });

        settings.setList(updatedItems);
    }

    function deleteItem(id) {
        // find the item then delete 
        const items = list.filter(item => item.id !== id);
        settings.setList(items);
    }


    return (
        <div>

            {itemsToDisplay.map(item => (
                <div key={item.id}>
                    <Auth capability='read'>
                        <p>{item.text}</p>
                        <p><small>Assigned to: {item.assignee}</small></p>
                        <p><small>Difficulty: {item.difficulty}</small></p>
                    </Auth>
                    <Auth capability='update'>
                        <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
                    </Auth>
                    <Auth capability='delete'>
                        <button onClick={() => deleteItem(item.id)}>Delete</button>
                    </Auth>
                    <hr />
                </div>
            ))}
            <Pagination
                total={Math.ceil(list.length / itemsPerPage)}
                value={currentPage}
                onChange={handlePageChange}
                size="md" />

        </div>
    );
}

export default List;
