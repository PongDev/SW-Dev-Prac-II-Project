import Button from "@/components/button";
import Form from "@/components/form";
import FormTextInput from "@/components/form-text-input";

export default function Register() {
  return (
    <div className="flex justify-center">
      <Form title="Registration Form">
        <FormTextInput placeholder="Name" />
        <FormTextInput placeholder="Telephone Number" />
        <FormTextInput placeholder="Email" />
        <FormTextInput placeholder="Password" />
        <Button color="Submit" text="Submit" />
      </Form>
    </div>
  );
}
