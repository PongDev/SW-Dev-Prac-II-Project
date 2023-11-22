export type Dentist = {
  _id: string;
  name: string;
  hospital: string;
  expertist: string;
  address: string;
  tel?: string;
  picture: string;
};

export type CreateDentistRequest = Omit<Dentist, "_id">;
export type EditDentistRequest = Omit<Dentist, "_id">;
