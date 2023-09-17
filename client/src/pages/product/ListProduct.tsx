import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteById, getAllProduct } from "./../../services/productService";
import FormAdd from "../../components/product/FormAdd";
import FormEdit from "../../components/product/FormEdit";

type Product = {
  id: number;
  product_name: string;
  price: number;
  from: string;
};

const ListProduct: React.FC<{}> = () => {
  const listProduct = useSelector((state: any) => state.products.data);
  const dispatch = useDispatch();
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(0);

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  // Xóa thông tin 1 bản ghi theo id
  const handleDelete = (id: number) => {
    dispatch(deleteById(id));
  };

  // Hàm hiển thị form thêm mới
  const handleShowForm = () => {
    setShowAdd(true);
  };

  // Hàm hiển thị form thêm mới
  const handleCloseForm = (): void => {
    setShowAdd(false);
  };

  // hàm edit product
  const handleShowEdit = (id: number) => {
    setShowEdit(true);
    setIdEdit(id);
  };

  return (
    <>
      {/* Form thêm mới */}
      {showAdd && <FormAdd handleCloseForm={handleCloseForm} />}

      {/* Form chỉnh sửa */}
      {showEdit && <FormEdit idEdit={idEdit} />}

      <h3>List Product</h3>
      <button onClick={handleShowForm} className="btn btn-primary mb-2">
        Thêm mới sản phẩm
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ProductName</th>
            <th scope="col">Price</th>
            <th scope="col">From</th>
            <th scope="col" colSpan={2}>
              Option
            </th>
          </tr>
        </thead>
        <tbody>
          {listProduct.map((product: Product, index: number) => (
            <tr key={product.id}>
              <th>{index + 1}</th>
              <td>{product.product_name}</td>
              <td>{product.price}</td>
              <td>{product.from}</td>
              <td>
                <button
                  onClick={() => handleShowEdit(product.id)}
                  className="btn btn-warning"
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListProduct;
