import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Order } from "../../types/order";
import {
  getCurrentUserOrders,
  getOrderById,
} from "../../services/orderServices";

interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

export const fetchCurrentUserOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>("order/fetchCurrentUserOrders", async (_, { rejectWithValue }) => {
  try {
    return await getCurrentUserOrders();
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch orders",
    );
  }
});

export const fetchOrderById = createAsyncThunk<
  Order,
  string,
  { rejectValue: string }
>("order/fetchOrderById", async (id, { rejectWithValue }) => {
  try {
    return await getOrderById(id);
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch order",
    );
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{
        orderId: string;
        status: Order["status"];
      }>,
    ) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find((order) => order._id === orderId);
      if (order) {
        order.status = status;
        localStorage.setItem("orders", JSON.stringify(state.orders));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchCurrentUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch orders.";
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedOrder = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch order.";
        state.selectedOrder = null;
      });
  },
});

export const { addOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
