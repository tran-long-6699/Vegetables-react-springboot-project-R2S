import React, { Component } from "react";
import axios from "axios";
import Demo2 from "./Home/Demo2";

const PRODUCT_API_URL = "http://localhost:8080/veg/api/product";
export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios
      .get(PRODUCT_API_URL)
      .then((resp) => {
        this.state.products = resp.data;
        this.setState({
            products: resp.data
        })
        console.log(resp);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

//   lapSanPham = () => {
//     return this.state.products.map((sp, index) => {
//       return (
//         <div className="card col-sm-4" key ={index}>
//           <img
//             className="card-img-top"
//             src={"./images/product/" + sp.image}
//             alt
//           />
//           <div className="card-body">
//             <h4 className="card-title">{sp.productname}</h4>
//             <p className="card-text">{sp.priceaverage}</p>
//           </div>
//         </div>
//       );
//     });
//   };

    loadSanPham = () =>{
        return this.state.products.map((sp, i) =>{
            return (
                <Demo2 sp={sp} key={i} />
            )  
        })
    }

  render() {
    return (
      <div className="container">
        <h4 className="text-center">Demo API With Axios</h4>       
          <div className="row">
              {/* {this.lapSanPham()} */}
            {this.loadSanPham()}
        </div>
      </div>
    );
  }
}
