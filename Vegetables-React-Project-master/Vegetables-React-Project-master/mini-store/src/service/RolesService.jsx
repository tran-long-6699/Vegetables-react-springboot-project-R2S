import Axios from "axios";
import * as System from "../libs/const/system";
const ROLES_API_URL = System.DOMAIN + "/veg/admin/roles";

export class RolesService {
  getAllRolesAPI = () => {
    return Axios({
      url: ROLES_API_URL,
      method: "GET",
      headers: {
        Authorization: JSON.parse(localStorage.getItem("credentials"))
          .accesstoken,
      },
    });
  };
}
export const rolesService = new RolesService();
