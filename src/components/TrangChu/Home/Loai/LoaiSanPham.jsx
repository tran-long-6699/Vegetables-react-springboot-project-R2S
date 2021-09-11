import React, { Component } from 'react'
import {connect} from 'react-redux';
import {actFetchAllProductsByCategoryRequest} from '../../../../action/index';
class LoaiSanPham extends Component {
    render() {
        let {loai} = this.props;
        return (
            
                <li>
                    <a style={{color:'#228B22', cursor:'pointer'}} onClick={() => this.props.fetchAllProductsByCategory(loai.catid)}>{loai.catname}</a>
                </li>
            
        )
    }
}
const mapStateToProps = state =>{
  return {
    products: state.SanPhamReducer.products
  }
}

const mapDispathToProps = (dispath) =>{
  return {
    fetchAllProductsByCategory: (categoryid)=>{
      dispath(actFetchAllProductsByCategoryRequest(categoryid));
    }
  }
}

  export default connect (mapStateToProps, mapDispathToProps)(LoaiSanPham)