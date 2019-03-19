import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class ProductItem extends Component {

    render () {
        const {item} = this.props
        return (
            <div className="card col-3 m-3" style={{ width: "18rem" }} key={item.id}>
                <img src={item.src} className="card-img-top" alt={item.name} />
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.desc}</p>
                    <p className="card-text">Rp.{item.price}</p>
                    <input className="form-control" type="number" />
                    <Link to={"/DetailProduct/" + item.id}><button className="btn btn-secondary btn-block btn-sm my-2">Detail</button></Link>
                    <button  className="btn btn-primary btn-block btn-sm my-2">Add to Cart</button>
                </div>
            </div>
        )
    }
}

export default ProductItem