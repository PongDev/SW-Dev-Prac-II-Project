import ColorModeBtn from "./color-mode-btn";

export default function Form({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const registerFunction = async (registerForm: FormData) => {
    "use server";
  };
  return (
    <form
      action={registerFunction}
      className="border px-7 py-2 rounded-md m-3 flex flex-col w-[30rem]"
    >
      <h3 className="font-semibold text-lg text-center">{title}</h3>
      {children}
    </form>
  );
}
