import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

class ProductItem extends React.Component {

  constructor(props) {
    super(props);
    this.formatterIDR = new Intl.NumberFormat('id', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      })    
  }

  state = {
    // cart: [],
    quantity: 0
  };

  // componentDidMount(){
  //   this.
  // }

  btnAddToCart = (id, qty) => {
    console.log(id);

    // if (id !== undefined) {
    axios.get("http://localhost:1996/product", {
        params: {
          id
        }
      })
      .then(res => {
        console.log(res.data[0].id);
        axios.get("http://localhost:1996/carts").then(resCart => {
          console.log(resCart.data.length);
          console.log(`ini id ${id} ini username ${this.props.username}`);

          if (
            // resCart.data.length === 0 ||
            resCart.data.findIndex(
              x => x.productId === id && x.username === this.props.username
            ) < 0
          ) {
            axios.post("http://localhost:1996/carts", {
              username: this.props.username,
              // id: this.props.id,
              qty,
              name: res.data[0].name,
              desc: res.data[0].desc,
              price: res.data[0].price,
              src: res.data[0].src,
              productId: res.data[0].id
            });
          } else {
            axios
              .get(`http://localhost:1996/carts`, {
                params: {
                  productId: id
                }
              })
              .then(res => {
                console.log(res.data[0].productId);
                // console.log(res.data);
                // console.log(res.data);
                // console.log(res.data);
                // console.log(res.data);
                this.setState({ quantity: res.data[0].qty });
                axios.put(`http://localhost:1996/carts/${res.data[0].id}`, {
                    username: this.props.username,
                    qty: this.state.quantity + qty,
                    name: res.data[0].name,
                    desc: res.data[0].desc,
                    price: res.data[0].price,
                    src: res.data[0].src,
                    productId: res.data[0].productId
                  })
                  .then(() => {
                    this.setState({ quantity: 0 });
                  });
              });
          }
        });
      });
    // }
  };

  render() {
    const { item } = this.props;

    if(this.props.username !== ""){
      return (
        <div className="card col-3 m-3" style={{ width: "18rem" }} key={item.id}>
          <img src={item.src} className="card-img-top" alt={item.name} />
  
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
  
            <p className="card-text">{item.desc}</p>
  
            <p className="card-text">{this.formatterIDR.format(item.price)}</p>
  
            <input
              className="form-control"
              type="number"
              ref={input => {
                this.qty = input;
              }}
              min="0" defaultValue={1}
            />
  
            <Link to={`/DetailProduct/${item.id}`}>
              <button className="btn btn-secondary btn-block btn-sm my-2">
                Detail
              </button>
  
            </Link>
  
            <button
              onClick={() => {
                this.btnAddToCart(item.id, parseInt(this.qty.value));
              }}
              className="btn btn-primary btn-block btn-sm my-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      );
    }
      else {
        return (
          <div className="card col-3 m-3" style={{ width: "18rem" }} key={item.id}>
            <img src={item.src} className="card-img-top" alt={item.name} />
    
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
    
              <p className="card-text">{item.desc}</p>
    
              <p className="card-text">{this.formatterIDR.format(item.price)}</p>
    
              <input
                className="form-control"
                type="number"
                ref={input => {
                  this.qty = input;
                }}
                min="0" defaultValue={1}
              />
    
              <Link to={`/detailproduct/${item.id}`}>
                <button className="btn btn-secondary btn-block btn-sm my-2">
                  Detail
                </button>
    
              </Link>
              <Link to="/login">
              <button
                className="btn btn-primary btn-block btn-sm my-2"
              >
                Add to Cart
              </button>
              </Link>
              
            </div>
          </div>
        );
      }
    }
      }


    

const mapStateToProps = state => {
  return { username: state.auth.username };
};

export default connect(mapStateToProps)(ProductItem);