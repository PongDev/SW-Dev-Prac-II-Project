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

import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/th";
import BookingList from "./booking-list";
import BookingClient from "./page-client";
dayjs.extend(relativeTime);
dayjs.locale("th");

export default async function Booking() {
  const session = await getServerSession(authOptions);
  const isAdmin = session
    ? (await userAPI.getMe(session.user.token)).role === "admin"
    : undefined;

  const bookingResponses = await bookingAPI.getBookings(session!.user.token);

  // let myBookings: GetBookingData[] = [];
  // let otherBookings: GetBookingData[] = [];
  // bookingResponses.data.forEach((booking) => {
  //   if (booking.user._id === session?.user.id) {
  //     myBookings.push(booking);
  //   } else {
  //     otherBookings.push(booking);
  //   }
  // });

  return (
    <BookingClient
      initialBookings={bookingResponses.data}
      isAdmin={isAdmin ?? false}
      userId={session!.user.id}
    />
  );
}
