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
// import ProductItem from './ProductItem'
import DetailProdcut from './DetailProduct'

const cookie = new cookies()

class App extends Component {

    componentDidMount(){
        var userCookie = cookie.get('StillLogin')
        if(userCookie !== undefined){
            this.props.keepLogin(userCookie)
        }
    }

    render () {
        return (
            <BrowserRouter>
                <div>
                   <Header/>
                   <Route path ='/' exact component={Home}/>
                   <Route path ='/Login' component={Login}/>
                   <Route path ='/Register' component={Register}/>
                   <Route path ='/ManageProduct' component={ManageProduct}/>
                   <Route path ='/DetailProduct/:asdfg' component={DetailProdcut}/>
                </div>
            </BrowserRouter>
            
            
        )
    }
}

export default connect(null, {keepLogin})(App)