import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function DefaultLayout() {
    return (
        <div>
            <Navbar />
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
}
