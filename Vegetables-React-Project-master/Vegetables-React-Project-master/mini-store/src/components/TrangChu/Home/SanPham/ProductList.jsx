import React,{ useEffect } from "react";
import SanPham from "./SanPham";
import { useDispatch, useSelector } from "react-redux";

export default function ProductList() {
  const { products } = useSelector((state) => state.SanPhamReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getProduct();
    return () => {};
  }, []);

  const getProduct = () => {
    dispatch({
      type: "GET_ALL_PRODUCTS_ACTION",
      data: "abc",
    });
  };

  const renderProduct = () => {
    return products.map((sp, i) => {
      return <SanPham key={i} sp={sp} />;
    });
  };

  return (
    <div className="row">
      {renderProduct()}
      {/* <ModalSanPham sp={sp} /> */}
    </div>
  );
}
