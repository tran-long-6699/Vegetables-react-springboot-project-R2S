import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../../../../service/UserService";
import {login} from '../../../../action/user'
import * as OAuth2 from '../../../../action/OAuth2/index';
import GoogleLogin from 'react-google-login';
import * as Types from '../../../../action/type'

class ModalLogin extends Component {

  handleSubmit = (values) => {
    this.props.dispatch(login(values))
  };

  render() {
    return (
      <div
        className="modal fade"
        id="modelLogin"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">LOGIN</h5>
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
                  username: "",
                  password: "",
                }}
                validationSchema={loginSchema}
                onSubmit={this.handleSubmit}
                render={(formikProps) => (
                  <Form>
                    {/* <GoogleLogin
                      clientId="936587726373-h0icqf42s8igeu9r1c0lehstokqnti59.apps.googleusercontent.com"
                      buttonText="Login"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogle}
                      cookiePolicy={'Auth'}
                    
                    /> */}
                    <div className="row">
                      <div className="form-group col-sm-12">
                        <span className="float-left">Tên đăng nhập</span>
                        <Field
                          type="email"
                          className="form-control"
                          name="username"
                          placeholder="long@gmail.com"
                          onChange={formikProps.handleChange}
                        />
                         <ErrorMessage name="username">
                        {
                          (msg)=> <div className="alert alert-danger">{msg}</div> 
                        }
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-12">
                        <span className="float-left">Mật khẩu</span>
                        <Field
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="*****"
                          onChange={formikProps.handleChange}
                        />
                        <ErrorMessage name="password">
                        {
                          (msg)=> <div className="alert alert-danger">{msg}</div> 
                        }
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className="row container">
                    <button
                          type="submit"
                          className="btn btn-primary btn-lg btn-block"
                          // onClick={() => {
                          //   let data = {
                          //     username: this.state.user.username,
                          //     password: this.state.user.password,
                          //   };
                          //   this.props.login(data);
                          // }}
                        >
                          LOGIN
                        </button>
                    </div>
                  </Form>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(ModalLogin);
