import React, {useEffect} from 'react'
import MaterialTable from 'material-table';
import * as Types from '../../../../action/ProviderAction/provider';
import * as column from './column';
import { useDispatch, useSelector } from "react-redux";

export default function Provider() {
  const dispatch = useDispatch();
  const {providers} = useSelector(state => state.ProviderReducer);

  const getAllProviders = ()=>{
     dispatch({
         type: Types.GET_ALL_PROVIDERS_ACTION
     })
  }

  useEffect(()=>{
    getAllProviders();
  },[])

  return (
    <div className="container">
      <MaterialTable
        title="Provider Data"
        data={providers}
        columns={column.columns}
        options ={{actionsColumnIndex:-1, addRowPosition:"first"}}
        editable={{
            onRowAdd: (newData)=> new Promise((resolve, reject)=>{
                dispatch({
                    type: Types.ADD_PROVIDER_ACTION,
                    provider: newData
                })
                resolve();
            }),
            onRowUpdate: (newData, oldData)=>new Promise((resolve, reject)=>{
                dispatch({
                    type: Types.UPDATE_PROVIDER_ACTION,
                    provider: newData
                })
                resolve();
            }),
            onRowDelete: (oldData)=>new Promise((resolve, reject)=>{
                dispatch({
                    type: Types.DELETE_PROVIDER_ACTION,
                    provider: oldData
                })
                resolve();
            })
        }}
      />
    </div>
  )

}
