import { useContext, useState } from 'react';
import { SettingContext } from '../../Context/Settings';
import { Pagination } from '@mantine/core';
import Auth from "../Auth/auth";

import axios from 'axios';
function List() {
    const settings = useContext(SettingContext);
    let list = settings.data;

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = settings.itemsPerPage;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (!settings.showCompleted) {
        list = list.filter(item => !item.read);
    }

    // Pagination calculations
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = list.slice(startIndex, endIndex);

    async function toggleComplete(id, currentValue) {
        try {
            await axios.put(`https://api-auth-ehg1.onrender.com/api/v1/todo/${id}`, {
                read: !currentValue
            });

            const updatedItems = list.map(item => {
                if (item.id === id) {
                    return { ...item, read: !item.read };
                }
                return item;
            });

            settings.setList(updatedItems);
        } catch (error) {
            console.error("Error updating item: ", error);
        }
    }

    async function deleteItem(id) {
        try {
            await axios.delete(`https://api-auth-ehg1.onrender.com/api/v1/todo/${id}`);
            const updatedItems = list.filter(item => item.id !== id);
            settings.setData(updatedItems);

        } catch (error) {
            console.error("Error deleting item: ", error);

        }
    }

    return (
        <div>
            <Auth capability='read'>
                {itemsToDisplay.map(item => (
                    <div key={item.id}>
                        <p>{item.item}</p>
                        <p><small>Assigned to: {item.assigned}</small></p>
                        <p><small>Difficulty: {item.difficulty}</small></p>
                        <Auth capability='read'>
                            
                            <div> {item.read ? 'Complete' : 'Pending'}</div>
                            <Auth capability='update'>
                                <div onClick={() => toggleComplete(item.id, item.read)}> Update tha status: {item.read.toString()}</div>
                            </Auth>
                        </Auth>


                        <hr />

                        <Auth capability='delete'>
                            <button onClick={() => deleteItem(item.id)}>Delete</button>
                        </Auth>

                        <hr />

                    </div>
                ))}
            </Auth>

            <Pagination
                total={Math.ceil(list.length / itemsPerPage)}
                value={currentPage}
                onChange={handlePageChange}
                size="md"
            />
        </div>
    );
}

export default List;
