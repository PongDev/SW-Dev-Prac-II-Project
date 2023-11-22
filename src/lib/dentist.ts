import { env } from "@/env";
import ky from "ky";
import { CreateDentistRequest, Dentist } from "./dentist.schema";

export const dentistAPI = {
  async getDentists() {
    const response = await ky
      .get("dentists", {
        prefixUrl: env.NEXT_PUBLIC_BACKEND_URL,
        fetch,
      })
      .json<{ data: Dentist[] }>();
    return response.data;
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
};
