"use client";
import { getUser } from "@/redux/actions/user.actions";
import "./Login.sass";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
export default function Login() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(session));
    console.log("Session trouvé " + session + " status " + status);
  }),
    [session];
  return (
    <div className="">
      Login
      {session ? (
        <p>
          {status}
          {session.user.name}
          <button
            onClick={async () => {
              await signOut();
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Logout
          </button>
          {session.user.role === "admin" ? (
            <Link href="/admin">Admin</Link>
          ) : (
            <></>
          )}
        </p>
      ) : (
        <p>
          {" "}
          Aucune session{" "}
          <button
            onClick={async () => {
              await signIn();
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Login
          </button>
        </p>
      )}
    </div>
  );
}
