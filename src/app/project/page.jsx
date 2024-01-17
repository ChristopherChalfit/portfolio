"use client";
import { useSelector } from "react-redux";
import "./Project.sass";
import { projects } from "@/redux/store";
import Projects from "@/components/Projects/Projects";

export default function Page() {
  const project = useSelector(projects)
  return (
    <Projects m_project={project} hasButton={false}/>
  );
}
