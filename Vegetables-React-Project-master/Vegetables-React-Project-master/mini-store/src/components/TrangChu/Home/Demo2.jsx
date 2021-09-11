import React, { Component } from "react";
import {connect} from 'react-redux';

class Demo2 extends Component {
  
  render() { 
    const {sp} = this.props; 
    return (
      <div className="col-sm-3">
        <div className="card">
          <img
            className="card-img-top"
            src={"./images/product/" + sp.image} width={250} height={250}
          />
          <div className="card-body">
            <h4 className="card-title">{sp.productname}</h4>
            <p className="card-text">{sp.priceaverage}</p>
            <button className="btn btn-success" onClick={()=>this.props.addCart(sp)}>Thêm giỏ hàng</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    carts: state.GioHangReducer ? state.GioHangReducer.carts : []
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    addCart: (product)=>{
      const action ={
        type: 'ADDCART',
        product
      }
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Demo2)

