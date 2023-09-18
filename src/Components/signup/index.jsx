import { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: '',
    });
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        axios.post('https://api-auth-ehg1.onrender.com/signup', formData)
            .then(response => {
                console.log('Success:', response.data);
                const user = response.data.user;
                const token = response.data.token;

                setResponseMessage(
                    `Signup successful. User data: 
                Username: ${user.username}
                Role: ${user.role}
                Token: ${token}`
                );
                setLoading(false)

            })
            .catch(error => {
                setLoading(false)
                console.error('Error:', error);
                setResponseMessage(`Signup failed: ${error.message}`);

            });
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        console.log(name, value)
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
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                >
                    <option value="admin">admin</option>
                    <option value="editor">editor</option>
                    <option value="writer">writer</option>
                    <option value="user">user</option>
                </select>
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </form>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <p>{responseMessage}</p>
            )}
        </div>
    );

}

export default Signup;