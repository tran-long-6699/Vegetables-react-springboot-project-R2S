import Axios from "axios";
import * as System from "../libs/const/system";

const AUTHORITIES_API_URL = System.DOMAIN + "/veg/admin/authorities";
const USERS_API_URL = System.DOMAIN + "/veg/admin/users";
export class AuthoritiesService {
  getAllAuthoritiesAPI() {
    return Axios({
      url: AUTHORITIES_API_URL,
      method: "GET",
      headers: {
        Authorization: JSON.parse(localStorage.getItem("credentials"))
          .accesstoken,
      }
    });
  }

  addAuthoritiesAPI(authorities) {
    return Axios({
      url: AUTHORITIES_API_URL,
      method: "POST",
      data: authorities,
      headers: {
        Authorization: JSON.parse(localStorage.getItem("credentials"))
          .accesstoken,
      },
    });
  }
  
  deleteAuthoritiesAPI(authorities) {
    return Axios({
      url: `${AUTHORITIES_API_URL}/${authorities.id}`,
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(localStorage.getItem("credentials"))
          .accesstoken,
      },
    });
  }

  getAllUsersAPI() {
    return Axios({
      url: USERS_API_URL,
      method: "GET",
      headers: {
        Authorization: JSON.parse(localStorage.getItem("credentials"))
          .accesstoken,
      },
    });
  }
}
export const authoritiesService = new AuthoritiesService();
