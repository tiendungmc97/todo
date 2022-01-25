import * as React from 'react';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import { Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const params = useLocation();
    const tab = params.pathname.split("/")[2]

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <div className="Header">
            <AppBar position="static">
                <Container maxWidth="xl" style={{ paddingTop: '1px' }}>
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            LOGO
                        </Typography>
                        <Box className="tabs" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Link to="/app/pharmacy">
                                <Button className={tab === "pharmacy" ? "active" : ""} sx={{ my: 2, color: 'white', display: 'block' }}>
                                    Quầy thuốc
                                </Button>
                            </Link>
                            <Button
                                className={(tab === "producer" || tab === "part" || tab === "customer" || tab === "product" || tab === "symptom") ? "active" : ""}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                Quản lý
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <Link to="/app/customer" className="no-under">
                                    <MenuItem onClick={handleClose}>Khách hàng</MenuItem>
                                </Link>
                                <Link to="/app/lot" className="no-under">
                                    <MenuItem onClick={handleClose}>Lô thuốc</MenuItem>
                                </Link>
                                <Link to="/app/product" className="no-under">
                                    <MenuItem onClick={handleClose}>Thuốc</MenuItem>
                                </Link>
                                <Link to="/app/producer" className="no-under">
                                    <MenuItem onClick={handleClose}>Nhà cung cấp</MenuItem>
                                </Link>
                                <Link to="/app/part" className="no-under">
                                    <MenuItem onClick={handleClose}>Thành phần</MenuItem>
                                </Link>
                                <Link to="/app/symptom" className="no-under">
                                    <MenuItem onClick={handleClose}>Triệu chứng</MenuItem>
                                </Link>
                            </Menu>
                            <Link to="/app/transaction">
                                <Button className={tab === "transaction" ? "active" : ""} sx={{ my: 2, color: 'white', display: 'block' }}>
                                    Thống kê
                                </Button>
                            </Link>
                            
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};
export default Header;