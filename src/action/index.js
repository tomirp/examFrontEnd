import axios from 'axios'
import cookies from 'universal-cookie'

//untuk login
const cookie = new cookies() //membuat function untuk menampilkan halaman user terus menerus ketika berhasil login

export const onLoginClick = (user, pass) => {
    return (dispatch) => {
        axios.get("http://localhost:1996/user", {
        params: {
            username: user,
            password: pass
        }
    }).then(res => {
        if (res.data.length > 0) {
            console.log(res.data[0]);

            const {id, username} = res.data[0]

            dispatch ({ //Jika ada isinya
                type: "LOGIN_SUCCESS",
                payload : {id, username}
            })
            //sebuah file cookie yang bebas kita berikan nama, cth: masihLogin, dan value-nya adalah username yang login
            //path:'/'  agar dapat diakses disetiap component
            cookie.set('masihLogin', username, {path:'/'})
            
        } else { //Jika username tidak ditemukan
            dispatch({
                type: 'AUTH_ERROR',
                payload: "username and password incorrect"
            })
            
        }

        console.log(res.data)
    }).catch(err => {
        console.log("System error");

    })
    }
}

//untuk logout
export const onLogoutUser =()=> {
    cookie.remove('masihLogin')
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

// untuk registrasi
export const onRegisterUser = (user, mail, pass) => {
    return (dispatch) => {
        axios.get('http://localhost:1996/user', {
            params: {
                username: user

            }
        }).then(res => {
            if (res.data.length === 0) {
                axios.post('http://localhost:1996/user', {
                    username: user,
                    email: mail,
                    password: pass
                }).then(res => {
                    dispatch({
                        type: 'AUTH_SUCCESS',
                        payload: 'Registration Successful!'
                    
                    })

                })
            } else {
                dispatch({
                    type: "AUTH_ERROR",
                    payload: 'Username has been taken'
                })
            }
        })
    }
}

//untuk timer
export const onSetTimeOut =()=> {
    return {
        type: 'SET_TIMEOUT'
    }
}


//untuk tetap login

export const keepLogin =(user)=> {
    return (dispatch) => {
        axios.get('http://localhost:1996/user', {
            params: {
                username : user
            }
        }).then(res => {
                if(res.data.length !== 0){
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: {username : user}
                    })
                }
            })
    }
}

// untuk add product

export const addProduct = (pName, pDesc,pPrice, pSrc)=> {
    return (dispatch) => {
        axios.post('http://localhost:1996/products', {
        
                name    : pName,
                desc    : pDesc,
                price   : pPrice,
                src     : pSrc
            
        }).then(res => {
                this.getProduct()
                console.log('data sukses')
                dispatch({
                    type: 'ADD_PRODUCT',
                    payload: 'Product Successfully added'
                })
            
        })
    }   
}
