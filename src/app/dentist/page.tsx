import { getMe } from "@/lib/user";
import { Input } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import DentistCard from "./card";

export default async function Dentist() {
  const session = await getServerSession(authOptions);
  const profile = session ? await getMe(session.user.token) : null;
  const isAdmin = profile?.role === "admin";

  return (
    <div>
      <h1 className="font-bold text-3xl text-center mt-8">
        Observe the dentist
      </h1>

      <Input className="mb-4 mt-6" placeholder="Search" />

      <div className="flex gap-4 flex-wrap lg:flex-nowrap justify-center">
        <DentistCard
          name="Dr. John Doe"
          hospital="Intense Toothcare"
          expertise="General Dentist"
          address="1234 Main St, City, State 12345"
          phone="+4733378901"
          picture="https://picsum.photos/256?random=1"
          isAdminCtrl={isAdmin}
        />
        <DentistCard
          name="Dr. Jane Doe"
          hospital="Focused Toothcare"
          expertise="Aesthetic Dentist"
          address="1234 Main St, City, State 12345"
          picture="https://picsum.photos/256?random=2"
          isAdminCtrl={isAdmin}
        />
        <DentistCard
          name="Dr. Josh Doe"
          hospital="Quick Toothcare"
          expertise="Orthodontist"
          address="1234 Main St, City, State 12345"
          picture="https://picsum.photos/256?random=3"
          isAdminCtrl={isAdmin}
        />
      </div>
    </div>
  );
}
