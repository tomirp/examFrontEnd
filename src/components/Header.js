import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {Button,
        Collapse,
        Navbar,
        NavbarToggler,
        NavbarBrand,
        Nav,
        NavItem,
        UncontrolledDropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem } from 'reactstrap'

import { onLogoutUser } from '../action'


class Header extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        const { user } = this.props

        if (user.username === '') {
            return (
                <div>
                    <Navbar color='primary' light expand='md'>
                        <div className="container">
                            <Link className="navbar-brand text-light" color='light' to='/'>COMMONLINE</Link>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className='ml-auto' navbar>
                                    <NavItem>
                                        <Link className='nav-link' color='light' to='/'>All Product</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className='nav-link' color ='light' to='/Register'>Register</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className='nav-link' color = 'light' to='/Login' href='/'>Login</Link>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </div>
                    </Navbar>
                </div>
            )
                //     <nav className="navbar navbar-expand-sm navbar-light bg-light mb-3">
                //         <div className="container">
                //         <Link className="navbar-brand" to="/">SAHABAT GURUN ONLINE</Link>
                //         <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav2">
                //             <span className="navbar-toggler-icon"></span>
                //         </button>

                //         <div className="collapse navbar-collapse row p-2" id="navbarNav2">
                //             <form className="input-group col-12 col-md-7 ml-auto">
                //                 <input type="text" className="form-control mr-2" placeholder="Search" />
                //                 <button className="btn btn-outline-primary">Search</button>
                //             </form>
                //             <ul className="navbar-nav ml-auto col-12 col-md-5">
                //                 <li className="nav-item m-1">
                //                     <a className="nav-a" href="/ProductItem"><button className="btn btn-primary">Product</button></a>
                //                 </li>

                //                 <li className="nav-item m-1">
                //                     <a className="nav-a" href="/register"><button className="btn btn-primary">Register</button></a>
                //                 </li>
                //                 <li className="nav-item m-1">
                //                     <a className="nav-a" href="/Login"><button className="btn btn-primary">Login</button></a>
                //                 </li>
                //             </ul>
                //         </div>
                //     </div>
                // </nav>
            
        } else {
            return (
                <div>
                    <Navbar color='primary' light expand='md'>
                        <div className='container'>
                            <NavbarBrand href='/'className='text-light'>COMMONLINE</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className='ml-auto' navbar>
                                    <NavItem>
                                        <Link className='nav-link' to='/'>All Product</Link>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            Hallo {user.username}
                                        </DropdownToggle>
                                        <DropdownMenu Right>
                                            <Link className='dropdown-item' to='/ManageProduct'>
                                                <DropdownItem>Manage Product</DropdownItem>
                                            </Link>
                                            <Link className='dropdown-item' to='cart'>
                                                <DropdownItem>Cart</DropdownItem>
                                            </Link>

                                            <DropdownItem divider />
                                            <Button className='dropdown-item' onClick={this.props.onLogoutUser}>
                                                Log Out
                                        </Button>

                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </Collapse>
                        </div>
                    </Navbar>
                </div>
            )

            // return (
            //     <div>
            //         <Redirect to='/'/>
            //         <nav className="navbar sticky-top navbar-expand-md navbar-light bg-light mb-3">
            //         <div className="container">
            //             <Link className="navbar-brand" to="/">SAHABAT GURUN ONLINE</Link>
            //         <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav2">
            //             <span className="navbar-toggler-icon"></span>
            //         </button>

            //         <div className="collapse navbar-collapse row p-2" id="navbarNav2">
            //             <form className="input-group col-12 col-md-7 ml-auto">
            //                 <input type="text" className="form-control mr-2" placeholder="Search" />
            //                 <button className="btn btn-outline-success">Search</button>
            //             </form>
            //             <ul className="navbar-nav ml-auto col-12 col-md-5">
            //                 <li className="nav-item mt-2">
            //                     <Link className="nav-link" to="/ManageProduct">Products</Link>
            //                 </li>
            //                 <li className="nav-item dropdown mt-2">
            //                     <Link to="/asd" className="nav-link dropdown-toggle" data-toggle="dropdown">Hallo {user.username}</Link>
            //                     <div className="dropdown-menu">
            //                         <Link to="/" className="dropdown-item">Profil</Link>
            //                         <Link to="/manageproduct" className="dropdown-item">Manage Product</Link>
            //                         <Link to="/Login" onClick={this.props.onLogoutUser} className="dropdown-item">Logout</Link>
            //                     </div>
            //                 </li>
            //             </ul>
            //         </div>
            //     </div>
            // </nav>
                    
            //     </div>
            // )

            

        }

    }
}

const mapStateToProps = state => {
    return { user: state.Auth }
}

export default connect(mapStateToProps, { onLogoutUser })(Header)