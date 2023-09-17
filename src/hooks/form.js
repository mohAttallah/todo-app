import { useState, useEffect } from 'react';
import axios from 'axios';
const useForm = (callback, defaultValues = {}) => {

    const [values, setValues] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            callback({ ...values });
            const body = {
                item: event.target.text.value,
                assigned: event.target.assignee.value,
                difficulty: event.target.difficulty.value,
            };
            const response = await axios.post(`https://api-auth-ehg1.onrender.com/api/v1/todo`, body);
            console.log(response);
        } catch (error) {
            console.error('Error while Add item:', error);
        }
    };

    const handleChange = (event) => {
        let name, value;
        if (typeof (event) === 'object') {
            name = event.target.name;
            value = event.target.value;
        } else {
            name = 'difficulty';
            value = event;
        }

        if (parseInt(value)) {
            value = parseInt(value);
        }

        setValues(values => ({ ...values, [name]: value }));
    };

    useEffect(() => {
        setValues(defaultValues);
    }, [defaultValues]);

    return {
        handleChange,
        handleSubmit,
        values,
    };
};

export default useForm;