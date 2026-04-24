import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Invoice, Vendor, Alert, GSTSummary } from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["Invoices", "Vendors", "Alerts", "Summary"],
  endpoints: (build) => ({
    getInvoices: build.query<Array<Invoice>, void>({
      query: () => "invoice/invoices/",
      providesTags: ["Invoices"],
    }),
    getVendors: build.query<Array<Vendor>, void>({
      query: () => "vendor/vendors/",
      providesTags: ["Vendors"],
    }),
    getAlerts: build.query<Array<Alert>, void>({
      query: () => "alert/alerts/",
      providesTags: ["Alerts"],
    }),
    getGSTSummary: build.query<GSTSummary, void>({
      query: () => "summary/gst-summary/",
      providesTags: ["Summary"],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetVendorsQuery,
  useGetAlertsQuery,
  useGetGSTSummaryQuery,
} = api;
