// import React, { Component } from 'react'
// import SanPham from './SanPham'
// import {connect} from 'react-redux';
// import { actFetchAllProductsRequest, actFetchAllProductsByCategoryRequest, } from '../../../../action/index';
// class DanhSachSanPham extends Component {

//     componentDidMount() {
//         this.props.fetchAllProducts();    
//     }

//     renderProduct = ()=>{
//        return this.props.products.map((sp, i) => {
//                 return (
//                   <SanPham key={i} sp={sp} />
//                 );
//               });
//     }

//     render() {   
//         return (
//             <div className="row">
//                 {this.renderProduct()}
//                 {/* <ModalSanPham sp={sp} /> */}
//             </div>
//         )
//     }
// }
// const mapStateToProps = state =>{
//     return {
//         products: state.SanPhamReducer.products
//     }
// }

// const mapDispathToProps = (dispath) => {
//     return {
//          fetchAllProducts: ()=>{
//              dispath(actFetchAllProductsRequest());
//          },
//          fetchAllProductsByCategory:(categoryid)=>{
//              dispath(actFetchAllProductsByCategoryRequest(categoryid));
//          }
//       };
//     };
// export default connect(mapStateToProps, mapDispathToProps)(DanhSachSanPham);