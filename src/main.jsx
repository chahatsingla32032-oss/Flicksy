import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Watchlist from './pages/Watchlist';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import './styles.css';
function ProtectedRoute({children}){const {user}=useApp();const location=useLocation();return user?children:<Navigate to="/login" replace state={{from:location.pathname}}/>}
function App(){return <Provider store={store}><AppProvider><BrowserRouter><div className="app"><a href="#main-content" className="skip-link">Skip to content</a><Navbar/><div id="main-content"><Routes><Route path="/" element={<Home/>}/><Route path="/movies" element={<Movies/>}/><Route path="/movies/:id" element={<MovieDetails/>}/><Route path="/watchlist" element={<Watchlist/>}/><Route path="/login" element={<Login/>}/><Route path="/account" element={<ProtectedRoute><Watchlist/></ProtectedRoute>}/><Route path="*" element={<NotFound/>}/></Routes></div><Footer/><Toast/><Chatbot/></div></BrowserRouter></AppProvider></Provider>}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
