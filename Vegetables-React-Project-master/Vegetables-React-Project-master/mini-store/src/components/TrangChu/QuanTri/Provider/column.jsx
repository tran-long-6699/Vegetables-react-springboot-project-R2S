export const columns = [
  {
    title: "Provider id",
    field: "providerid",
    editable: "never",
  },
  {
    title: "Provider Name",
    field: "providername",
    validate: rowData =>{
        if(rowData.providername === '' || rowData.providername === undefined){
            return "Vui lòng nhập tên nhà cung cấp"
        }
        return true;
    }
  },
  {
    title: "Phone",
    field: "phone",
    validate: rowData =>{
        let expression = /((09|03|07|08|05)+([0-9]{8})\b)/g
        if(rowData.phone === '' || rowData.phone === undefined){
            return "Vui lòng nhập số điện thoại"
        }else if(!expression.test(rowData.phone)){
            return "Số điện thoại không hợp lệ";
        }
        return true;
    }
  },
  {
    title: "Address",
    field: "address",
    validate: rowData =>{
        if(rowData.address === '' || rowData.address === undefined){
            return "Vui lòng nhập địa chỉ"
        }
        return true;
    }
  },
];
