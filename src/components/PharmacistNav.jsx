import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
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
const settings = ['Profile', 'Logout'];

function PharmacistNav() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const pharmacist = useSelector((state) => state.pharmacist.data);

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
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src={`http://localhost:3003/images/${pharmacist?.image}`}
                                />
                            </IconButton>
                        </Tooltip>
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
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default PharmacistNav;
