import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { fetchAdminDetails } from '../features/adminDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import handleConfirmAlert from '../utils/ConfirmTemplate';
import { notify } from '../App';
import showAlert from './showAlert';
import { RiArrowDropDownLine } from 'react-icons/ri';

const pages = [
    { name: 'Customer', route: '/admin/customer-list' },
    { name: 'All orders', route: '/admin/all-order' },
    { name: 'Medicines', route: '/admin/all-medicines' },
    { name: 'Pharmacies', route: '/admin/all-pharmacies' }
];
const settings = [
    { name: 'Dashboard', route: '/admin/admin-profile/edit' },
    { name: 'Logout' }
];

function AdminNav() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [currPage, setCurrPage] = useState(window.location.pathname);

    const adminData = useSelector((state) => state.admin.data);
    const adminDataError = useSelector((state) => state.admin.isError);
    const adminDataLoading = useSelector((state) => state.admin.isLoading);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (adminDataError) {
        navigate('/admin-login');
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleLinkClick = (route) => {
        setCurrPage(route);
        navigate(route);
        handleCloseNavMenu();
    };

    const handleLinkClickSm = (route) => {
        setCurrPage(route);
        navigate(route);
        handleCloseNavMenu();
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const logoutFunction = () => {
        handleConfirmAlert(
            'question',
            '',
            'Are you sure you want to logout?',
            'Logout',
            () => {
                localStorage.removeItem('token');
                navigate('/admin-login');
                showAlert('success', 'Successfully logged out');
            }
        );
    };

    const handleCloseUserMenu = (setting) => {
        if (setting.route === undefined) {
            logoutFunction();
        }
        navigate(setting.route);
        setAnchorElUser(null);
    };

    useEffect(() => {
        dispatch(fetchAdminDetails());
    }, []);

    return (
        <>
            <AppBar
                position="sticky"
                sx={{
                    boxShadow: '0',
                    background: '#fff',
                    display: 'flex',
                    top: 0,
                    left: 0,
                    zIndex: 10
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar
                        disableGutters
                        sx={{
                            height: '10vh',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Typography>
                            <Box
                                sx={{
                                    display: {
                                        xs: 'flex',
                                        md: 'none',
                                        color: '#174883'
                                    }
                                }}
                            >
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left'
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left'
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' }
                                    }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem
                                            key={page.name}
                                            onClick={() =>
                                                handleLinkClickSm(page.route)
                                            }
                                            sx={
                                                currPage === page.route
                                                    ? {
                                                          color: '#174883',
                                                          fontWeight: '600',
                                                          borderBottom:
                                                              '2px solid #174883',
                                                          borderRadius: 0,
                                                          fontSize: '0.9rem'
                                                      }
                                                    : {
                                                          color: 'black',
                                                          fontWeight: '600',
                                                          borderRadius: 0,
                                                          fontSize: '0.9rem',
                                                          borderBottom:
                                                              '2px solid #fff'
                                                      }
                                            }
                                        >
                                            <Typography textAlign="center">
                                                {page.name}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>

                            <Link to="/admin/customer-list">
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    sx={{
                                        display: { xs: 'none', md: 'flex' },
                                        marginRight: 'auto'
                                    }}
                                    onClick={() =>
                                        setCurrPage('/admin/customer-list')
                                    }
                                >
                                    <Logo />
                                </Typography>
                            </Link>
                        </Typography>

                        <Link to="/admin/customer-list">
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1
                                }}
                            >
                                <Logo />
                            </Typography>
                        </Link>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' },
                                justifyContent: 'end',
                                marginRight: '5rem',
                                gap: '1rem'
                            }}
                        >
                            {pages.map((page) => (
                                <Button
                                    style={{ textTransform: 'none' }}
                                    key={page.name}
                                    sx={
                                        currPage === page.route
                                            ? {
                                                  color: '#174883',
                                                  fontWeight: '600',
                                                  borderBottom:
                                                      '2px solid #174883',
                                                  borderRadius: 0,
                                                  fontSize: '0.9rem'
                                              }
                                            : {
                                                  color: 'black',
                                                  fontWeight: '600',
                                                  borderRadius: 0,
                                                  fontSize: '0.9rem',
                                                  borderBottom: '2px solid #fff'
                                              }
                                    }
                                    onClick={() => {
                                        handleLinkClick(page.route);
                                    }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                className=' flex justify-center items-center gap-1'
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <img
                                        className="bg-[#f5f5f5] w-[40px] h-[40px]  rounded-[50%] object-contain"
                                        src={`http://localhost:3003/images/${adminData?.image}`}
                                        alt="userImage"
                                    />
                                    <span className=' text-[1rem] font-default-font-family  font-bold  text-black'>{adminData?.name}</span>
                                    <RiArrowDropDownLine size={'35px'} color='black' />
                                </IconButton>
                            </Tooltip>

                            <Menu
                                sx={{ mt: '45px' }}
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
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting.name}
                                        onClick={() => {
                                            handleCloseUserMenu(setting);
                                            setCurrPage(
                                                window.location.pathname
                                            );
                                        }}
                                    >
                                        <Typography textAlign="center">
                                            {setting.name}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}
export default AdminNav;
