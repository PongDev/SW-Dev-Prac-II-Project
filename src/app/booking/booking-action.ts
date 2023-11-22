"use server";

import { bookingAPI } from "@/lib/booking";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";

export async function getBookings(dentistId?: string) {
  const session = await getServerSession(authOptions);
  const token = session!.user.token;

  return await bookingAPI.getBookings(token, dentistId);
}

export async function deleteBooking(id: string) {
  const session = await getServerSession(authOptions);
  const token = session!.user.token;

  return await bookingAPI.deleteBooking(token, id);
}
