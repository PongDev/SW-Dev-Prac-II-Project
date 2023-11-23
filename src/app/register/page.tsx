"use client";

import Button from "@/components/button";
import Form from "@/components/form";
import FormTextInput from "@/components/form-text-input";
import { useFormState } from "react-dom";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerAction } from "./register.action";

export default function Register() {
  const toast = useToast();
  const [state, formAction] = useFormState(registerAction, {
    message: "",
    status: 0,
  });
  const router = useRouter();

  useEffect(() => {
    if (state.status === 200) {
      const timeout = setTimeout(() => router.push("/api/auth/signin"), 2000);
      return () => clearTimeout(timeout);
    }
  }, [router, state.status]);

  if (state?.message) {
    toast({
      title: state.message,
      status: state.status === 200 ? "success" : "error",
      position: "top-right",
    });
  }

  return (
    <div className="flex justify-center py-7">
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
