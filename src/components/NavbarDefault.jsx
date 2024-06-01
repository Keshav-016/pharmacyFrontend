import Cart from '../assets/images/Cart.png';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineNoAccounts } from 'react-icons/md';
import IconButton from '@mui/material/IconButton';
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
import { searchProductList, fetchProductLists } from '../features/productSlice';
import {
    fetchAllUserAddress,
    deliveryAddress
} from '../features/userAddressSlice';
import { useNavigate } from 'react-router-dom';
import handleConfirmAlert from '../utils/ConfirmTemplate';
import { notify } from '../App';
import { getCartItems } from '../features/userCartSlice';
import { fetchUserByToken } from '../features/userSlice';

export default function NavbarDefault() {
    const allUserAddress = useSelector((state) => state.userAddress.data);
    const userDeliveryAddress = useSelector(
        (state) => state.userAddress.deliveryAddress
    );
    const user = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const userDetails = useSelector((state) => state.user);
    const cartItems = useSelector((state) => state.userCart);
    const searchRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    }, []);

    const location = useLocation();
    const { pathname } = location;

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
                    <IconButton
                        size="large"
                        aria-label="show 4 new mails"
                        color="inherit"
                    >
                        <Badge
                            badgeContent={4}
                            color="error"
                            fontSize="0.8rem"
                            padding="0px"
                        >
                            <img src={Cart} />
                        </Badge>
                    </IconButton>
                    <span>Cart</span>
                </MenuItem>
            </Link>

            <MenuItem onClick={handleMenuClose} style={{ padding: '0px 20px' }}>
                <AccountCircle />
                <span style={{ marginLeft: '10px' }}>Profile</span>
            </MenuItem>

            <MenuItem
                onClick={handleMenuClose}
                style={{ padding: '15px 20px' }}
            >
                <LogoutIcon
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
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
        if (searchRef.current.value === '') {
            dispatch(fetchProductLists(0));
        }
        dispatch(searchProductList(searchRef.current.value));
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={
                    location.pathname === '/'
                        ? {
                              background: '#EBF6F9',
                              boxShadow: '0 0 0 transparent',
                              height: '10vh'
                          }
                        : {
                              background: '#ffffff',
                              boxShadow: '0 0 0 transparent',
                              height: '10vh'
                          }
                }
            >
                <Toolbar>
                    <div className="flex md:flex-row md:gap-16  flex-col">
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'block' } }}
                        >
                            <Link to="/">
                                <Logo />
                            </Link>
                        </Typography>

                        <Typography>
                            <div className="md:block hidden">
                                {user.data ? (
                                    <>
                                        <span className=" font-default-font-family text-[#8e8c8c] text-[0.8rem] font-medium">
                                            Delivery to:
                                        </span>
                                        <div
                                            onClick={toggleDrawer(true)}
                                            className=" flex font-default-font-family text-black font-medium text-[0.8rem] text-nowrap overflow-hidden items-center "
                                        >
                                            <span className="overflow-x-hidden w-[170px] ">
                                                {
                                                    userDeliveryAddress?.address
                                                        ?.building
                                                }
                                                ,
                                                {
                                                    userDeliveryAddress?.address
                                                        ?.area
                                                }
                                                ,
                                                {
                                                    userDeliveryAddress?.address
                                                        ?.city
                                                }
                                                ,
                                                {
                                                    userDeliveryAddress?.address
                                                        ?.country
                                                }
                                            </span>
                                            <span
                                                onClick={toggleDrawer(true)}
                                                className="text-[1.5rem] cursor-pointer"
                                            >
                                                {' '}
                                                <RiArrowDropDownLine />{' '}
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    ''
                                )}
                            </div>
                            <Drawer open={open} onClose={toggleDrawer(false)}>
                                {DrawerList}
                            </Drawer>
                        </Typography>
                    </div>

                    <Box sx={{ flexGrow: 1 }} />

                    {user.data ? (
                        <>
                            {pathname === '/meds' ? (
                                <>
                                    <input
                                        type={'text'}
                                        className="border border-grey p-2 w-[250px] rounded-md font-default-font-family mr-5 outline-none text-black"
                                        placeholder="search medicines"
                                        ref={searchRef}
                                        onChange={handleSearchInput}
                                    />
                                </>
                            ) : (
                                ''
                            )}
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="show 4 new mails"
                                    color="inherit"
                                >
                                    <Link to="/cart">
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                                marginTop: '10px'
                                            }}
                                        >
                                            <img
                                                src={Cart}
                                                className=" pb-5 pt-2 w-4"
                                            />
                                            {cartItems.length ? (
                                                <Badge
                                                    badgeContent={
                                                        cartItems.length
                                                    }
                                                    color="error"
                                                ></Badge>
                                            ) : (
                                                ''
                                            )}
                                            <span
                                                style={{
                                                    fontFamily: 'archivo',
                                                    color: 'black',
                                                    padding: '8px 5px',
                                                    fontSize: '1rem',
                                                    marginBottom: '.4rem'
                                                }}
                                            >
                                                Cart{' '}
                                            </span>
                                        </div>
                                    </Link>
                                </IconButton>

                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <img
                                        className="bg-[#f5f5f5] w-[40px] h-[40px]  rounded-[50%]"
                                        src={`http://localhost:3003/images/${user.data.image}`}
                                        alt="userImage"
                                    />
                                    <span
                                        style={{
                                            fontFamily: 'archivo',
                                            color: 'black',
                                            padding: '5px',
                                            fontSize: '1rem'
                                        }}
                                    >
                                        {userDetails.data.name}{' '}
                                    </span>
                                </IconButton>
                            </Box>{' '}
                        </>
                    ) : (
                        <IconButton
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
                        </IconButton>
                    )}

                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            {user.data ? (
                                <>
                                    <MoreIcon sx={{ color: 'black' }} />
                                </>
                            ) : (
                                ''
                            )}
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
