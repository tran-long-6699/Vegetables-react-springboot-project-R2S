
import Axios from 'axios';
import * as yup from "yup";
import * as system from '../libs/const/system';

const LOGIN_API_URL = system.DOMAIN+'/api/login';
const USER_API_URL = system.DOMAIN+'/veg/admin/users';
export const loginSchema = yup.object().shape({
    username: yup
      .string()
      .required("Vui lòng nhập tên đăng nhập")
      .email("Không đúng định dạng mail"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
  });


class UserService {
    
    signIn(user){
      console.log(user)
      return Axios({
        method: "POST",
        url: LOGIN_API_URL,
        data:user
      })
    }

    getAllUsers(){
      return Axios({
        method:'GET',
        url: USER_API_URL,
        headers: {
          Authorization: JSON.parse(localStorage.getItem('credentials')).accesstoken
        }
      })
    }

    getUserByUsername(user){
      return Axios({
        method:'GET',
        url: `${USER_API_URL}/${user.username}`,
        headers: {
          Authorization: JSON.parse(localStorage.getItem('credentials')).accesstoken
        }
      })
    }

    addUser(user){
      return Axios({
        method:"POST",
        url: USER_API_URL,
        data: user,
        headers: {
          Authorization: JSON.parse(localStorage.getItem('credentials')).accesstoken
        }
      })
    }

    updateUser(user){
      return Axios({
        method:'PUT',
        url: `${USER_API_URL}/${user.username}`,
        data: user,
        headers: {
          Authorization: JSON.parse(localStorage.getItem('credentials')).accesstoken
        }
      })
    }

    deleteUser(user){
      return Axios({
        method: 'DELETE',
        url: `${USER_API_URL}/${user.username}`,
        headers:{
          Authorization: JSON.parse(localStorage.getItem('credentials')).accesstoken
        }
      })
    }
}
export default UserService;