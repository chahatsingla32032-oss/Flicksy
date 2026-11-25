import { Link } from 'react-router-dom';
import { Clapperboard } from 'lucide-react';
export default function NotFound(){return <main className="wrap not-found"><span className="empty-icon"><Clapperboard size={30}/></span><p className="section-kicker">SCENE NOT FOUND</p><h1>Well, this is a plot twist.</h1><p>The page you're looking for doesn't exist or has moved.</p><Link className="button button-primary" to="/">Back to home</Link></main>}
