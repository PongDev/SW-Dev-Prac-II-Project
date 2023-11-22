"use server";

import { userAPI } from "@/lib/user";
import { HTTPError } from "ky";

export async function registerAction(prevState: any, registerForm: FormData) {
  try {
    await userAPI.register({
      name: registerForm.get("name")?.toString() ?? "",
      email: registerForm.get("email")?.toString() ?? "",
      tel: registerForm.get("tel")?.toString() ?? "",
      role: "user",
      password: registerForm.get("password")?.toString() ?? "",
    });
    return {
      message: "Create User Success",
      status: 200,
    };
  } catch (err) {
    if (err instanceof HTTPError) {
      return {
        message: "Create User Failed",
        status: err.response.status,
      };
    }
    return { message: "Something Went Wrong", status: 500 };
  }
}
