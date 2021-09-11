import React, { Component } from "react";
import DanhSachLoai from "./Home/Loai/DanhSachLoai";
import ProductList from "./Home/SanPham/ProductList";

export default class Home extends Component {
  render() {
    return (
      <div>
        <div
          className="hero-wrap hero-bread"
          style={{ backgroundImage: 'url("./images/bg_1.jpg")' }}
        >
          <div className="container">
            <div className="row no-gutters slider-text align-items-center justify-content-center">
              <div className="col-md-9 ftco-animate text-center">
                <p className="breadcrumbs">
                  <span className="mr-2">
                    <a href="index.html">Home</a>
                  </span>{" "}
                  <span>Products</span>
                </p>
                <h1 className="mb-0 bread">Products</h1>
              </div>
            </div>
          </div>
        </div>

        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-10 mb-5 text-center">
                <ul className="product-category row">
                  
                  <DanhSachLoai />
                </ul>
              </div>
            </div>
            <div>
                {/* <DanhSachSanPham /> */}
                <ProductList />
            </div>
            <div className="row mt-5">
              <div className="col text-center">
                <div className="block-27">
                  <ul>
                    <li>
                      <a href="#">&lt;</a>
                    </li>
                    <li className="active">
                      <span>1</span>
                    </li>
                    <li>
                      <a href="#">2</a>
                    </li>
                    <li>
                      <a href="#">3</a>
                    </li>
                    <li>
                      <a href="#">4</a>
                    </li>
                    <li>
                      <a href="#">5</a>
                    </li>
                    <li>
                      <a href="#">&gt;</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
     
    );
  }
}
