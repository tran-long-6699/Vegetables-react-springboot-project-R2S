// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";

// export default function SagaComponent(props) {
//   const dispatch = useDispatch();

//   const { products } = useSelector((state) => state.SanPhamReducer);

//   useEffect(() => {
//     getProduct();
//     return () => {};
//   }, []);

//   const getProduct = () => {
//     dispatch({
//       type: "GET_ALL_PRODUCTS_ACTION",
//       data: "abc",
//     });
//   };

//   const repeat = () => {
//     products.map((item, i) => {
//       return (
//         <div className="card" key={i}>
//           <img className="card-img-top" src="holder.js/100x180/" alt="123" />
//           <div className="card-body">
//             <h4 className="card-title">{item.productname}</h4>
//             <p className="card-text">{item.priceaverage}</p>
//           </div>
//         </div>
//       );
//     });
//   };

//   return (
//     <div>
//       <button
//         className="btn btn-success"
//         onClick={() =>
//           dispatch({
//             type: "getTaskApiAction",
//           })
//         }
//       >
//         LOGIN
//       </button>

//     </div>
//   );
// }
