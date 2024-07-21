import React from 'react';
import CustomAppBar from './CustomAppBar';
import { useLocation } from 'react-router-dom';

export default function SearchStudentPage() {
    const location = useLocation();
    const { state } = location;
    const data = state?.data || { message: "No data received"};

    console.log(data);

    const styles = {
        header: {
            marginBottom: '20px',
            textAlign: 'center'
        },
        info: {
            margin: '10px 0',
            fontSize: '16px',
            textAlign: 'center' 
        },
        label: {
            fontWeight: 'bold'
        }
    };    

    return (
        <div>
            <div style={styles.card}>
                <CustomAppBar />
                <div style={styles.header}>
                    <h1>Student Details</h1>
                </div>
                <div style={styles.info}>
                    <p><span style={styles.label}>Id:</span> {data.id}</p>
                    <p><span style={styles.label}>First Name:</span> {data.firstName}</p>
                    <p><span style={styles.label}>Last Name:</span> {data.lastName}</p>
                    <p><span style={styles.label}>Major:</span> {data.major}</p>
                    <p><span style={styles.label}>GPA:</span> {data.gpa}</p>
                    <p><span style={styles.label}>Age:</span> {data.age}</p>
                </div>
            </div>
        </div>
    );
};