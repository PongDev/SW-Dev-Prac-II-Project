import { Button } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { FaTicket } from "react-icons/fa6";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { authOptions } from "./api/auth/[...nextauth]/auth";

export default async function Home() {
  return (
    <main className="m-6">
      <div className="text-center mt-12 mb-8">
        <Image
          src="https://picsum.photos/256"
          alt="App Logo"
          width={256}
          height={256}
          className="m-auto rounded-sm"
        />
        <h1 className="text-5xl font-bold tracking-tight m-4">
          Dentist Booking:{" "}
          <span className="text-neutral-600">Intense Toothcare</span>
        </h1>
        <h2 className="text-4xl text-gray-500 m-4">SELECT your option</h2>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          as={Link}
          href="/booking"
          leftIcon={<FaTicket size={24} />}
          size="lg"
          className="w-full rounded-xl hover:scale-95 transition-all duration-75"
          colorScheme="teal"
        >
          <h3>Manage Booking</h3>
        </Button>
        <Button
          as={Link}
          href="/dentist"
          leftIcon={<GiPlagueDoctorProfile size={24} />}
          size="lg"
          className="w-full hover:scale-95 transition-all duration-75"
          colorScheme="yellow"
        >
          <h3>Know your dentist</h3>
        </Button>
      </div>
    </main>
  );
}
