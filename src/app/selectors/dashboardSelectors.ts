import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const selectSalesOverview = createSelector(
  [(state: RootState) => state.analytics.sales],
  (sales) => ({
    todaySale: sales.today,
    yesterdaySale: sales.yesterday,
    monthSale: sales.thisMonth,
    allTimeSale: sales.allTime,
  }),
);

export const selectOrderStats = createSelector(
  [(state: RootState) => state.analytics.orders],
  (orders) => ({
    todayOrders: orders.today,
    pendingOrders: orders.pending,
    deliveredOrders: orders.delivered,
  }),
);
