import { bookingAPI } from "@/lib/booking";
import { Booking, GetBookingData } from "@/lib/booking.schema";
import { userAPI } from "@/lib/user";
import {
  Button,
  Card,
  CardBody,
  IconButton,
  Modal,
  Text,
} from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { FaInfoCircle } from "react-icons/fa";
import { FaInfo, FaTrash } from "react-icons/fa6";
import { authOptions } from "../api/auth/[...nextauth]/auth";

import BookingList from "./booking-list";
import BookingClient from "./page-client";

export default async function Booking() {
  const session = await getServerSession(authOptions);
  const isAdmin = session
    ? (await userAPI.getMe(session.user.token)).role === "admin"
    : undefined;

  const bookingResponses = await bookingAPI.getBookings(session!.user.token);

  return (
    <BookingClient
      initialBookings={bookingResponses.data}
      isAdmin={isAdmin ?? false}
      userId={session!.user.id}
    />
  );
}
