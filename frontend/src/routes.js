import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login/Index';
import Dashboard from './pages/Dashboard/Index';
import New from './pages/New/Index';

export default function Rotas() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/new" element={<New/>}/>
          </Routes>
        </BrowserRouter>
    )
}