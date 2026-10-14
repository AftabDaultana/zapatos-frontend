import api from "../api/axios";

export const getSalesSummary = async () => {
  const response = await api.get("/admin/analytics/sales-summary");
  return response.data.data;
};

export const getOrderSummary = async () => {
  const response = await api.get("/admin/analytics/order-summary");
  return response.data.data;
};

export const getWeeklyOrders = async () => {
  const response = await api.get("/admin/analytics/weekly-orders");
  return response.data.data;
};

export const getBestSellingCategories = async () => {
  const response = await api.get("/admin/analytics/best-selling-categories");
  return response.data.data;
};

export const getAnnualRevenue = async () => {
  const response = await api.get("/admin/analytics/annual-revenue");
  return response.data.data;
};

export const getMonthlyRevenue = async (year?: number) => {
  const response = await api.get("/admin/analytics/monthly-revenue", {
    params: year ? { year } : {},
  });

  return response.data.data;
};
