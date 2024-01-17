"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Project.sass";
import Link from "next/link";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Collapse from "@/components/Collapse/Collapse";
import { projects } from "@/redux/store";

export default function ProjectPage({ params: { id } }) {
  const m_project = useSelector(projects);
  const project = m_project.find((project) => project.id === id);

  if (!project) {
    return (
      <div>
        <Link href="./">
          <p>Projet introuvable</p>
        </Link>
      </div>
    );
  }

  const contentHTML = project.tags
    .map(
      (tag) =>
        `<div key=${tag.id} class="project--tags">
      <p>${tag.name}</p>
      <img src=${tag.icon} alt=${tag.name} />
    </div>`
    )
    .join("");

  return (
    <div>
      <div className="project">
        <Image
          src={project.image}
          className="project--img"
          alt={project.name}
          width={515}
          height={440}
        />
        <h2>{project.name}</h2>
        <div className="project--skill">
          {project.tags.length >0 ? (
            <Collapse title="Compétences" content={contentHTML} />
          ) : (
            <></>
          )}
        </div>
        <div
          className="project--description"
          dangerouslySetInnerHTML={{ __html: project.description }}
        ></div>
        <div className="project--link">
          {project.linkpreview ? (
            <Link href={project.linkpreview} target="_blank" aria-label={project.name}>
              Prévisualisé
              <FontAwesomeIcon icon={faEye} />
            </Link>
          ) : (
            <></>
          )}
          {project.linkgithub ? (
            <Link href={project.linkgithub} target="_blank" aria-label={project.name}>
              Code source
              <FontAwesomeIcon icon={faGithub} />
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
