import React from 'react';
import CustomAppBar from './CustomAppBar';

const styles = {
    h1: {
        textAlign: 'center'
    }
}

export default function Home(){
    return(
        <div>
            <CustomAppBar/>
            <div>
            <h1 style={styles.h1}>Welcome to the Home Page</h1>
        </div>
        </div>
    );
}