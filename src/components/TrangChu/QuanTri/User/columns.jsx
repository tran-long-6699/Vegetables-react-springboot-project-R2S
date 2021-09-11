import { Avatar, Grid } from "@material-ui/core";

export const columns = [
  {
    title: "Username",
    field: "username",
    validate: rowData=>{
      let express = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if(rowData.username===undefined || rowData.username===''){
        return "Vui lòng nhập username";
      }else if(rowData.username.length<10 || !express.test(rowData.username)){
        return "Username không hợp lệ";
      }
      return true;
    }
  },
  {
    title: "Fullname",
    field: "fullname",
    render: (row) => (
      <Grid container alignItems={"center"}>
        <Grid item sm={3}>
          <Avatar>{row.fullname[0]}</Avatar>
        </Grid>
        <Grid item sm={5}>
          {row.fullname}
        </Grid>
      </Grid>
    ),
    validate: rowData=>{
      if(rowData.fullname===undefined || rowData.fullname===''){
        return "Vui lòng nhập họ tên";
      }else if(rowData.fullname.length<5){
        return "Họ tên không hợp lệ";
      }
      return true;
    }
  },
  {
    title: "Activated",
    field: "activated",
    lookup:{
      true: "Active",
      false: "Inactive"
    },
    validate: rowData =>{
      if(rowData.activated === '' || rowData.activated === undefined){
        return "Vui lòng chọn trạng thái kích hoạt"
      }
      return true;
    }
  },
  {
    title: "Gender",
    field: "gender",
    lookup:{
      true: "Male",
      false: "Female"
    },
    validate: rowData =>{
      if(rowData.gender === '' || rowData.gender === undefined){
        return "Vui lòng chọn giới tính"
      }
      return true;
    }
  },
  {
    title: "Create Date",
    field: "createdate",
    editable: "never",
  },
];
