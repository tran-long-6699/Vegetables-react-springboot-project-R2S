import React, { Component } from 'react'
import LoaiSanPham from './LoaiSanPham'
import axios from 'axios';
import {connect} from 'react-redux';
import {actFetchAllProductsRequest} from '../../../../action/index'
 
const API_CATEGORIES_URL = 'http://localhost:8080/veg/api/categories';
class DanhSachLoai extends Component {
    constructor(props){
        super(props);
        this.state ={
            categories: []
        }
    }

    //$scope.loadData = function(){
    //  $http.get(url)
    //  .then()
    //  .catch()
    //}
 
    componentDidMount() {
        axios.get(API_CATEGORIES_URL)
          .then(res => {
            const categories = res.data;
            this.setState({ categories });
            console.log(res);
          })
          .catch(error => console.log(error));
      }

    renderLoai = () =>{
        return this.state.categories.map((cat, i)=>{
            return (
                <LoaiSanPham key={i} loai={cat} />
            );
        })
    }

    render() {
        return (
            <div>
                <li>
                    <a style={{color:'#228B22', cursor:'pointer', color:'white'}} className="active" onClick={()=>this.props.fetchAllProducts()}>
                      All
                    </a>
                </li>
                {this.renderLoai()}
            </div>
        )
    }
}

const mapDispathToProps = (dispath) => {
    return {
         fetchAllProducts: ()=>{
             dispath(actFetchAllProductsRequest());
         }
      };
    };
export default connect(null, mapDispathToProps)(DanhSachLoai)
