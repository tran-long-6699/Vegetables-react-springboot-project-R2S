import React from 'react'
import axios from 'axios';
import {history} from '../../../../libs/history';
const GET_TOKEN_API_URL = 'http://localhost:8080/api/login/get-token';
export default function GetToken() {
    const getToken= ()=>{
        axios.get(GET_TOKEN_API_URL).then(resp=>{
            console.log(resp)
            // history.replace("/home")
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div>
            {getToken()}
        </div>
    )
}
