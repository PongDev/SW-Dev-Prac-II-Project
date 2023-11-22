import Button from "@/components/button";
import Form from "@/components/form";
import FormTextInput from "@/components/form-text-input";
import { userAPI } from "@/lib/user";

export default function Register() {
  const registerFunction = async (registerForm: FormData) => {
    "use server";

    await userAPI.register({
      name: registerForm.get("name")?.toString() ?? "",
      email: registerForm.get("email")?.toString() ?? "",
      tel: registerForm.get("tel")?.toString() ?? "",
      role: "user",
      password: registerForm.get("password")?.toString() ?? "",
    });
  };

  return (
    <div className="flex justify-center">
      <Form action={registerFunction} title="Registration Form">
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
        <Button color="Submit" text="Submit" type="submit" />
      </Form>
    </div>
  );
}
