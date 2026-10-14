import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getSalesSummary,
  getOrderSummary,
  getWeeklyOrders,
  getBestSellingCategories,
  getAnnualRevenue,
  getMonthlyRevenue,
} from "../../services/analyticsServices";

interface SalesSummary {
  today: number;
  yesterday: number;
  thisMonth: number;
  allTime: number;
}

interface OrderSummary {
  today: number;
  pending: number;
  delivered: number;
}

interface WeeklyOrder {
  date: string;
  total: number;
  cancelled: number;
  delivered: number;
}

interface BestSellingCategory {
  name: string;
  count: number;
  percentage: number;
}

interface AnnualRevenue {
  year: number;
  revenue: number;
}

interface MonthlyRevenue {
  month: string;
  revenue: number;
}

interface AnalyticsState {
  sales: SalesSummary;
  orders: OrderSummary;
  weeklyOrders: WeeklyOrder[];
  bestSellingCategories: BestSellingCategory[];
  annualRevenue: AnnualRevenue[];
  monthlyRevenue: MonthlyRevenue[];
  loading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  sales: {
    today: 0,
    yesterday: 0,
    thisMonth: 0,
    allTime: 0,
  },
  orders: {
    today: 0,
    pending: 0,
    delivered: 0,
  },
  weeklyOrders: [],
  bestSellingCategories: [],
  annualRevenue: [],
  monthlyRevenue: [],
  loading: false,
  error: null,
};

export const fetchDashboardAnalytics = createAsyncThunk<
  Omit<AnalyticsState, "loading" | "error">,
  void,
  { rejectValue: string }
>("analytics/fetchDashboardAnalytics", async (_, { rejectWithValue }) => {
  try {
    const [
      sales,
      orders,
      weeklyOrders,
      bestSellingCategories,
      annualRevenue,
      monthlyRevenue,
    ] = await Promise.all([
      getSalesSummary(),
      getOrderSummary(),
      getWeeklyOrders(),
      getBestSellingCategories(),
      getAnnualRevenue(),
      getMonthlyRevenue(new Date().getFullYear()),
    ]);

    return {
      sales,
      orders,
      weeklyOrders,
      bestSellingCategories,
      annualRevenue,
      monthlyRevenue,
    };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch dashboard analytics.",
    );
  }
});

export const fetchMonthlyRevenue = createAsyncThunk<
  MonthlyRevenue[],
  number,
  { rejectValue: string }
>("analytics/fetchMonthlyRevenue", async (year, { rejectWithValue }) => {
  try {
    return await getMonthlyRevenue(year);
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch monthly revenue.",
    );
  }
});

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload.sales;
        state.orders = action.payload.orders;
        state.weeklyOrders = action.payload.weeklyOrders;
        state.bestSellingCategories = action.payload.bestSellingCategories;
        state.annualRevenue = action.payload.annualRevenue;
        state.monthlyRevenue = action.payload.monthlyRevenue;
      })
      .addCase(fetchDashboardAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch dashboard analytics.";
      })
      .addCase(fetchMonthlyRevenue.fulfilled, (state, action) => {
        state.monthlyRevenue = action.payload;
      });
  },
});

export default analyticsSlice.reducer;
