import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Order } from "../../types/order";
import {
  getAllOrders,
  getCurrentUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} from "../../services/orderServices";
import type { GetAllOrdersParams } from "../../services/orderServices";

interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  cancelling: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    totalOrders: number;
    totalPages: number;
  };
}

const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  cancelling: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    totalOrders: 0,
    totalPages: 0,
  },
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

export const fetchAllOrders = createAsyncThunk<
  Awaited<ReturnType<typeof getAllOrders>>,
  GetAllOrdersParams | undefined,
  { rejectValue: string }
>("order/fetchAllOrders", async (params, { rejectWithValue }) => {
  try {
    return await getAllOrders(params);
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch all orders.",
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

export const updateOrderStatusThunk = createAsyncThunk<
  Order,
  { orderId: string; status: Order["status"] },
  { rejectValue: string }
>(
  "order/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      return await updateOrderStatus(orderId, status);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update order status.",
      );
    }
  },
);

export const cancelOrderThunk = createAsyncThunk<
  Order,
  string,
  { rejectValue: string }
>("order/cancelOrder", async (orderId, { rejectWithValue }) => {
  try {
    const response = await cancelOrder(orderId);
    return response.data as Order;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to cancel order.",
    );
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
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
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch all orders.";
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
      })
      .addCase(updateOrderStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;

        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id,
        );

        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update order status.";
      })
      .addCase(cancelOrderThunk.pending, (state) => {
        state.cancelling = true;
        state.error = null;
      })
      .addCase(cancelOrderThunk.fulfilled, (state, action) => {
        state.cancelling = false;

        const cancelledOrder = action.payload;

        const index = state.orders.findIndex(
          (order) => order._id === cancelledOrder._id,
        );

        if (index !== -1) {
          state.orders[index] = cancelledOrder;
        }

        if (state.selectedOrder?._id === cancelledOrder._id) {
          state.selectedOrder = cancelledOrder;
        }
      })
      .addCase(cancelOrderThunk.rejected, (state, action) => {
        state.cancelling = false;
        state.error = action.payload ?? "Failed to cancel order.";
      });
  },
});

export default orderSlice.reducer;
