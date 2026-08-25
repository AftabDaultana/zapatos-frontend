import type { RootState } from "../store";

const activeOrders = (state: RootState) =>
  state.order.orders.filter((order) => order.status !== "cancelled");

const isSameDay = (dateString: string, targetDate: Date) => {
  const orderDate = new Date(dateString);

  return (
    orderDate.getFullYear() === targetDate.getFullYear() &&
    orderDate.getMonth() === targetDate.getMonth() &&
    orderDate.getDate() === targetDate.getDate()
  );
};

const isSameMonth = (dateString: string, targetDate: Date) => {
  const orderDate = new Date(dateString);

  return (
    orderDate.getFullYear() === targetDate.getFullYear() &&
    orderDate.getMonth() === targetDate.getMonth()
  );
};

const getRevenue = (orders: RootState["order"]["orders"]) =>
  orders.reduce((total, order) => total + order.total, 0);

export const selectSalesOverview = (state: RootState) => {
  const orders = activeOrders(state);
  const today = new Date();

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const todaySale = getRevenue(
    orders.filter((order) => isSameDay(order.createdAt, today)),
  );

  const yesterdaySale = getRevenue(
    orders.filter((order) => isSameDay(order.createdAt, yesterday)),
  );

  const monthSale = getRevenue(
    orders.filter((order) => isSameMonth(order.createdAt, today)),
  );

  const allTimeSale = getRevenue(orders);

  return {
    todaySale,
    yesterdaySale,
    monthSale,
    allTimeSale,
  };
};

export const selectOrderStats = (state: RootState) => {
  const orders = state.order.orders;

  const activeOrders = orders.filter((order) => order.status !== "cancelled");

  const today = new Date();

  const todayOrders = activeOrders.filter((order) =>
    isSameDay(order.createdAt, today),
  ).length;

  const pendingOrders = activeOrders.filter(
    (order) => order.status === "pending",
  ).length;

  const deliveredOrders = activeOrders.filter(
    (order) => order.status === "delivered",
  ).length;

  return {
    todayOrders,
    pendingOrders,
    deliveredOrders,
  };
};
