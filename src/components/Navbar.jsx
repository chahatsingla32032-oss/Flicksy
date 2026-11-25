import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Clapperboard, Heart, Search, UserRound, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useWatchlist } from '../hooks/useWatchlist';
export default function Navbar() {
 const {user,setUser,notify}=useApp(); const {watchlist}=useWatchlist(); const [open,setOpen]=useState(false); const navigate=useNavigate();
 const logout=()=>{setUser(null);notify('You have signed out');navigate('/');setOpen(false)};
 const links=<><NavLink to="/movies" onClick={()=>setOpen(false)}>Explore</NavLink><NavLink to="/watchlist" onClick={()=>setOpen(false)} className="watch-nav"><Heart size={16}/> Watchlist <span className="nav-count">{watchlist.length}</span></NavLink></>;
 return <header className="site-header"><nav className="navbar wrap" aria-label="Main navigation"><Link to="/" className="brand" aria-label="Flicksy home"><span className="brand-icon"><Clapperboard size={22}/></span>flicksy<span className="brand-dot">.</span></Link><div className="nav-links desktop-links">{links}</div><div className="nav-actions"><button className="icon-button search-shortcut" aria-label="Search movies" onClick={()=>navigate('/movies?focus=search')}><Search size={19}/></button>{user?<><span className="user-greeting">Hi, {user.name.split(' ')[0]}</span><button className="icon-button" onClick={logout} aria-label="Sign out"><LogOut size={18}/></button></>:<Link className="login-link" to="/login"><UserRound size={17}/> Sign in</Link>}<button className="icon-button mobile-menu" onClick={()=>setOpen(!open)} aria-label={open?'Close menu':'Open menu'}>{open?<X/>:<Menu/>}</button></div></nav>{open&&<div className="mobile-links">{links}{user?<button onClick={logout}>Sign out</button>:<Link to="/login" onClick={()=>setOpen(false)}>Sign in</Link>}</div>}</header>
}
