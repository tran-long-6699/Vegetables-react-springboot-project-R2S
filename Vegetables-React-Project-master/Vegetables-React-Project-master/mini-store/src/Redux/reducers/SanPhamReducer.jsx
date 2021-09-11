import * as Types from './../../const/ActionTypes';
//Khởi tạo giá trị ban đầu của Store
const stateSanPham = {
    products: []
  };
  
  export const SanPhamReducer = (state = stateSanPham, action) => {
    switch(action.type){
      case Types.LOAD_PRODUCT_BY_CATEGORY:{  
        let data = action.products;
        state.products =data;
        console.log("REDUCER", data)
        return {...state};
      }
      case Types.GET_ALL_PRODUCTS:{
        let data = action.products;
          state.products = data;
          console.log("REDUCER", data)
          return {...state};
      }
      default:{
        return { ...state }
      }
    }
    
  }
  