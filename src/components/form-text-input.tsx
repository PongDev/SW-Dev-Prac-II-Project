export default function FormTextInput({
  placeholder,
}: {
  placeholder: string | undefined;
}) {
  return (
    <input
      type="text"
      className="border border-black my-1 px-2 py-1 rounded-md shadow-md"
      placeholder={placeholder}
    />
  );
}
