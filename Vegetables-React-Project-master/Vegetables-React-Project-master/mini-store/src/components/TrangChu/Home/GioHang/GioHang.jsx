import React, { Component } from "react";
import { connect } from "react-redux";
class GioHang extends Component {
  renderGioHang = () => {
    return this.props.gioHang.map((sp, i) => {
      return (
        <tr key={i}>
          <td>
            <img src={"./images/product/" + sp.image} width={50} height={50} />
          </td>
          <td>{sp.productid}</td>
          <td>{sp.productname}</td>
          <td>{sp.priceaverage.toLocaleString()}</td>
          <td>
            <button
              className="btn btn-default"
              onClick={() => this.props.tangGiamSoLuong(i, true)}
            >
              +
            </button>
            {sp.soLuong}
            <button
              className="btn btn-default"
              onClick={() => this.props.tangGiamSoLuong(i, false)}
            >
              -
            </button>
          </td>
          <td>{(sp.priceaverage * sp.soLuong).toLocaleString()}</td>
          <td className="product-remove">
            <label onClick={() => this.props.xoaGioHangMaSP(sp.productid)}>
              <span className="ion-ios-close"></span>
            </label>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div
        className="modal fade"
        id="modelId"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div
          className="modal-dialog"
          role="document"
          style={{ maxWidth: "1300px", width: "1300px" }}
        >
          <div
            className="modal-content"
            style={{ maxWidth: "1300px", width: "1300px" }}
          >
            <div className="modal-header">
              <h5 className="modal-title">Giỏ Hàng</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <table className="table ">
                <thead className="thead-primary">
                  <tr className="text-center">
                    <th>&nbsp;</th>
                    <th>Product id</th>
                    <th>Product name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>{this.renderGioHang()}</tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4"></td>
                    <td>Total</td>
                    <td>
                      {this.props.gioHang
                        .reduce((tongTien, sp, i) => {
                          return (tongTien += sp.priceaverage * sp.soLuong);
                        }, 0)
                        .toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //state: là store tổng, => truy xuất đến GioHangReducer
  //=> biến state trên GioHangReducer

  return {
    gioHang: state.GioHangReducer.gioHang, //=>Tạo ra 1 lớp của COmponent ModalGioHangRedux
  };
};

const mapDispathToProps = (dispath) => {
  return {
    xoaGioHangIndex: (index) => {
      const action = {
        type: "XOA_GIO_HANG",
        index,
      };
      console.log(action);
      //Đưa action lên Reducer
      dispath(action);
    },
    xoaGioHangMaSP: (productid) => {
      const action = {
        type: "XOA_GIO_HANG_MASP",
        productid,
      };
      console.log(action);
      //Đưa action lên Reducer
      dispath(action);
    },
    tangGiamSoLuong: (index, tangGiam) => {
      const action = {
        type: "TANG_GIAM_SL",
        index,
        tangGiam,
      };
      dispath(action);
    },
  };
};
export default connect(mapStateToProps, mapDispathToProps)(GioHang);
