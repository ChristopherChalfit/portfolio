"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Projects.sass";
import Link from "next/link";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { BebasNeue } from "@/lib/Font";
import React from "react";
import Select from "react-select";
import { useState } from "react";
import makeAnimated from "react-select/animated";
import { projects, skills } from "@/redux/store";
import { useSelector } from "react-redux";
const animatedComponents = makeAnimated();
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor:  '#dcdbcf',
    borderColor: '#dcdbcf' ,
    color: "#000"
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: '#28384d',
    opacity: state.isFocused ? 1 : 0.8,
    ':hover': {
      opacity: 1,
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: '#dcdbcf',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor:  '#dcdbcf',
    color:'#28384d',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: '#28384d',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#28384d',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#28384d',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#dcdbcf',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'red',
  }),
};

const Dropdown = ({ options, onChange }) => {
  return (
    <Select
      isMulti
      closeMenuOnSelect={false}
      components={animatedComponents}
      options={options}
      onChange={onChange}
      instanceId={"wsad123wqwe"}
      placeholder={"Compétences"}
      styles={customStyles}
    />
  );
};

export default function Projects({ m_project, hasButton = true }) {
  const m_skills = useSelector(skills);
  const totalProjet = useSelector(projects)
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleDropdownChange = (selected) => {
    setSelectedOptions(selected);
  };
  const filteredProjects = m_project.filter((project) => {
    const projectSkills = project.tags.map((skill) => skill.name);
    return selectedOptions.every((selectedSkill) =>
      projectSkills.includes(selectedSkill.value)
    );
  });
  return (
    <div className="projects" id="projects">
      <h2 className={`projects--head ${BebasNeue.className}`}>MES PROJETS</h2>
      <p className="projects--total">Nombre de projet :{hasButton ? totalProjet.length : filteredProjects.length}</p>
      {!hasButton ? (
        <Dropdown
          options={m_skills.map((skill) => ({
            value: skill.name,
            label: skill.name,
          }))}
          onChange={handleDropdownChange}
        />
      ) : (
        <></>
      )}
      <div className="projects--list">
        {filteredProjects.length === 0 ? (
          <p className="projects--noskills">Aucun projet correspondant aux compétences sélectionnées.</p>
        ) : (
          filteredProjects.map((project, index) => (
            <article className="projects--card" key={index}>
              <Link
                href={`/project/${project.id}`}
                className="projects--card--link"
              >
                <Image
                  src={project.image}
                  className="projects--logo"
                  alt={project.name}
                  width={515}
                  height={440}
                />
                <div className="projects--card--content">
                  <h2 className="projects--card--content--title">
                    {project.name}
                  </h2>
                  <p
                    className="projects--card--content--subtitle"
                    dangerouslySetInnerHTML={{ __html: project.presentation }}
                  ></p>
                </div>
              </Link>
              <div className="projects--card--content--link">
                {project.linkpreview ? 
                <Link href={project.linkpreview} target="_blank" aria-label={project.name}>
                  {" "}
                  <FontAwesomeIcon icon={faEye} />
                </Link>:<></>}
                {project.linkgithub ? 
                <Link href={project.linkgithub} target="_blank" aria-label={project.name}>
                  {" "}
                  <FontAwesomeIcon icon={faGithub} />
                </Link>:<></>}
              </div>
            </article>
          ))
        )}
      </div>
      {hasButton ? (
        <Link href="/project" className="projects--viewmore">
          Voir plus
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}
