import { Outlet } from 'react-router-dom';
import NavbarDefault from './NavbarDefault';

const Empty = () => {
    return (
        <>
            <NavbarDefault />
            <Outlet />
        </>
    );
};

export default Empty;
