import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { bookingAPI } from "@/lib/booking";
import { dentistAPI } from "@/lib/dentist";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Input,
  VStack,
} from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { DisplayBody } from "../../card";

export default async function DentistBook({
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

  if (myBook !== undefined) {
    return <div>You already have dentist booked</div>;
  }
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
          <form
            className="text-center m-auto flex flex-row gap-4 w-full"
            action={async (formData: FormData) => {
              "use server";
              const bookingDate = formData.get("bookingDate")?.toString() ?? "";
              const booking = await bookingAPI.createBooking(
                session!.user.token,
                id,
                {
                  bookingDate: bookingDate,
                },
              );
              revalidatePath("/booking");
              redirect("/booking");
            }}
          >
            <Input
              placeholder="Booking Date"
              name="bookingDate"
              type="date"
              required
            />
            <ButtonGroup>
              <Button colorScheme="teal" type="submit" rightIcon={<FaBook />}>
                Submit
              </Button>
              <Button as={Link} href={`/dentist/${id}`} colorScheme="red">
                Cancel
              </Button>
            </ButtonGroup>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
