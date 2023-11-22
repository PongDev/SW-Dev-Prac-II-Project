import { dentistAPI } from "@/lib/dentist";
import { userAPI } from "@/lib/user";
import { Alert, Button, Input, Link as CLink } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import DentistCard, { EditBody, EditDentistCard } from "./card";

export default async function Dentist() {
  const session = await getServerSession(authOptions);
  const profile = session ? await userAPI.getMe(session.user.token) : null;
  const isAdmin = profile?.role === "admin";

  const dentists = await dentistAPI.getDentists();

  const createBtn = isAdmin && (
    <h2 className="m-auto text-center">
      <Button
        as={Link}
        variant="link"
        href="/dentist/new"
        colorScheme="blue"
        className="m-auto text-center"
      >
        create new one
      </Button>
    </h2>
  );

  return (
    <div>
      <h1 className="font-bold text-3xl text-center mt-8">
        Observe the dentist
      </h1>
      {createBtn}
      <Input className="mb-4 mt-6" placeholder="Search" />

      {dentists.length == 0 ? (
        <i className="w-full m-auto text-gray-400 text-center text-xl inline-block">
          All Dentist are Unusable
          {createBtn}
        </i>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-wrap lg:flex-nowrap justify-center">
          {dentists.map((dentist) => (
            <DentistCard key={dentist._id} dentist={dentist} />
          ))}
        </div>
      )}
    </div>
  );
}
