import React, { Component } from "react";
import GioHang from "./Home/GioHang/GioHang";
import ModalLogin from "./Home/Login/ModalLogin";
import { connect } from "react-redux";
import Checkout from "./Home/ThanhToan/Checkout";
import { NavLink } from "react-router-dom";
import * as Types from "../../const/ActionTypes";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        password: "",
      },
      loggedIn: false,
    };
  }

  renderAdmin = () => {
    const { credentials } = this.props;
    if (this.props.credentials) {
      let admin = credentials.roles ? credentials.roles.find((r) => r === "ROLE_ADMIN") : null;
      console.log("Admin", admin);
      if (admin) {
        return (
        <>
          <NavLink className="dropdown-item" to="/admin/provider">
              Provider
            </NavLink>
            <NavLink className="dropdown-item" to="/admin/users">
              User
            </NavLink>
            <NavLink className="dropdown-item" to="/admin/authorities">
              Authorities
            </NavLink>
        </>
        );
      } else {
        return "";
      }
    }
  };

  renderLogin = () => {
    if (this.props.credentials) {
      return (
        <li className="nav-item">
          <a
            data-toggle="modal"
            data-target="#modelLogin"
            className="nav-link"
            style={{ cursor: "pointer" }}
          >
            Login
          </a>
        </li>
      );
    } else {
      return "";
    }
  };

  renderCheckout = () => {
    const { credentials } = this.props;
    if (credentials) {
      const customer = credentials.roles ? credentials.roles.find((r) => r === "ROLE_USER") : null;
      if (customer) {
        return (
          <li className="nav-item active">
            <a
              href="index.html"
              className="nav-link"
              data-toggle="modal"
              data-target="#modelCheckout"
            >
              Check Out
            </a>
          </li>
        );
      } else {
        return "";
      }
    }
  };

  render() {
    return (
      <div>
        <div className="py-1 bg-primary">
          <div className="container">
            <div className="row no-gutters d-flex align-items-start align-items-center px-md-0">
              <div className="col-lg-12 d-block">
                <div className="row d-flex">
                  <div className="col-md pr-4 d-flex topper align-items-center">
                    <div className="icon mr-2 d-flex justify-content-center align-items-center">
                      <span className="icon-phone2" />
                    </div>
                    <span className="text">+ 84 702362681</span>
                  </div>
                  <div className="col-md pr-4 d-flex topper align-items-center">
                    <div className="icon mr-2 d-flex justify-content-center align-items-center">
                      <span className="icon-paper-plane" />
                    </div>
                    <span className="text">longtpc01189@fpt.edu.vn</span>
                  </div>
                  <div className="col-md-5 pr-4 d-flex topper align-items-center text-lg-right">
                    <span className="text">
                      3-5 Business days delivery &amp; Free Returns
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav
          className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
          id="ftco-navbar"
        >
          <div className="container">
            <a className="navbar-brand" href="index.html">
              Vegefoods
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#ftco-nav"
              aria-controls="ftco-nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="oi oi-menu" /> Menu
            </button>
            <div className="collapse navbar-collapse" id="ftco-nav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink
                    to="/home"
                    activeClassName="active"
                    className="nav-link"
                  >
                    Home
                  </NavLink>
                </li>
                {this.props.credentials ? (
                  <li class="nav-item active dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      MENU
                    </a>
                    <div class="dropdown-menu" aria-labelledby="dropdown04">
                      {this.renderAdmin()}
                      <NavLink
                        to="/home"
                        className="dropdown-item"
                        onClick={() => this.props.logout()}
                      >
                        Logout
                      </NavLink>
                    </div>
                  </li>
                ) : (
                  ""
                )}
                
                {this.renderCheckout()}
                <li className="nav-item cta cta-colored">
                  <a
                    href="cart.html"
                    data-toggle="modal"
                    data-target="#modelId"
                    className="nav-link"
                  >
                    <span className="icon-shopping_cart" />[
                    {this.props.tongSoLuong}]
                  </a>
                </li>
                {this.props.credentials ? (
                  <li className="nav-item">
                    <a className="nav-link" style={{ cursor: "pointer" }}>
                      Hi, {this.props.credentials.fullname}
                    </a>
                  </li>
                ) : (
                  <li className="nav-item">
                    <a
                      data-toggle="modal"
                      data-target="#modelLogin"
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                    >
                      Login
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <ModalLogin />
        <GioHang />
        <Checkout />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //state: là store tổng, => truy xuất đến GioHangReducer
  //=> biến state trên GioHangReducer
  return {
    tongSoLuong: state.GioHangReducer.gioHang
      .map((item) => item.soLuong)
      .reduce((total, soLuong) => (total += soLuong), 0),
    credentials: state.LoginReducer.credentials,
  };
};

const mapDispathToProps = (dispath) => {
  return {
    logout: () => {
      const action = {
        type: Types.LOGOUT,
      };
      dispath(action);
    },
  };
};

export default connect(mapStateToProps, mapDispathToProps)(Header);
