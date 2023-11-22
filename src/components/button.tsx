type BtnColor = "Submit" | "Danger";

export default function Button({
  type,
  text,
  color,
}: {
  type?: "submit" | "reset" | "button" | undefined;
  text: string;
  color: BtnColor;
}) {
  let btnBgColor = "";
  switch (color) {
    case "Submit":
      btnBgColor = "bg-green-300 hover:bg-green-500";
      break;
    case "Danger":
      btnBgColor = "bg-red-400 hover:bg-red-600";
      break;
  }
  return (
    <button
      className={`${btnBgColor} rounded-md my-2 border border-black`}
      type={type}
    >
      {text}
    </button>
  );
}
