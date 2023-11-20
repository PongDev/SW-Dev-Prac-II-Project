import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getMe } from "@/lib/user";
import { Button, ButtonGroup, Center, Text, Tooltip } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FaArrowRightToBracket, FaUser } from "react-icons/fa6";
import ColorModeBtn from "./color-mode-btn";

export default async function Header() {
  const session = await getServerSession(authOptions);
  const profile = session ? await getMe(session.user.token) : null;
  const isAdmin = profile?.role === "admin";

  return (
    <div className="flex flex-row justify-between items-center py-5 px-5 border-b">
      <Link href="/">
        <h1 className="text-xl">🔨🦷Dentist🦷🔧</h1>
      </Link>

      <ButtonGroup variant="outline" className="flex gap-2">
        <ColorModeBtn />

        {session ? (
          <>
            <Button
              as={Link}
              href="/api/auth/signout"
              leftIcon={<FaArrowRightToBracket />}
            >
              Logout
            </Button>
            <Tooltip label={session.user.email + (isAdmin ? " (ADMIN)" : "")}>
              <div className="flex m-auto">
                <Text className="font-semibold text-lg">
                  {session.user.name}
                </Text>
                {isAdmin && (
                  <Text className="font-light text-xs bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                    ADMIN
                  </Text>
                )}
              </div>
            </Tooltip>
          </>
        ) : (
          <>
            <Button as={Link} href="/api/auth/signin" leftIcon={<FaUser />}>
              Login
            </Button>
            <Button
              disabled
              as={Link}
              href="/api/auth/register"
              leftIcon={<OcSignin2 />}
            >
              Register (WIP)
            </Button>
          </>
        )}
      </ButtonGroup>
    </div>
  );
}

function OcSignin2() {
  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className="overflow-visible text-current"
      height="1em"
      width="1em"
    >
      <path d="M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 0 1 0 1.5h-2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 0 1.5h-2.5A1.75 1.75 0 0 1 2 13.25Zm6.56 4.5h5.69a.75.75 0 0 1 0 1.5H8.56l1.97 1.97a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L6.22 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734Z"></path>
    </svg>
  );
}
