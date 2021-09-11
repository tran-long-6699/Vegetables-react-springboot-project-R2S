import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import { checkoutSchema } from "../../../../service/CheckoutService";
import { checkout } from "../../../../action/checkout";

class Checkout extends Component {
  handleSubmit = (values) => {
    console.log(values);
    this.props.dispatch(checkout(values))
  };


  render() {
    return (
      <div
        className="modal fade"
        id="modelCheckout"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modelCheckout"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">THANH TOÁN</h5>
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
              <Formik
                initialValues={{
                  fullname: "",
                  phone: "",
                  address: "",
                  modeofpayment: "ATM",
                  subtotal: this.props.gioHang
                    ? this.props.gioHang.reduce((sub, sp, i) => {
                        return sub += Number(sp.priceaverage * sp.soLuong);
                      },0)
                    : 0,
                  total: this.props.gioHang
                    ? this.props.gioHang.reduce((total, sp, i) => {
                      return total += Number(sp.priceaverage * sp.soLuong);
                      },0)
                    : 0,
                  orderDetails: this.props.gioHang,
                }}
                validationSchema={checkoutSchema}
                onSubmit={this.handleSubmit}
                render={(formikProps) => (
                  <Form>
                    <div className="row">
                      <div className="form-group col-sm-12">
                        <span className="float-left">Họ tên</span>
                        <Field
                          type="text"
                          className="form-control"
                          name="fullname"
                          placeholder="Trần Long"
                          onChange={formikProps.handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-12">
                        <span className="float-left">Số điện thoại</span>
                        <Field
                          type="text"
                          className="form-control"
                          name="phone"
                          placeholder="0702362681"
                          onChange={formikProps.handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-12">
                        <span className="float-left">Địa chỉ</span>
                        <Field
                          type="text"
                          className="form-control"
                          name="address"
                          placeholder="288 Nguyễn Văn Linh - Ninh Kiều - Cần Thơ"
                          onChange={formikProps.handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-12">
                        <span className="float-left">
                          Phương thức thanh toán
                        </span>
                        <Field
                          className="form-control"
                          name="modeofpayment"
                          onChange={formikProps.handleChange}
                          as="select"
                        >
                          <option value={"COD"}>COD</option>
                          <option value={"ATM"}>ATM</option>
                        </Field>
                      </div>
                    </div>
                    <div className="row container">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                      >
                        THANH TOÁN
                      </button>
                    </div>
                  </Form>
                )}
              ></Formik>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    gioHang: state.GioHangReducer.gioHang,
  };
};
export default connect(mapStateToProps, null)(Checkout);
