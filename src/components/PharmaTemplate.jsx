import PharmacistNav from './PharmacistNav';
import { Outlet } from 'react-router-dom';
function PharmaTemplate() {
    return (
        <>
            <PharmacistNav />
            <Outlet />
        </>
    );
}

export default PharmaTemplate;
