import React, { useState, useEffect } from "react";
import "./form.css";
import { useDispatch, useSelector } from "react-redux";

type Product = {
  id: number;
  product_name: string;
  price: number;
  from: string;
};

const FormEdit: React.FC<{ idEdit: number }> = ({ idEdit }) => {
  const listProduct = useSelector((state: any) => state.products.data);
  const dispatch = useDispatch();

  const getById = () => {
    const product = listProduct.find((pro: Product) => pro.id === idEdit);
    setProduct(product);
  };

  useEffect(() => {
    getById();
  }, []);

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
  };

  return (
    <>
      <div className="form-container">
        <form className="form-item" onSubmit={handleSubmit}>
          <h3>Cập nhật sản phẩm</h3>
          <div className="form-group text-start">
            <label className="form-label" htmlFor="">
              ProductName
            </label>
            <input
              onChange={handleChange}
              name="product_name"
              value={product.product_name}
              type="text"
              className="form-control "
            />
          </div>
          <div className="form-group text-start">
            <label className="form-label" htmlFor="">
              Price
            </label>
            <input
              onChange={handleChange}
              name="price"
              value={product.price}
              type="number"
              className="form-control"
            />
          </div>
          <div className="form-group text-start">
            <label className="form-label" htmlFor="">
              From
            </label>
            <input
              onChange={handleChange}
              name="from"
              value={product.from}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mt-2 mb-2">
            <button type="submit" className="btn btn-primary">
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormEdit;
