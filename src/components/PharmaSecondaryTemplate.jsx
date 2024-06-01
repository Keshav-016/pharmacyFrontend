import { Outlet } from 'react-router-dom';
import PharmacistSubNav from './PharmacistSubNav';
import Footer from '../components/Footer';
function PharmaSecondaryTemplate() {
    return (
        <div className="min-h-[90vh] bg-[#EBF6F9] pt-5">
            <PharmacistSubNav />
            <div className="mb-5 min-h-[73vh]">
                <Outlet />
            </div>
            <div className="flex justify-center">
                <Footer />
            </div>
        </div>
    );
}

export default PharmaSecondaryTemplate;
