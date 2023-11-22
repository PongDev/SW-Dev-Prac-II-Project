import ky from "ky";
import {
  CreateBookingRequest,
  CreateBookingResponse,
  DeleteBookingResponse,
  GetBookingResponse,
  GetBookingsResponse,
  UpdateBookingRequest,
  UpdateBookingResponse,
} from "./booking.schema";
import { env } from "@/env";

export const bookingAPI = {
  async createBooking(
    token: string,
    dentistId: string,
    booking: CreateBookingRequest,
  ): Promise<CreateBookingResponse> {
    const response = await ky
      .post(`dentists/${dentistId}/bookings`, {
        json: booking,
        prefixUrl: env.NEXT_PUBLIC_BACKEND_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
        fetch,
      })
      .json<CreateBookingResponse>();
    return response;
  },
  async getBooking(
    token: string,
    bookingID: string,
  ): Promise<GetBookingResponse> {
    const response = await ky
      .get(`bookings/${bookingID}`, {
        prefixUrl: env.NEXT_PUBLIC_BACKEND_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
        fetch,
      })
      .json<GetBookingResponse>();
    return response;
  },
  async getBookings(
    token: string,
    dentistId?: string,
  ): Promise<GetBookingsResponse> {
    let searchParams: { dentistId?: string } = {};
    if (dentistId) searchParams.dentistId = dentistId;

    const response = await ky
      .get(`bookings`, {
        prefixUrl: env.NEXT_PUBLIC_BACKEND_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
        searchParams,
        fetch,
      })
      .json<GetBookingsResponse>();
    return response;
  },
  async updateBooking(
    token: string,
    bookingID: string,
    booking: UpdateBookingRequest,
  ): Promise<UpdateBookingResponse> {
    const response = await ky
      .put(`bookings/${bookingID}`, {
        json: booking,
        prefixUrl: env.NEXT_PUBLIC_BACKEND_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
        fetch,
      })
      .json<UpdateBookingResponse>();
    return response;
  },
  async deleteBooking(
    token: string,
    bookingID: string,
  ): Promise<DeleteBookingResponse> {
    const response = await ky
      .delete(`bookings/${bookingID}`, {
        prefixUrl: env.NEXT_PUBLIC_BACKEND_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
        fetch,
      })
      .json<DeleteBookingResponse>();
    return response;
  },
};
