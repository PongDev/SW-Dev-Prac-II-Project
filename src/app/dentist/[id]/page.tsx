import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { bookingAPI } from "@/lib/booking";
import { dentistAPI } from "@/lib/dentist";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { DisplayBody } from "../card";

export default async function DentistDetails({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const dentist = await dentistAPI.getDentist(id);

  const session = await getServerSession(authOptions);
  const myBook = await (async () => {
    if (!session) return undefined;
    const booking = await bookingAPI.getBookings(session!.user.token);
    console.log(JSON.stringify(booking));
    return booking.data.filter((b) => b.user._id === session.user.id)[0];
  })();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight m-4 text-center">
        Dentist Booking
      </h1>

      <Card className="max-w-lg mx-auto my-16">
        <CardBody>
          <VStack>
            <DisplayBody dentist={dentist} />
          </VStack>
        </CardBody>

        <Divider />

        <CardFooter>
          {!myBook ? (
            <div className="flex justify-center  w-full">
              {/* TODO */}
              <Button as={Link} href={`/dentist/${id}/book`} colorScheme="teal">
                Make Booking with
              </Button>
            </div>
          ) : myBook.dentist._id === id ? (
            <div className="flex justify-center  w-full">
              <Button colorScheme="red">Cancel Booking</Button>
            </div>
          ) : (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>
                Already booked with another dentist
                <Link href="/booking">
                  <FaExternalLinkAlt className="inline ml-2" size={12} />
                </Link>
              </AlertTitle>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
