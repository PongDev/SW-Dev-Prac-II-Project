import { dentistAPI } from "@/lib/dentist";
import { Dentist, EditDentistRequest } from "@/lib/dentist.schema";
import { userAPI } from "@/lib/user";
import { Alert, Button, Input, Link as CLink, Text } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import DentistCard, { EditBody, EditDentistCard } from "./card";
import DentistList from "./dentist-list";

async function editAction(prev: any, formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);
  const id = formData.get("id") as string;
  const dentist: EditDentistRequest = {
    name: formData.get("name") as string,
    address: formData.get("address") as string,
    tel: formData.get("tel") as string,
    expertist: formData.get("expertist") as string,
    hospital: formData.get("hospital") as string,
    picture: formData.get("picture") as string,
  };

  const newDentist = await dentistAPI.editDentist(
    session!.user.token,
    id,
    dentist,
  );

  revalidatePath("/dentist");
  return newDentist;
}

async function deleteAction(prev: any, id: string) {
  "use server";

  const session = await getServerSession(authOptions);

  await dentistAPI.deleteDentist(session!.user.token, id);
  return id;
}

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
        colorScheme="pink"
        className="m-auto text-center"
      >
        <Text className="font-light text-sm bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
          create new one
        </Text>
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

      <DentistList
        isAdminCtrl={isAdmin}
        initialDentists={dentists}
        editAction={editAction}
        deleteAction={deleteAction}
      />
    </div>
  );
}
