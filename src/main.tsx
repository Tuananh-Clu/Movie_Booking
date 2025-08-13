import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {  FilterProvider } from './config/FilterTheater.tsx'
import { SeatsProvider } from './config/filterSeat.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { NewProvider } from './config/new.tsx'
import { BookingProvider } from './config/BookingContext.tsx'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BookingProvider>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/"}>
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
    
    </ClerkProvider>
    </BookingProvider>
  </StrictMode>,
)
