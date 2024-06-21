import Button from '../../../components/Button';
import medBox from '../../../assets/images/MedBox.png';
import greenRectangle from '../../../assets/images/GreenRectangle.png';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../../components/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [name, setName] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate();

    const search = async (name) => {
        try {
            const token = localStorage.getItem('token');
            const rawData = await axios({
                method: 'get',
                url: `http://localhost:3003/medicines/search-medicine?name=${name}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            setFilteredData(rawData.data.data);
        } catch (e) {
            console.log(e);
            setFilteredData([]);
        }
    };

    useEffect(() => {
        name === '' || name === ' ' || name === undefined
            ? setFilteredData([])
            : search(name);
    }, [name]);

    const handleSearchBar = async (e) => {
        e.persist();
        e.target.value === ' ' ? '' : setName(e.target.value);
    };

    const handleSingleSearchReq = (item) => {
        navigate(`/item?itemId=${item._id}`);
    };

    return (
        <>
            <div className="bg-[#EBF6F9]">
                <div className="flex justify-around  h-[90vh] ms-auto sm:max-w-[80%] lg:max-w-[100%] max-w-[100%] mx-auto  ">
                    <div className="flex flex-col justify-between md:mt-15 mt-10 lg:w-[60%] w-[100%] ps-0 sm:ps-10">
                        <div className="px-4 flex flex-col justify-center gap-5 mt-[5%] xl:ps-20 ">
                            <div className=" md:text-[4.5rem] text-[3rem] font-bold font-default-font-family tracking-normal leading-none ps-10 sm:ps-0 ">
                                Order{' '}
                                <span className=" inline-block text-xs bg-red px-5 text-white mb-auto">
                                    ONLINE
                                </span>
                                <br /> Medicines
                            </div>

                            <div className="flex justify-start gap-8 my-5 ">
                                <Link to={'/meds'}>
                                    <Button>Order Manually</Button>
                                </Link>
                                <Link to={'/prescription'}>
                                    <Button>Order By Prescription</Button>
                                </Link>
                            </div>
                            <div className="flex bg-white rounded-md items-center px-3 max-w-[550px]">
                                <FaMagnifyingGlass className="text-[1.3rem] " />
                                <input
                                    className="font-default-font-family p-4 focus:outline-none w-[100%]"
                                    type="text"
                                    autoComplete="true"
                                    placeholder="Search for medicines"
                                    onChange={handleSearchBar}
                                    value={name}
                                />
                            </div>
                            {filteredData.length ? (
                                <div className="flex flex-col p-2 rounded-md mb-3 overflow-y-scroll max-h-[9rem] bg-white no-scrollbar max-w-[550px]">
                                    {filteredData.map((item) => (
                                        <div
                                            key={item._id}
                                            onClick={() =>
                                                handleSingleSearchReq(item)
                                            }
                                            className="font-default-font-family flex bg-white rounded-md justify-start text-[0.9rem] p-2 text-black  mt-1 hover:bg-[#f5f5f5] hover:cursor-pointer "
                                        >
                                            {item.name}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                        <Footer />
                    </div>
                    <div className="justify-center items-center relative lg:flex hidden">
                        <img src={medBox} className="h-[90%] z-10 " />
                        <img
                            src={greenRectangle}
                            className=" xl:h-80 h-60 absolute bottom-[0%] right-0 z-0"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
