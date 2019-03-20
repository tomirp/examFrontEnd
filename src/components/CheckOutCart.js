import React, { Component } from 'react';

class CheckOutCart extends Component {
    constructor(props) {
        super(props);
        this.formatterIDR = new Intl.NumberFormat('id', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        })

    }

    total = () => {
        if (this.props.list !== 0) {
            let total = 0
            for (let elt of this.props.list) {
                let t = elt.qty * elt.price
                total += t
            }
            return total
        } else {
            return 0
        }
    }

    renderList = () => {
        return this.props.list.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>{this.formatterIDR.format(item.price)}</td>
                    <td>{item.qty}</td>
                    <td>{this.formatterIDR.format(item.price * item.qty)}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>

                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">QUANTITY</th>
                            <th scope="col">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colSpan="5" className="text-center"><strong>TOTAL :</strong></td>
                            <td>{this.formatterIDR.format(this.total())}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

export default CheckOutCart;