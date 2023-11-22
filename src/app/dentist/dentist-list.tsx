"use client";

import { dentistAPI } from "@/lib/dentist";
import { Dentist } from "@/lib/dentist.schema";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import DentistCard from "./card";

type DentistListProps = {
  initialDentists: Dentist[];

  isAdminCtrl: boolean;

  editAction: (prev: any, formData: FormData) => Promise<Dentist>;
  deleteAction: (prev: any, id: string) => Promise<string>;
};

export default function DentistList(props: DentistListProps) {
  const { initialDentists, isAdminCtrl } = props;
  const toast = useToast();
  const [dentists, setDentists] = useState(initialDentists);
  const [stale, setStale] = useState([]);

  const [changedDentist, editAction] = useFormState(props.editAction, null);
  const [deletedId, deleteAction] = useFormState(props.deleteAction, null);
  useEffect(() => {
    dentistAPI.getDentists().then((dentists) => {
      setDentists(dentists);
    });
  }, [changedDentist, deletedId]);

  return dentists.length == 0 ? (
    <i className="w-full m-auto text-gray-400 text-center text-xl inline-block">
      All Dentist are Unusable
    </i>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-wrap lg:flex-nowrap justify-center">
      {dentists.map((dentist) => (
        <DentistCard
          key={dentist._id}
          dentist={dentist}
          isAdminCtrl={isAdminCtrl}
          editAction={editAction}
          onDelete={() => {
            deleteAction(dentist._id);
          }}
        />
      ))}
    </div>
  );
}
