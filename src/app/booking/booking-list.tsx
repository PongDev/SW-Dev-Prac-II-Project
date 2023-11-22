"use client";

import { GetBookingData } from "@/lib/booking.schema";
import { Button, Card, CardBody, Text } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa6";

import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/th";
import { useOptimistic, useState } from "react";
dayjs.extend(relativeTime);
dayjs.locale("th");

type BookingListProps = {
  bookings: GetBookingData[];

  onDeleted?: (id: string) => void;
};

export default function BookingList(props: BookingListProps) {
  // const [bookingsOpt, addOpt] = useOptimistic<
  //   (GetBookingData & { optimistic?: boolean })[],
  //   string
  // >(props.bookings, (state, action) =>
  //   state.map((b) => (b._id === action ? { ...b, optimistic: true } : b))
  // );

  return (
    <>
      {props.bookings.map((booking) => (
        <BookingCard
          key={booking._id}
          booking={booking}
          // inAction={booking.optimistic}
          onDeleted={() => {
            // addOpt(booking._id);
            props.onDeleted?.(booking._id);
          }}
        />
      ))}
    </>
  );
}

function BookingCard(props: {
  booking: GetBookingData;
  inAction?: boolean;
  onDeleted?: () => void;
}) {
  const { booking, inAction } = props;

  return (
    <Card key={booking._id} className={inAction ? "opacity-50" : ""}>
      <CardBody className="flex justify-between">
        <div>
          <Text>
            Booking Date: {booking.bookingDate} (
            {dayjs(booking.bookingDate).fromNow()})
          </Text>
          <Text>Dentist: {booking.dentist.name}</Text>
        </div>

        <div>
          <Button
            leftIcon={<FaTrash />}
            colorScheme="red"
            className="mr-2"
            onClick={() => props.onDeleted?.()}
          >
            Cancel
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
