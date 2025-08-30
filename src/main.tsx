import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {  FilterProvider } from './config/FilterTheater.tsx'
import { SeatsProvider } from './config/filterSeat.tsx'
import { NewProvider } from './config/new.tsx'
import { BookingProvider } from './config/BookingContext.tsx'
import { AuthProvider } from './config/AuthContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>  
    <AuthProvider>
    <BookingProvider>
    <NewProvider>
    <SeatsProvider>
    <FilterProvider>
    <BrowserRouter>
    <Routes>
      <Route/>
    </Routes>
    <App />
    </BrowserRouter>
    </FilterProvider>
    </SeatsProvider>
    </NewProvider>
    </BookingProvider>
    </AuthProvider>
  </StrictMode>
)
