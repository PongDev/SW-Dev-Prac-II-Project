"use client";

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
import { use, useMemo, useState } from "react";
import { deleteBooking, getBookings } from "./booking-action";
import { revalidatePath } from "next/cache";
dayjs.extend(relativeTime);
dayjs.locale("th");

type BookingClientProps = {
  initialBookings: GetBookingData[];
  isAdmin: boolean;
  userId: string;
};

export default function BookingClient(props: BookingClientProps) {
  const [bookings, setBookings] = useState(props.initialBookings);

  function refetchBooking() {
    return getBookings().then((response) => {
      setBookings(response.data);
    });
  }

  const [myBookings, otherBookings] = useMemo(() => {
    let myBookings: GetBookingData[] = [];
    let otherBookings: GetBookingData[] = [];
    bookings.forEach((booking) => {
      if (booking.user._id === props.userId) {
        myBookings.push(booking);
      } else {
        otherBookings.push(booking);
      }
    });
    return [myBookings, otherBookings] as const;
  }, [bookings, props.userId]);

  return (
    <div>
      <h1 className=" text-center m-4 mb-8 text-5xl font-bold">
        <span className="font-bold text-3xl mr-1">My Booking</span>
        <IconButton
          icon={<FaInfoCircle className="text-neutral-400 rounded-full" />}
          aria-label="More Info"
          variant="ghost"
          className="inline rounded-full"
        />
      </h1>

      <BookingList
        bookings={myBookings}
        onDeleted={async (id) => {
          await deleteBooking(id);
          revalidatePath("/booking");
          refetchBooking();
        }}
      />

      {props.isAdmin && (
        <h1 className="text-center m-8 mt-12">
          <span className="font-bold text-3xl mr-1">Others Booking</span>
          <IconButton
            icon={<FaInfoCircle className="text-neutral-400 rounded-full" />}
            aria-label="More Info"
            variant="ghost"
            className="inline rounded-full"
          />
        </h1>
      )}

      <BookingList
        bookings={otherBookings}
        onDeleted={async (id) => {
          await deleteBooking(id);
          revalidatePath("/booking");
          refetchBooking();
        }}
      />
    </div>
  );
}
