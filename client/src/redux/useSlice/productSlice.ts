import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteById,
  getAllProduct,
} from "../../services/productService";

type Product = {
  id: number;
  product_name: string;
  price: number;
  from: string;
};

const productSlice = createSlice({
  name: "product",
  initialState: { data: [], status: "", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.pending, (state) => {
        state.status = "Loading"; // Trạng thái chờ, chưa có dữ liệu
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.data = action.payload; // Trả về dữ liệu
        state.status = "Successfully!";
      })
      .addCase(getAllProduct.rejected, (state, action: any) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(deleteById.fulfilled, (state, action: any) => {
        state.data = state.data.filter(
          (pro: Product) => pro.id !== action.payload
        );
      })
      .addCase(createProduct.fulfilled, (state, action: any) => {
        // Đối với reduc toolkit thì không cần phải clone mảng cũ do thư viện immer làm
        state.data.push(action.payload.data);
      });
  },
});

export default productSlice.reducer;

// thunk :
// + pending : Chờ xử lý
// + fulfilled : Thành công và trả về kết quả
// + rejected: Thất bại => trả ra lỗi
