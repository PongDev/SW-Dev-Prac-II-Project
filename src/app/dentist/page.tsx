import { Input } from "@chakra-ui/react";
import DentistCard from "./card";

export default function Dentist() {
  return (
    <div>
      <h1 className="font-bold text-3xl text-center mt-8">
        Observe the dentist
      </h1>

      <Input className="mb-4 mt-6" placeholder="Search" />

      <div className="flex gap-4 md:flex-wrap lg:flex-nowrap">
        <DentistCard
          name="Dr. John Doe"
          hospital="Intense Toothcare"
          expertise="General Dentist"
          address="1234 Main St, City, State 12345"
          phone="+4733378901"
          picture="https://picsum.photos/256?random=1"
        />
        <DentistCard
          name="Dr. Jane Doe"
          hospital="Focused Toothcare"
          expertise="Aesthetic Dentist"
          address="1234 Main St, City, State 12345"
          picture="https://picsum.photos/256?random=2"
        />
        <DentistCard
          name="Dr. Josh Doe"
          hospital="Quick Toothcare"
          expertise="Orthodontist"
          address="1234 Main St, City, State 12345"
          picture="https://picsum.photos/256?random=3"
        />
      </div>
    </div>
  );
}
