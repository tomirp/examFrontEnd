import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


class ManageProduct extends Component {
    state = {
        products: [],
        selectedId: 0
    }


    componentDidMount() { // ini akan berjalan sekali ketika proses rendering pertama kali
        this.getProduct()
    }

    getProduct = () => {
        axios.get('http://localhost:1996/products')
            .then(res => {
                this.setState({products: res.data, selectedId: 0})
            })
    }

    onDeleteProductClick =(id)=> {
        console.log("data terhapus");
        
        axios.delete('http://localhost:1996/products/'+id)
        .then(()=>{
            this.getProduct()}
        )
    }

    editProduct =(id)=> {
        this.setState({selectedId: id})
    }

    onSaveItem =(id)=>{
        const nama = this.editName.value
        const desk = this.editDesc.value
        const harga = parseInt(this.editPrice.value)
        const sumber = this.editImg.value

        axios.put('http://localhost:1996/products/'+id,{
            name: nama,
            desc: desk,
            price: harga,
            src : sumber
        }).then(()=>{
            this.getProduct()
        })

       

    }

    onAddProductClick =()=> {
        const pName = this.name.value
        const pDesc = this.desc.value
        const pPrice= this.price.value
        const pPic  = this.pict.value
        // this.props.addProduct(pName, pDesc, pPrice, pSrc)

        axios.post('http://localhost:1996/products',{
                name    : pName,
                desc    : pDesc,
                price   : pPrice,
                img     : pPic
        }).then(()=>{
            this.getProduct()
        })
    }

    renderList =()=> {
        return this.state.products.map(item => {
            if(item.id !== this.state.selectedId){
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.desc}</td>
                        <td>{item.price}</td>
                        <td><img className="list" src={item.img} alt={item.desc}></img></td>
                        <td>
                            <button className="btn btn-primary mr-2" onClick={()=>{this.editProduct(item.id)}}>Edit</button>
                            <button className="btn btn-danger" onClick={()=>{this.onDeleteProductClick(item.id)}}>Delete</button>
                        </td>
                    </tr>
                )
            } else {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                            <input className="form-control" ref={input => {this.editName = input}} type="text" defaultValue={item.name}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editDesc = input}} type="text" defaultValue={item.desc}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editPrice = input}} type="text" defaultValue={item.price}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editImg = input}} type="text" defaultValue={item.src}/>
                        </td>
                        <td>
                            <button onClick={() => {this.onSaveItem(item.id)}} className="btn btn-primary mb-2">Save</button>
                            <button onClick={() => {this.setState({selectedId: 0})}} className="btn btn-danger">Cancel</button>
                        </td>
                    </tr>
                )
            }
        })
    }

    render() {
        if(this.props.username !== ''){
            return (
                <div className="container">
                    {/* {["satu", "dua", "tiga"]} */}
                    <h1 className="display-4 text-center">Manage Product</h1>
                    <table className="table table-hover mb-5">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">DESC</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">PICTURE</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.renderList()}
                            </tbody>
                        </table>
                        <h1 className="display-4 text-center">Input Product</h1>
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th scope="col">NAME</th>
                                    <th scope="col">DESC</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">PICTURE</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="col"><input ref={input => this.name = input} className="form-control" type="text" /></th>
                                    <th scope="col"><input ref={input => this.desc = input} className="form-control" type="text" /></th>
                                    <th scope="col"><input ref={input => this.price = input} className="form-control" type="text" /></th>
                                    <th scope="col"><input ref={input => this.pict = input} className="form-control" type="text" /></th>
                                    <th scope="col"><button onClick={this.onAddProductClick} className="btn btn-outline-warning" >Add</button></th>
                                </tr>
                            </tbody>
                        </table>
                </div>
            )
        } else {
            return <Redirect to="/"/>
        }
        // return (
        //     <div className="container">
        //         <h1 className="display-4 text-center">Manage Product</h1>
        //         <table className="table table-hover mb-5">
        //                 <thead>
        //                     <tr>
        //                         <th scope="col">ID</th>
        //                         <th scope="col">NAME</th>
        //                         <th scope="col">DESC</th>
        //                         <th scope="col">PRICE</th>
        //                         <th scope="col">PICTURE</th>
        //                         <th scope="col">ACTION</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {this.renderList()}
        //                 </tbody>
        //             </table>
        //             <h1 className="display-4 text-center">Input Product</h1>
        //             <table className="table text-center">
        //                 <thead>
        //                     <tr>
        //                         <th scope="col">NAME</th>
        //                         <th scope="col">DESC</th>
        //                         <th scope="col">PRICE</th>
        //                         <th scope="col">PICTURE</th>
        //                         <th scope="col">ACTION</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     <tr>
        //                         <th scope="col"><input ref={input => this.name = input} className="form-control" type="text" /></th>
        //                         <th scope="col"><input ref={input => this.desc = input} className="form-control" type="text" /></th>
        //                         <th scope="col"><input ref={input => this.price = input} className="form-control" type="text" /></th>
        //                         <th scope="col"><input ref={input => this.src = input} className="form-control" type="text" /></th>
        //                         <th scope="col"><button className="btn btn-outline-warning" onClick={()=>this.onAddProductClick()} >Add</button></th>
        //                     </tr>
        //                 </tbody>
        //             </table>
        //     </div>
        // )
    }
}

const mapStateToProps = (state)=> {
    return {success: state.Auth.success}
} 
export default connect(mapStateToProps)(ManageProduct)