import { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: '',
    });


    function handleSubmit(e) {
        e.preventDefault();
        axios.post('https://api-auth-ehg1.onrender.com/signup', formData)
            .then(response => {
                console.log('Success:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Input your username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Input your password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="role"
                    placeholder="[admin, writer, editor, delete]"
                    value={formData.role}
                    onChange={handleInputChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Signup;