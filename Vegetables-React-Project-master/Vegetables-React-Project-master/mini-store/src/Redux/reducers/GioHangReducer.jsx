//Khởi tạo giá trị ban đầu của Store
import * as Types from '../../action/type'
const stateGioHang = {
  gioHang: JSON.parse(localStorage.getItem('carts')) ? JSON.parse(localStorage.getItem('carts')) : []
};

export const GioHangReducer = (state = stateGioHang, action) => {
  switch(action.type){
    case Types.THEM_GIO_HANG:{
      //Xử lý login thêm giỏ hàng
      let gioHangCapNhat = [...state.gioHang];
      let index = gioHangCapNhat.findIndex(spGH => spGH.productid === action.spGioHang.productid);
      if(index !==-1){
        gioHangCapNhat[index].soLuong+=1;
      }else{
        gioHangCapNhat.push(action.spGioHang);
      }
      state.gioHang = gioHangCapNhat;
      localStorage.setItem('carts', JSON.stringify(gioHangCapNhat));
      return {...state};
    }
    case  Types.XOA_GIO_HANG:{    
      let gioHangCapNhat = [...state.gioHang];
      //Xóa giỏ hàng dựa vào Index
      gioHangCapNhat.splice(action.index,1);
      // localStorage.setItem('carts', JSON.stringify(gioHangCapNhat));
      //Gán giỏ hàng mới cho state.GioHang => render lại giao diện
      state.gioHang = gioHangCapNhat;
      return {...state};
    }
    case Types.XOA_GIO_HANG_MASP:{
      // let gioHangCapNhat = [...state.gioHang];
      let gioHangCapNhat = [...state.gioHang].filter(sp => sp.productid !== action.productid);
      //tìm index sp dựa vào masp
      // let index = gioHangCapNhat.findIndex(spGH => spGH.maSP === action.maSP);
      // if(index !==-1){
      //   gioHangCapNhat.splice(action.index,1);
      //   localStorage.setItem('carts', JSON.stringify(gioHangCapNhat));
      // } 
      //Gán giỏ hàng mới cho state.GioHang => render lại giao diện
      localStorage.setItem('carts', JSON.stringify(gioHangCapNhat))
      console.log("GHCN", gioHangCapNhat)
      state.gioHang = gioHangCapNhat;
      return {...state};
    }
    case Types.TANG_GIAM_SL:{
      const{index, tangGiam} = action;
      let gioHangCapNhat = [...state.gioHang];
      if(tangGiam){
        gioHangCapNhat[index].soLuong +=1;
      }else{
        if(gioHangCapNhat[index].soLuong >1){
          gioHangCapNhat[index].soLuong -=1;
        }
      }
      localStorage.setItem('carts', JSON.stringify(gioHangCapNhat))
      state.gioHang = gioHangCapNhat;
      return {...state};
    }
    
  }
  return { ...state }
}
