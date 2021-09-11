import Axios from "axios";
import * as System from "../libs/const/system";

const PROVIDER_API_URL = System.DOMAIN+'/veg/admin/provider';

class ProviderService{
    getAllProviders(){
        return Axios({
          method:'GET',
          url: PROVIDER_API_URL,
          headers: {
            Authorization: JSON.parse(localStorage.getItem('credentials')).accesstoken
          }
        })
      }
  
      addProvider(provider){
        return Axios({
          method:"POST",
          url: PROVIDER_API_URL,
          data: provider,
          headers: {
            Authorization: JSON.parse(localStorage.getItem('credentials')).accesstoken
          }
        })
      }
  
      updateProvider(provider){
        return Axios({
          method:'PUT',
          url: `${PROVIDER_API_URL}/${provider.providerid}`,
          data: provider,
          headers: {
            Authorization: JSON.parse(localStorage.getItem('credentials')).accesstoken
          }
        })
      }
  
      deleteProvider(provider){
        return Axios({
          method: 'DELETE',
          url: `${PROVIDER_API_URL}/${provider.providerid}`,
          headers:{
            Authorization: JSON.parse(localStorage.getItem('credentials')).accesstoken
          }
        })
      }
}
export const providerService = new ProviderService();