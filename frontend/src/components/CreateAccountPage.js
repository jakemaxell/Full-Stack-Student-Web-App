import React, { useState } from 'react';
import CustomAppBar from './CustomAppBar';
import { useNavigate } from 'react-router-dom';
import { margin } from '@mui/system';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { CenterFocusStrong } from '@mui/icons-material';

export default function CreateAccountPage() {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [major, setMajor] = useState('');
    const [gpa, setGpa] = useState('');
    const [age, setAge] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const changeFirstName = (event) => {
        setFirstName(event.target.value);
    };

    const changeLastName = (event) => {
        setLastName(event.target.value);
    };

    const changeMajor = (event) => {
        setMajor(event.target.value);
    };

    const changeGpa = (event) => {
        setGpa(event.target.value);
    };

    const changeAge = (event) => {
        setAge(event.target.value);
    };

    const changeEmail = (event) => {
        setEmail(event.target.value);
    };

    const changePassword = (event) => {
        setPassword(event.target.value);
    };

    const createAccount = async (event) => {
        event.preventDefault();

        try {
            const response =  await fetch("http://localhost:8080/api/saveStudent", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "firstName": firstName,
                    "lastName": lastName,
                    "major": major,
                    "gpa": gpa,
                    "age": age,
                    "email": email.toLowerCase(),
                    "password": password
                })
            });
    
            const text = await response.text()
            const data = text ? JSON.parse(text) : {};
    
            if(response.ok){
                setResponse(data);
                navigate('/', {state: {response: data}});
            } else {
                throw new Error(data.message || 'An error occurred');
            }
        } catch (error) {
            setError(error.message);
            console.error("Error: ", error);
        }
    };

    const styles = {
        form: {
            maxWidth: '500px',
            margin: '0 auto',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            marginTop: '25px',
        },
        div: {
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            fontWeight: 'bold',
        },
        input: {
            width: '100%',
            padding: '8px',
            boxSizing: 'border-box',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            margin: '0 auto',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
        error: {
            color: 'red',
        },
        success: {
            color: 'green',
        },
    };

    return (
        <div>
            <CustomAppBar/>
            <form style={styles.form}>
                <div style={styles.div}>
                    <label style={styles.label} htmlFor="firstName">First Name:</label>
                    <input style={styles.input} id="firstName" value={firstName} onChange={changeFirstName} type="text" />
                </div>
                <div style={styles.div}>
                    <label style={styles.label} htmlFor="lastName">Last Name:</label>
                    <input style={styles.input} id="lastName" value={lastName} onChange={changeLastName} type="text" />
                </div>
                <div style={styles.div}>
                    <label style={styles.label} htmlFor="major">Major:</label>
                    <input style={styles.input} id="major" value={major} onChange={changeMajor} type="text" />
                </div>
                <div style={styles.div}>
                    <label style={styles.label} htmlFor="gpa">GPA:</label>
                    <input style={styles.input} id="gpa" value={gpa} onChange={changeGpa} type="number" />
                </div>
                <div style={styles.div}>
                    <label style={styles.label} htmlFor="age">Age:</label>
                    <input style={styles.input} id="age" value={age} onChange={changeAge} type="number" />
                </div>
                <div style={styles.div}>
                    <label style={styles.label} htmlFor="email">Email:</label>
                    <input style={styles.input} id="email" value={email} onChange={changeEmail} type="text" />
                </div>
                <div style={styles.div}>
                    <label style={styles.label} htmlFor="password">Password:</label>
                    <input style={styles.input} id="password" value={password} onChange={changePassword} type="text" />
                </div>
                <button style={styles.button} type="submit" onClick={createAccount}>Create Account</button>
            </form>
        </div>
    );
}