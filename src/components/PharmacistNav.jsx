import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { MdKeyboardArrowDown } from "react-icons/md";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { RiArrowDropDownLine } from 'react-icons/ri';
import axios from 'axios';
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchPharmacistDetails,
    logOut
} from '../features/pharmacistDetailsSlice';
import { Link, useNavigate } from 'react-router-dom';
import { fetchFinalOrders } from '../features/orderSlice';
import { fetchQuotations } from '../features/quotationsSlice';
import handleConfirmAlert from '../utils/ConfirmTemplate';
import { io } from 'socket.io-client';

const settings = ['Profile', 'Logout'];
const token = localStorage.getItem('token') || sessionStorage.getItem('token');
const pharmaSocket = io('http://localhost:3003/', { query: `token=${token}` });
function PharmacistNav() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newOrder, setNewOrder] = useState(null);
    const [newQuotation, setNewQuotation] = useState(null);

    const pharmacist = useSelector((state) => state.pharmacist.data);
    pharmaSocket.on('quotationAccepted', (data) => {
        setNewOrder(data);
    });
    pharmaSocket.on('orderPlaced', (data) => {
        setNewQuotation(data);
    });
    useEffect(() => {
        dispatch(fetchPharmacistDetails());
        dispatch(fetchFinalOrders());
        dispatch(fetchQuotations());
        if (
            !localStorage.getItem('token') &&
            !sessionStorage.getItem('token')
        ) {
            navigate('/pharma-login');
        }
    }, []);
    useEffect(() => {
        dispatch(fetchFinalOrders());
    }, [newOrder]);
    useEffect(() => {
        dispatch(fetchQuotations());
    }, [newQuotation]);

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [location, setLocation] = useState();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (item) => {
        setAnchorElUser(null);
        if (item === 'Logout') {
            handleConfirmAlert(
                'question',
                'Are you Sure You want to Logout!',
                '',
                'Logout',
                () =>
                    dispatch(
                        logOut({ redirect: () => navigate('/pharma-login') })
                    )
            );
        } else navigate('/pharmacist/profile');
    };

    const getAddress = async () => {
        try {
            const token =
                localStorage.getItem('token') ||
                sessionStorage.getItem('token');
            const rawData = await axios({
                method: 'get',
                url: `http://localhost:3003/pharma-data/get`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            setLocation(rawData.data.data);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        getAddress();
    }, []);

    return (
        <AppBar position="static" sx={{ backgroundColor: 'white' }}>
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{ justifyContent: 'space-between', height: '10vh' }}
                >
                    <div className="flex sm:gap-16">
                        <Link to="/pharmacist/orders/all">
                            <Logo />
                        </Link>
                        {location ? (
                            <div className="flex-col hidden sm:flex">
                                <span className="text-[0.9rem]  text-text-grey">
                                    Pharmacy Location
                                </span>
                                <div className=" flex font-default-font-family text-black font-medium text-[0.8rem] text-nowrap overflow-hidden items-center">
                                    <p className="overflow-x-hidden w-[170px] cursor-pointer">
                                        {location.address.building}{' '}
                                        {location.address.area}{' '}
                                        {location.address.pin}
                                    </p>
                                    <span className="text-[1.5rem] cursor-pointer">
                                        <RiArrowDropDownLine />
                                    </span>
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                    <div sx={{ flexGrow: 0 }}>
                        <div title="Open settings">
                            <div
                                onClick={handleOpenUserMenu}
                                sx={{ "&:hover": { backgroundColor: "transparent" }, p:0} }
                            >
                                <div className=' flex gap-1 justify-center items-center'>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={`http://localhost:3003/images/${pharmacist?.image}`}
                                />
                                <span className=' text-[1rem] text-black'>{pharmacist?.name}</span>
                                <span><MdKeyboardArrowDown color='black' siz   value={{ size: '10px' }} /></span>
                                </div>
                            </div>
                        </div>
                        <Menu
                            sx={{ mt: '45px', marginLeft: 'auto' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((item) => (
                                <MenuItem
                                    key={item}
                                    onClick={() => {
                                        handleCloseUserMenu(item);
                                    }}
                                >
                                    <Typography
                                        textAlign="center"
                                        paddingLeft={4}
                                        paddingRight={4}
                                    >
                                        {item}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default PharmacistNav;
export { pharmaSocket };
