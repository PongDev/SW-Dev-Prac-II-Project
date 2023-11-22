import { GetBookingData } from "@/lib/booking.schema";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  Button,
  Card,
  CardBody,
  Input,
  Text,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa6";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/th";
import { useOptimistic, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
dayjs.extend(relativeTime);
dayjs.locale("th");

type BookingListProps = {
  bookings: GetBookingData[];

  onEdit?: (id: string) => void;
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
          onEdit={() => {
            // addOpt(booking._id);
            props.onEdit?.(booking._id);
          }}
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
  onEdit?: () => void;
  onDeleted?: () => void;
}) {
  const { booking, inAction } = props;
  const bookingDate = dayjs(booking.bookingDate);

  return (
    <Card key={booking._id} className={inAction ? "opacity-50" : ""}>
      <CardBody className="flex justify-between">
        <div>
          <Text>
            Booking Date: {bookingDate.format("YYYY-MM-DD")} (
            {bookingDate.fromNow()})
          </Text>
          <Text>
            Dentist:{" "}
            <Link
              href={`/dentist/${booking.dentist._id}`}
              className="hover:underline"
            >
              {booking.dentist.name}
            </Link>
          </Text>
        </div>

        <div>
          <Button
            leftIcon={<FaEdit />}
            colorScheme="blue"
            className="mr-2"
            onClick={() => props.onEdit?.()}
          >
            Edit
          </Button>
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
