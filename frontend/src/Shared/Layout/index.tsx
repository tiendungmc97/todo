import React from 'react';
import Header from './Header';
import { Outlet } from "react-router-dom";

const Test: React.FC<any> = () => {

    return <>
        <Header />

        <Outlet />
    </>
}

export default Test;