"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import "./Skills.sass";
import { BebasNeue } from "@/lib/Font";
import { skills } from "@/redux/store";

export default function Skills() {
  const m_skills = useSelector(skills);
  return (
    <div className="skills" id="skills">
      <h2 className={`skills--head ${BebasNeue.className}`}>MES COMPÉTENCES</h2>{" "}
      <div className="skills--list">
        {m_skills.map((skill) => (
          skill.isActif ? (
          <div className="skills--content" key={skill.id}>
            <Image
              src={skill.icon}
              className="skills--logo"
              alt={skill.name}
              width={515}
              height={440}
            />
            <p>{skill.name}</p>
          </div>
          ):(
          <></>)
        ))}
      </div>
    </div>
  );
}
