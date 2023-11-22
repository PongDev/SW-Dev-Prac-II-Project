"use client";

import Button from "@/components/button";
import Form from "@/components/form";
import FormTextInput from "@/components/form-text-input";
import { useFormState } from "react-dom";
import { registerAction } from "./registerAction";
import { useToast } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export default function Register() {
  const toast = useToast();
  const [state, formAction] = useFormState(registerAction, {
    message: "",
    status: 0,
  });

  if (state?.message) {
    toast({
      title: state.message,
      status: state.status === 200 ? "success" : "error",
      position: "top-right",
    });
    if (state.status === 200) redirect("/api/auth/signin");
  }

  return (
    <div className="flex justify-center">
      <Form action={formAction} title="Registration Form">
        <FormTextInput placeholder="Name" name="name" required />
        <FormTextInput
          placeholder="Telephone Number"
          name="tel"
          type="tel"
          required
        />
        <FormTextInput placeholder="Email" name="email" type="email" required />
        <FormTextInput
          placeholder="Password"
          name="password"
          type="password"
          required
        />
        <Button
          color="Submit"
          text="Submit"
          type="submit"
          disabled={state.status === 200}
        />
      </Form>
    </div>
  );
}
