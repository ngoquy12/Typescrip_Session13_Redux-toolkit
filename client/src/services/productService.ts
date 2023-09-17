import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api/axios";

/**
 * Lấy thông tin tất cả product
 */
export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
  async () => {
    try {
      const response = await instance.get("products");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

/**
 * Xóa thông tin một bản ghi theo id
 */
export const deleteById = createAsyncThunk("product/deleteById", (id) => {
  try {
    instance.delete(`products/${id}`);
    return id; // Trả về id vừa xóa
  } catch (error) {
    console.log(error);
  }
});

/**
 * Thêm mới sản phẩm
 */
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    try {
      const response = instance.post("products", product);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
