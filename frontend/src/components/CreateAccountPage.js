import React, { useState } from 'react';
import CustomAppBar from './CustomAppBar';
import { useNavigate } from 'react-router-dom';

export default function CreateAccountPage() {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [major, setMajor] = useState('');
    const [gpa, setGpa] = useState('');
    const [age, setAge] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

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
                    "age": age
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

    return (
        <div>
            <CustomAppBar/>
            <form>
                <label>Enter your First Name: <input onChange ={changeFirstName} type='text'/></label><br/>
                <label>Enter your Last Name: <input onChange ={changeLastName} type='text'/></label><br/>
                <label>Enter your Major: <input onChange ={changeMajor} type='text'/></label><br/>
                <label>Enter your GPA: <input onChange ={changeGpa} type='number'/></label><br/>
                <label>Enter your Age: <input onChange ={changeAge} type='number'/></label><br/>
                <button onClick={createAccount}>Create Account</button>
            </form>
        </div>
    );
}