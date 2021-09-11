import Axios from 'axios';
import * as yup from "yup";
import * as system from '../libs/const/system'

const CHECKOUT_API_URL = system.DOMAIN+"/veg/customer/checkout";
export const checkoutSchema = yup.object().shape({
    fullname: yup
      .string()
      .required("Vui lòng nhập họ tên"),
    phone: yup.string().required("Vui lòng nhập số điện thoại"),
    address: yup.string().required("Vui lòng nhập địa chỉ")
  });

class CheckoutService{
    checkout(data){
        return Axios({
            method:"POST",
            url: CHECKOUT_API_URL,
            data: data,
            headers: {
                Authorization: JSON.parse(localStorage.getItem('credentials')).accesstoken
            }
        });
    }
}

export default CheckoutService;