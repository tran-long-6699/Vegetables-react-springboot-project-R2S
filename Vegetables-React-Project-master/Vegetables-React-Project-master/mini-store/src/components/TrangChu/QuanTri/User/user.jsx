import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from 'material-table';
import * as Action from '../../../../action/UserAction/user';
import * as columns from './columns';

export default function User(props) {
    const dispatch = useDispatch();
    const {users} = useSelector(state => state.UserReducer);

    const getAllUsers = () =>{
        dispatch({
            type: Action.GET_ALL_USERS_MANAGER_ACTION,
            users
        })
    }
    
      useEffect(()=>{
        getAllUsers();
        console.log("USERS", users)
      },[])

    return (
         <div className="container">
      <MaterialTable
        title="Users Data"
        data={users}
        columns={columns.columns}
        options ={{actionsColumnIndex:-1, addRowPosition:"first"}}
        editable={{
            onRowAdd: (newData)=> new Promise((resolve, reject)=>{
                if(newData.activated !== true || newData.activated !==false){
                    newData.activated = true;
                }
                dispatch({
                    type: Action.ADD_USER_ACTION,
                    user: newData
                }) 
                getAllUsers();
                resolve();
            }),
            onRowUpdate: (newData, oldData)=>new Promise((resolve, reject)=>{
                dispatch({
                    type: Action.UPDATE_USER_ACTION,
                    user: newData
                }) 
                resolve(); 
            }),
            onRowDelete: (oldData)=>new Promise((resolve, reject)=>{
                dispatch({
                    type: Action.DELETE_USER_ACTION,
                    user: oldData
                })
                resolve();
            })
        }}
      />
    </div>
    )
}
