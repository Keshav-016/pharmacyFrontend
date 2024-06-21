import Cart from '../assets/images/Cart.png';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineNoAccounts } from 'react-icons/md';
import axios from 'axios'
import deleteAccount from '../utils/deleteAccount';
import { useState, useEffect, useRef } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import MoreIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import MailIcon from '@mui/icons-material/Mail';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Logo from './Logo';
import { getAllUserOrders } from '../features/userFinalOrderSlice';
import { searchProductList, fetchProductLists } from '../features/productSlice';
import {
    fetchAllUserAddress,
    deliveryAddress
} from '../features/userAddressSlice';
import { GoTriangleUp } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import handleConfirmAlert from '../utils/ConfirmTemplate';
import { notify } from '../App';
import { getCartItems } from '../features/userCartSlice';
import { fetchUserByToken } from '../features/userSlice';
import { io } from 'socket.io-client';

const token = localStorage.getItem('token') || sessionStorage.getItem('token');
const userSocket = io('http://localhost:3003/', { query: `token=${token}` });

export default function NavbarDefault() {
    const searchRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const allUserAddress = useSelector((state) => state.userAddress.data);
    const userDeliveryAddress = useSelector(
        (state) => state.userAddress.deliveryAddress
    );
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [currentAddress, setCurrentAddress] = useState('');
    const user = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(false);
    const userDetails = useSelector((state) => state.user);
    const cartArr = JSON.parse(localStorage.getItem('cartArray'));
    const [userLocation, setUserLocation] = useState({});
    const cartItems = useSelector((state) => state.userCart);


    useEffect(() => {
        fetchAddress();
        dispatch(fetchUserByToken());
        dispatch(getCartItems());
        dispatch(getAllUserOrders());
    }, []);

    useEffect(() => {
        fetchAddress();
    }, [allUserAddress]);




    useEffect(() => {
        const token = localStorage.getItem('token');
        token !== null && setLocalStorageCart();
    }, []);

    useEffect(() => {
        if (search === '') {
            dispatch(fetchProductLists(0));
        }
        dispatch(searchProductList(search));
    }, [search]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                },
                (error) => {
                    notify('Error getting user location:', 'error');
                    console.log(error);
                }
            );
            placesApi(userLocation);
        } else {
            notify('Geolocation is not supported by this browser.');
        }
    }, []);

    const fetchAddress = async () => {
        dispatch(fetchAllUserAddress());
    };

    const setHandleLogouts = () => {
        localStorage.removeItem('token');
        navigate('/login');
        notify('You have been logged out ');
    };

    const handleLogout = () => {
        handleConfirmAlert(
            '',
            'medigen',
            'Are you sure you want to logout?',
            'Yes',
            setHandleLogouts
        );
        navigate('/');
    };

    const handleDeliveryAddress = (item) => {
        dispatch(deliveryAddress(item._id));
    };

    useEffect(() => {
        fetchAddress();
        dispatch(fetchUserByToken());
        dispatch(getCartItems());
        dispatch(getAllUserOrders());
    }, []);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const DrawerList = (
        <Box
            sx={{ width: 280 }}
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            <List>
                <div>
                    <div>
                        <div className="flex font-default-font-family justify-start ms-4 align-center mt-5">
                            Saved Addresses
                        </div>
                        {allUserAddress?.map((item) => (
                            <div
                                key={item._id}
                                className="text-[#000000] text-[0.7rem] m-3 p-4 border-[0.08rem] rounded-md cursor-pointer"
                                onClick={() => {
                                    handleDeliveryAddress(item);
                                }}
                            >
                                <h1 className=" font-default-font-family text-[0.9rem] text-black font-semibold ">
                                    {item.type} Address
                                </h1>
                                <h1 className="text-[#737A83]">
                                    {item.receiverName}
                                </h1>
                                <div className="text-[#737A83]">
                                    {item.address.building},{item.address.area},
                                    {item.address.city},{item.address.state},
                                    {item.address.country},<br />
                                    Pin-{item.address.postcode}{' '}
                                </div>
                                <h1 className="text-[#737A83]">
                                    +91 {item.phone}
                                </h1>
                            </div>
                        ))}
                        <div
                            onClick={() => {
                                navigate('/user-address');
                            }}
                            className=" flex items-center justify-center text-[#1444ef] text-[0.9rem] underline cursor-pointer"
                        >
                            +Add New Address
                        </div>
                    </div>
                </div>
            </List>
        </Box>
    );

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Link to="/user-profile">
                <MenuItem
                    onClick={handleMenuClose}
                    style={{ padding: '5px 40px' }}
                >
                    <AccountCircle />
                    <span style={{ marginLeft: '10px' }}>Profile</span>
                </MenuItem>
            </Link>

            <Link to="/">
                <MenuItem
                    onClick={() => {
                        deleteAccount();
                        handleMenuClose;
                    }}
                    style={{ padding: '5px 40px' }}
                >
                    <MdOutlineNoAccounts />
                    <span style={{ marginLeft: '10px' }}>Delete Account</span>
                </MenuItem>
            </Link>

            <MenuItem onClick={handleMenuClose} style={{ padding: '5px 40px' }}>
                <LogoutIcon size="large" color="inherit"></LogoutIcon>
                <Button
                    sx={{
                        width: '100%',
                        color: 'black',
                        textAlign: 'start',
                        textTransform: 'none',
                        fontSize: '1rem',
                        padding: '0px'
                    }}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <Link to="/cart">
                <MenuItem
                    onClick={handleMenuClose}
                    style={{ padding: '0px 10px' }}
                >
                    <div size="large" color="inherit">
                        {user.data === null ? (
                            <Badge
                                badgeContent={cartArr?.length}
                                color="error"
                                fontSize="0.8rem"
                                padding="0px"
                            >
                                <img src={Cart} />
                            </Badge>
                        ) : (
                            <Badge
                                badgeContent={cartItems?.length}
                                color="error"
                                fontSize="0.8rem"
                                padding="0px"
                            >
                                <img src={Cart} />
                            </Badge>
                        )}
                    </div>
                    <span className=" font-bold">Cart</span>
                </MenuItem>
            </Link>

            <Link to="/user-profile">
                <MenuItem
                    onClick={handleMenuClose}
                    style={{ padding: '0px 20px' }}
                >
                    <AccountCircle />
                    <span style={{ marginLeft: '10px' }}>Profile</span>
                </MenuItem>
            </Link>

            <MenuItem
                onClick={handleMenuClose}
                style={{ padding: '15px 20px' }}
            >
                <LogoutIcon
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                    onClick={handleLogout}
                >
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </LogoutIcon>
                <span style={{ marginLeft: '5px' }}>Logout</span>
            </MenuItem>
        </Menu>
    );

    const handleSearchInput = (e) => {
        setSearch(searchRef.current.value);
    };

    const placesApi = async (userLocation) => {
        try {
            const response = await axios.get(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&localityLanguage=en`
            );
            let address = ' ';
            response.data.localityInfo.administrative
                .reverse()
                .forEach((ele) => {
                    address += ele.name + ', ';
                });
            setCurrentAddress(address);
        } catch (error) {
            console.error('There was an error while fetching places:', error);
        }
    };

    const setLocalStorageCart = async () => {
        const cartItemsArray = JSON.parse(localStorage.getItem('cartArray'));
        if (cartItemsArray?.length >= 1) {
            try {
                localStorage.removeItem('cartArray');
                const token = localStorage.getItem('token');
                const rawData = await axios({
                    method: 'put',
                    url: `http://localhost:3003/cart/add-cart-data`,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    data: {
                        cartArr: cartItemsArray
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }
    };

    const userOrdersTotal = useSelector(
        (state) => state.userOrders.totalPendingOrders
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{ display: 'flex', justifyContent: 'center', background: location.pathname === '/' ? '#EBF6F9' : '#FFFFFF', height: '10vh', margin: 'auto' }} >
                <Toolbar>
                    <div className="flex md:flex-row md:gap-16 flex-col">
                        <div sx={{ display: { xs: 'block' } }}>
                            <Link to="/"> <Logo /></Link>
                        </div>

                        <Typography>
                            <div
                                className="md:block hidden b relative"
                                onMouseEnter={() => {
                                    setVisible(true);
                                }}
                                onMouseLeave={() => {
                                    setVisible(false);
                                }}
                            >

                                <span className=" font-default-font-family text-[#8e8c8c] text-[0.8rem] font-medium hover:cursor-pointer">
                                    Delivery to:
                                </span>
                                <div
                                    onClick={toggleDrawer(true)}
                                    className="  flex font-default-font-family text-black font-medium text-[0.8rem] text-nowrap overflow-hidden items-center "
                                >

                                    {allUserAddress.length < 1 ?
                                        <span className="overflow-x-hidden w-[170px] hover:cursor-pointer ">
                                            {currentAddress}
                                        </span> : <span className=' overflow-x-hidden w-[170px]'>{
                                            userDeliveryAddress
                                                ?.address?.building
                                        }
                                            {
                                                userDeliveryAddress
                                                    ?.address?.area
                                            }
                                            {
                                                userDeliveryAddress
                                                    ?.address?.city
                                            }
                                            {
                                                userDeliveryAddress
                                                    ?.address?.country
                                            }</span>}
                                    {visible && (
                                        <div className=" left-0 hover:cursor-pointer">
                                            <GoTriangleUp
                                                size={'40px'}
                                                color="white"
                                                className=" absolute  top-8  left-40"
                                            />
                                            {user.data === null ? <div className=" bg-[#ffffff] w-[280px] text-wrap rounded-md flex absolute top-14 left-0 p-5 ">
                                                {currentAddress}
                                            </div> :
                                                <div className=" bg-[#ffffff] w-[280px] text-wrap rounded-md flex absolute top-14 left-0 p-5 ">
                                                    {
                                                        userDeliveryAddress
                                                            ?.address?.building
                                                    },
                                                    {
                                                        userDeliveryAddress
                                                            ?.address?.area
                                                    },
                                                    {
                                                        userDeliveryAddress
                                                            ?.address?.city
                                                    },
                                                    {
                                                        userDeliveryAddress
                                                            ?.address?.country
                                                    }
                                                </div>
                                            }
                                        </div>
                                    )}

                                    {user.data !== null && <span
                                        onClick={toggleDrawer(true)}
                                        className="text-[1.5rem] cursor-pointer"
                                    >
                                        {' '}
                                        <RiArrowDropDownLine />{' '}
                                    </span>}

                                </div>
                            </div>
                            <Drawer open={open} onClose={toggleDrawer(false)}>
                                {DrawerList}
                            </Drawer>
                        </Typography>
                    </div>

                    <Box sx={{ flexGrow: 1 }} />

                    {user.data ? (
                        <>
                            {location.pathname === '/meds' && (
                                <input
                                    type={'text'}
                                    className="border border-grey px-5 py-2 rounded-md font-default-font-family mr-10 outline-none text-black xl:flex  hidden"
                                    placeholder="search medicines"
                                    ref={searchRef}
                                    value={search}
                                    onChange={handleSearchInput}
                                />
                            )}
                            <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: "center", alignItems: 'center', gap: '40px' }}>

                                <div size="large">
                                    <div
                                        onClick={() => {
                                            navigate('/cart');
                                        }}
                                        className=" flex justify-center items-center gap-1 hover:cursor-pointer"
                                    >
                                        <div className=' relative'>
                                            <img src={Cart} className=' w-[17px] mb-1' />
                                            {user.data === null ?
                                                <span className=" bg-[#D32F2F] flex text-[0.7rem] font-semibold w-[20px] h-[20px]  justify-center items-center m-auto rounded-[50%] text-white">
                                                    {cartArr?.length}
                                                </span>
                                                :
                                                cartItems.length > 0 &&
                                                <span className=" absolute bottom-4 left-2 bg-[#D32F2F] flex text-[0.7rem] font-semibold w-[20px] h-[20px]  justify-center items-center m-auto rounded-[50%] text-white">
                                                    {cartItems?.length}
                                                </span>
                                            }
                                        </div>

                                        <span
                                            style={{
                                                fontFamily: 'archivo',
                                                color: 'black',
                                                fontSize: '1rem',
                                                fontWeight: 'semiBold'
                                            }}
                                        >
                                            Cart
                                        </span>
                                    </div>
                                </div>

                                <div size="large">
                                    <div
                                        onClick={() => {
                                            navigate('/user-profile/order');
                                        }}
                                        className="  border rounded-md py-2 px-3 bg-[#cbe4eb] flex justify-center items-center gap-2 hover:cursor-pointer"
                                    >
                                        <span
                                            style={{
                                                fontFamily: 'archivo',
                                                color: 'black',
                                                fontSize: '1rem',
                                                fontWeight: 'semiBold'
                                            }}
                                        >
                                            Pending Orders{' '}
                                        </span>
                                        <span className=" bg-[#D32F2F] flex text-[0.9rem] font-semibold w-[20px] h-[20px]  justify-center items-center m-auto rounded-[50%] text-white">
                                            {userOrdersTotal}
                                        </span>
                                    </div>
                                </div>

                                <div
                                    className=' flex justify-center items-center'
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    onClick={handleProfileMenuOpen}
                                >
                                    <img
                                        className="bg-[#f5f5f5] w-[40px] h-[40px]  rounded-[50%] object-contain"
                                        src={`http://localhost:3003/images/${user.data.image}`}
                                        alt="userImage"
                                    />
                                    <span
                                        className=' hover:cursor-pointer flex justify-center items-center'
                                        style={{
                                            fontFamily: 'archivo',
                                            color: 'black',
                                            padding: '5px',
                                            fontSize: '0.9rem',
                                            fontWeight: 'semiBold'
                                        }}
                                    >
                                        <span className=' w-[80px] truncate'>{userDetails.data.name.toUpperCase()}</span>
                                        < RiArrowDropDownLine size={'25px'} />
                                    </span>
                                </div>
                            </Box>
                        </>
                    ) : (

                        <div className=' flex justify-center items-center gap-[15px]'>
                            <div size="large">
                                <div
                                    onClick={() => {
                                        navigate('/cart');
                                    }}
                                    className=" flex justify-center items-center gap-1 hover:cursor-pointer"
                                >
                                    <div className=' relative'>
                                        <img src={Cart} className=' w-[17px] mb-1' />
                                        {
                                            cartArr?.length > 0 &&
                                            <span className=" absolute bottom-4 left-2 bg-[#D32F2F] flex text-[0.7rem] font-semibold w-[20px] h-[20px]  justify-center items-center m-auto rounded-[50%] text-white">
                                                {cartArr?.length}
                                            </span>
                                        }

                                    </div>

                                    <span
                                        style={{
                                            fontFamily: 'archivo',
                                            color: 'black',
                                            fontSize: '1rem',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Cart
                                    </span>
                                </div>
                            </div>

                            <div
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <Link to="/login">
                                    <div className=" font-default-font-family text-black text-[1rem] font-bold">
                                        SignIn
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )}

                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <div
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            {user.data && <MoreIcon sx={{ color: 'black' }} />}
                        </div>
                    </Box>

                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
export { userSocket };
