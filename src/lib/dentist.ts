import { env } from "@/env";
import ky from "ky";
import {
  CreateDentistRequest,
  Dentist,
  EditDentistRequest,
} from "./dentist.schema";

export const dentistAPI = {
  async getDentists() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dentists`,
    );

    if (!response.ok) {
      throw new Error(`Fetch error: ${response.statusText}`);
    }

    const data: { data: Dentist[] } = await response.json();
    return data.data;
  },
  async getDentist(id: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dentists/${id}`,
    );

    if (!response.ok) {
      throw new Error(`Fetch error: ${response.statusText}`);
    }

    const data: { data: Dentist } = await response.json();
    return data.data;
  },

  async createDentist(token: string, dentist: CreateDentistRequest) {
    const response = await ky
      .post("dentists", {
        json: dentist,
        prefixUrl: env.NEXT_PUBLIC_BACKEND_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
        fetch,
      })
      .json<{ data: Dentist }>();
    return response.data;
  },
  async editDentist(token: string, id: string, dentist: EditDentistRequest) {
    return await ky
      .put(`dentists/${id}`, {
        json: dentist,
        prefixUrl: env.NEXT_PUBLIC_BACKEND_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
        fetch,
      })
      .json<Dentist>();
  },
  async deleteDentist(token: string, id: string) {
    return await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/dentists/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });
  },
};
