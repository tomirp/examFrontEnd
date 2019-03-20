import React, { Component } from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import cookies from 'universal-cookie'
import {connect} from 'react-redux'

import {keepLogin} from '../action'

import Home from './Home'
import Header from './Header'
import Login from './Login'
import Register from './Register'
import ManageProduct from './ManageProduct'
import ProductItem from './ProductItem';
import DetailProduct from './DetailProduct';
import Cart from './Cart'
import CheckOutCart from './CheckOutCart'

const cookie = new cookies()

class App extends Component {
    
    componentDidMount(){
        // akan di jalankan sekali ketika pertama kali component di render

        // mengambil value yang disimpan pada file cookie masihLogin
        var userCookie = cookie.get('masihLogin')
        // jika didapatkan username di file cookie, akan memanggil function keepLogin
        if(userCookie !== undefined){
            // function keepLogin akan me-loginkan ulang username yg tersimpan pada file cookie
            this.props.keepLogin(userCookie)
        }

    }

    render () {
        return (
            <BrowserRouter>
                <div>

                    <Header/>
                    <Route path="/" exact component={Home}/>
                    <Route path="/Login" component={Login} />
                    <Route path="/Register" component={Register} />
                    <Route path="/ManageProduct" component={ManageProduct}/>
                    <Route path="/Cart" component={Cart}/>
                    <Route path="/DetailProduct/:asdfg" component={DetailProduct}/>
                    <Route path="/CheckOutCart" component={CheckOutCart}/>
                    <Route path="/ProductItem" component={ProductItem}/>
                </div>
            </BrowserRouter>
        )
    }

}

export default connect(null, {keepLogin})(App)