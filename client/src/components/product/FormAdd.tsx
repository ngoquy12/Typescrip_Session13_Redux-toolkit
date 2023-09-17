import React, { useState } from "react";
import "./form.css";
import { useDispatch } from "react-redux";
import { createProduct } from "../../services/productService";

type Product = {
  id: number;
  product_name: string;
  price: number;
  from: string;
};

const FormAdd: React.FC<{ handleCloseForm: () => void }> = ({
  handleCloseForm,
}) => {
  const dispatch = useDispatch();

  // khai báo state
  const [product, setProduct] = useState({
    product_name: "",
    price: 0,
    from: "",
  });

  // Hàm lấy giá trị từ các ô input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Lấy value và name từ input
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Hàm gửi dữ liệu lên API
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // bắn dispatch gửi dữ liệu lên reducer để xử lý
    dispatch(createProduct(product));
    handleCloseForm();
  };

  return (
    <>
      <div className="form-container">
        <form className="form-item" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="">
              ProductName
            </label>
            <input
              onChange={handleChange}
              name="product_name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="">
              Price
            </label>
            <input
              onChange={handleChange}
              name="price"
              type="number"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="">
              From
            </label>
            <input
              onChange={handleChange}
              name="from"
              type="text"
              className="form-control"
            />
          </div>
          <div className="mt-2 mb-2">
            <button type="submit" className="btn btn-primary">
              Thêm mới
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormAdd;
