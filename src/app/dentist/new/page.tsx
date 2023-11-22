import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { dentistAPI } from "@/lib/dentist";
import { CreateDentistRequest, Dentist } from "@/lib/dentist.schema";
import { Button, Card, CardBody, CardFooter, Heading } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { EditBody } from "../card";

async function createDentist(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const token = session?.user.token!; // TODO

  const dentist: CreateDentistRequest = {
    name: formData.get("name") as string,
    address: formData.get("address") as string,
    tel: formData.get("tel") as string,
    expertist: formData.get("expertist") as string,
    hospital: formData.get("hospital") as string,
    picture: formData.get("picture") as string,
  };

  await dentistAPI.createDentist(token, dentist);

  revalidatePath("/dentist");
  redirect("/dentist");
}

export default function NewDentist() {
  return (
    <div>
      <h1 className="font-bold text-3xl text-center mt-8">
        Create new dentist
      </h1>

      <Card as="form" action={createDentist} className="w-fit mx-auto my-6">
        <CardBody>
          <Heading className="mb-4" size="lg">
            Fill new dentist
          </Heading>
          <EditBody />
        </CardBody>
        <CardFooter>
          <Button colorScheme="blue" type="submit">
            Create
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
