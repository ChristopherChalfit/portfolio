"use client";
import Image from "next/image";
import "./Navbar.sass";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { fetchGetSkills } from "@/redux/actions/skills.actions";
import { fetchGetProjects } from "@/redux/actions/projects.actions";
import { getUser } from "@/redux/actions/user.actions";
import { HamburgetMenuClose, HamburgetMenuOpen } from "../Icons/Icons";
import { fetchGetContact } from "@/redux/actions/contacts.actions";
import { BebasNeue } from "@/lib/Font";

export default function NavBar() {
  const dispatch = useDispatch();
  const nameNavbar = "{ Christopher }"
  const ErrorGet = (message) => {
    console.log(message);
  };
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      dispatch(getUser(session.user));
    }
  }),
    [session];
  useEffect(
    () => {
      dispatch(fetchGetSkills(ErrorGet));
      dispatch(fetchGetProjects(ErrorGet));
    },
    [dispatch],
    []
  );
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!isOpen)};
  return (
  
      <nav className="navbar" id="navbar">
        <Link href="/">
        <h2 className={`navbar--head ${BebasNeue.className}`}>{ nameNavbar }</h2>
        </Link>
        <ul className={isOpen ? "navbar--menu active" : "navbar--menu"}>
          <li>
            <Link href="./#about" onClick={handleOpen}>A propos</Link>
          </li>
          <li>
            <Link href="./#skills"onClick={handleOpen}>Compétences</Link>
          </li>
          <li>
            <Link href="./#projects"onClick={handleOpen}>Projets</Link>
          </li>
          <li>
            <Link href="./#contact"onClick={handleOpen}>Contact</Link>
          </li>
        </ul>
        <div className="navbar-icon" onClick={handleOpen}>
            {isOpen ? (
              <span className="icon">
                <HamburgetMenuClose />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuOpen />
              </span>
            )}
          </div>
      </nav>
      
    
  );
}
