export default function Form({
  children,
  action,
  title,
}: {
  children: React.ReactNode;
  action?: string | ((formData: FormData) => void) | undefined;
  title: string;
}) {
  return (
    <form
      action={action}
      className="border px-7 py-2 rounded-md m-3 flex flex-col w-[30rem]"
    >
      <h3 className="font-semibold text-2xl text-center py-2">{title}</h3>
      {children}
    </form>
  );
}
