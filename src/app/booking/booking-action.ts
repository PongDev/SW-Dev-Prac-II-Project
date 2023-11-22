"use server";

import { bookingAPI } from "@/lib/booking";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "../api/auth/[...nextauth]/auth";

export async function getBookings(dentistId?: string) {
  const session = await getServerSession(authOptions);
  const token = session!.user.token;

  return await bookingAPI.getBookings(token, dentistId);
}

export async function editBooking(id: string, bookingDate: string) {
  const session = await getServerSession(authOptions);
  const token = session!.user.token;

  const res = await bookingAPI.updateBooking(token, id, {
    bookingDate,
  });
  revalidatePath("/booking");
  return res;
}

export async function deleteBooking(id: string) {
  const session = await getServerSession(authOptions);
  const token = session!.user.token;

  const res = await bookingAPI.deleteBooking(token, id);
  revalidatePath("/booking");
  return res;
}
