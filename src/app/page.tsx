import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession();

  return <main>{JSON.stringify(session?.expires)}</main>;
}
