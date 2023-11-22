"use client";

import { bookingAPI } from "@/lib/booking";
import { Booking, GetBookingData } from "@/lib/booking.schema";
import { userAPI } from "@/lib/user";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Card,
  CardBody,
  IconButton,
  Input,
  Modal,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { FaInfoCircle } from "react-icons/fa";
import { FaInfo, FaTrash } from "react-icons/fa6";
import { authOptions } from "../api/auth/[...nextauth]/auth";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/th";
import BookingList from "./booking-list";
import { use, useMemo, useRef, useState } from "react";
import { deleteBooking, editBooking, getBookings } from "./booking-action";
import { revalidatePath } from "next/cache";
import Link from "next/link";
dayjs.extend(relativeTime);
dayjs.locale("th");

type BookingClientProps = {
  initialBookings: GetBookingData[];
  isAdmin: boolean;
  userId: string;
};

export default function BookingClient(props: BookingClientProps) {
  const [bookings, setBookings] = useState(props.initialBookings);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editId, setEditId] = useState<string | null>(null);

  function refetchBooking() {
    return getBookings().then((response) => {
      setBookings(response.data);
    });
  }

  const [myBookings, otherBookings] = useMemo(() => {
    let myBookings: GetBookingData[] = [];
    let otherBookings: GetBookingData[] = [];
    bookings.forEach((booking) => {
      if (
        (typeof booking.user === "string" ? booking.user : booking.user._id) ===
        props.userId
      ) {
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

      {myBookings.length === 0 && (
        <Text className="text-center text-lg font-semibold text-gray-400">
          You have no booking
          <br />
          <Link
            href="/dentist"
            className="text-teal-400 underline ml-2 text-md"
          >
            <Tooltip label="You can select and book dentist appointment from dentist page">
              Meet dentist Now!
            </Tooltip>
          </Link>
        </Text>
      )}

      <BookingList
        bookings={myBookings}
        onEdit={async (id) => {
          setEditId(id);
          onOpen();
        }}
        onDeleted={async (id) => {
          try {
            await deleteBooking(id);
          } catch (error) {
            toast({
              title: "Fail to delete booking.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            return;
          }

          toast({
            title: "Booking has been deleted.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

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
        onEdit={async (id) => {
          setEditId(id);
          onOpen();
        }}
        onDeleted={async (id) => {
          try {
            await deleteBooking(id);
          } catch (error) {
            toast({
              title: "Fail to delete booking.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            return;
          }

          toast({
            title: "Booking has been deleted.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          refetchBooking();
        }}
      />

      <EditDialog
        booking={bookings.find((booking) => booking._id === editId)}
        isOpen={isOpen}
        editId={editId}
        onEdit={async (id, date) => {
          try {
            await editBooking(id, date);
          } catch (error) {
            toast({
              title: "Fail to alter booking date.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            return;
          }

          toast({
            title: "Booking date has been altered.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          refetchBooking();
        }}
        onClose={() => {
          setEditId(null);
          onClose();
        }}
      />
    </div>
  );
}

function EditDialog(props: {
  booking?: GetBookingData;
  isOpen: boolean;
  editId: string | null;
  onClose: () => void;
  onEdit?: (id: string, date: string) => void;
}) {
  const cancelRef = useRef(null);

  const bd = props.booking?.bookingDate;
  const oldDate = bd ? dayjs(bd).format("YYYY-MM-DD") : undefined;

  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent
          as="form"
          action={(formData: FormData) => {
            props.onEdit?.(
              props.booking?._id!,
              formData.get("bookingDate") as string,
            );
            props.onClose();
          }}
        >
          <AlertDialogHeader>
            <Text>Alter booking date</Text>
            <Text>
              {typeof props.booking?.user !== "string" && (
                <span>of &ldquo;{props.booking?.user.name}&ldquo;</span>
              )}
              <span>with Dentist `{props.booking?.dentist.name}`</span>
            </Text>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Input type="date" defaultValue={oldDate} name="bookingDate" />
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={props.onClose} type="reset">
              Cancel
            </Button>
            <Button colorScheme="blue" ml={3} type="submit">
              Alter
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
