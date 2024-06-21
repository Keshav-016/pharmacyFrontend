import { Outlet } from 'react-router-dom';
import PharmacistSubNav from './PharmacistSubNav';
import Footer from '../components/Footer';
function PharmaSecondaryTemplate() {
    return (
        <div className="min-h-[90vh] bg-[#EBF6F9] pt-5">
            <PharmacistSubNav />
            <div className="mb-5">
                <Outlet />
            </div>
            <div className="flex justify-center my-3">
                <Footer />
            </div>
        </div>
    );
}

export default PharmaSecondaryTemplate;
