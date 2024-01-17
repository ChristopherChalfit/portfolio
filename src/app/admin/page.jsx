"use client";
import "./Admin.sass";
import { useEffect, useState } from "react";
import ModalSkills from "@/components/ModalSkills/ModalSkills";
import ModalProject from "@/components/ModalProject/ModalProject";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddSkills,
  fetchDeleteSkills,
} from "@/redux/actions/skills.actions";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  fetchDeleteContact,
  fetchGetContact,
  fetchPostContact,
} from "@/redux/actions/contacts.actions";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Collapse from "@/components/Collapse/Collapse";
import { contacts, projects, skills } from "@/redux/store";
export default function Admin() {
  const { data: session, status } = useSession();
  const m_skills = useSelector(skills);
  const m_projects = useSelector(projects);
  const m_contacts = useSelector(contacts);
  const unreadMessagesCount = m_contacts.filter(
    (contact) => !contact.isRead
  ).length;

  const dispatch = useDispatch();
  const ErrorGet = (message) => {
    console.log(message);
  };

  const [formData, setFormData] = useState({
    fieldName: "",
    fieldClient: "",
    fieldPresentation: "",
    fieldDescription: "",
    fieldLinkGit: "",
    fieldLinkPrev: "",
  });
  const handleChange = (e) => {
    console.log;
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleChangeCheckBox = async (categorie, idOrName, isChecked) => {
    if (categorie === "skills") {
      const skills = JSON.stringify({
        name: idOrName,
        isActif: isChecked,
      });
      await dispatch(fetchAddSkills(skills, "UpdateActif", ErrorAdd));
    } else if (categorie === "contact") {
      const contact = JSON.stringify({
        id: idOrName,
        isRead: isChecked,
      });
      await dispatch(fetchPostContact(contact, "EditContact", ErrorAdd));
    }
  };

  const handleDelete = async (categorie, idOrName) => {
    if (categorie === "contact") {
      const contact = JSON.stringify({
        id: idOrName,
      });
      await dispatch(fetchDeleteContact(contact, ErrorGet));
    } else if (categorie === "skills") {
      const skills = JSON.stringify({
        id: idOrName,
      });
      await dispatch(fetchDeleteSkills(skills, ErrorGet));
    }
  };

  const ErrorAdd = (message) => {
    console.log("Error " + message);
  };
  useEffect(
    () => {
      dispatch(fetchGetContact(ErrorGet));
    },
    [dispatch],
    []
  );
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleEditClick = (projectId) => {
    setSelectedProjectId(projectId);
  };
  if (status === "authenticated") {
   if (session.user.role != "admin") {
   return (
   <div className="admin">
     <p>
       Vous n'avez pas le role d'administrateur pour être sur cette page
     </p>
     <p>
       <Link href="/home">Retour vers la page d'accueil</Link>
     </p>
   </div>
     );
  }
  return (
    <div className="admin">
      <Tabs>
        <TabList>
          <Tab>Compétences</Tab>
          <Tab>Projets</Tab>
          <Tab>
            Contact{" "}
            {unreadMessagesCount > 0 && (
              <span className="unread-badge">{unreadMessagesCount}</span>
            )}
          </Tab>
        </TabList>

        <TabPanel>
          <h2 className="tabs--h2">Liste compétences</h2>
          {m_skills.length != 0 ? (
            <table className="admin--table">
              <thead>
                <tr>
                  <th>Skills</th>
                  <th>Icon</th>
                  <th>Actif ?</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {m_skills.map((skill, index) => (
                  <tr key={index + 1}>
                    <td>{skill.name}</td>
                    <td className="admin--td">
                      <img src={skill.icon} className="admin--img"></img>
                    </td>
                    <td>
                      <label>
                        Actif ?:
                        <input
                          type="checkbox"
                          name={skill.name}
                          defaultChecked={skill.isActif}
                          onChange={(e) =>
                            handleChangeCheckBox(
                              "skills",
                              skill.name,
                              e.target.checked
                            )
                          }
                        />
                      </label>
                    </td>
                    <td>
                      <input
                        type="button"
                        name={skill.id}
                        value={"Suppr"}
                        onClick={(e) => handleDelete("skills", skill.id)}
                      />
                    </td>
                    <div className="line"></div>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              <p>Aucune compétences de disponible</p>
              <ModalSkills />
            </div>
          )}
          <div>
            <p>Ajouté une compétence</p>
            <ModalSkills />
          </div>
        </TabPanel>
        <TabPanel>
          <h2 className="tabs--h2">Mes projets</h2>
          {m_projects.length != 0 ? (
            <table className="admin--table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Icon</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {m_projects.map((project, index) => (
                  <tr key={index + 1}>
                    <td>{project.name}</td>
                    <td className="admin--td">
                      <img src={project.image} className="admin--img"></img>
                    </td>
                    <td>
                      <input
                        type="button"
                        name={project.id}
                        value={"Edit"}
                        onClick={(e) => handleEditClick(project.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              <p>Aucun projects de disponible</p>
              <ModalProject />
            </div>
          )}

          {selectedProjectId ? (
            <> <div>
            <p>Edité le projet</p>
            <ModalProject projectEditable={selectedProjectId} />
          </div></>
          ) : (
            <div>
              <p>Ajouté un projet</p>
              <ModalProject />
            </div>
          )}
        </TabPanel>
        <TabPanel>
          <h2 className="tabs--h2">Messageries</h2>
          {m_contacts.length != 0 ? (
            <div>
              <table className="admin--table">
                <thead>
                  <tr>
                    <th>Message</th>
                    <th>Marquer comme lu</th>
                    <th>Supprimer</th>
                  </tr>
                </thead>
                <tbody>
                  {m_contacts.map((contact, index) => (
                    <tr key={index + 1}>
                      <td className="admin--contact--td">
                        <Collapse
                          title={contact.name}
                          content={
                            "<div class='admin--contact'>" +
                            "<p>Email : " +
                            contact.email +
                            "</p><p>Tel : " +
                            contact.telephone +
                            "</p><p>Sujet : " +
                            contact.subject +
                            "</p><p>message :</p><p>" +
                            contact.message +
                            "</p>" +
                            "</div>"
                          }
                        />
                      </td>
                      <td>
                        <label>
                          Lu ?:
                          <input
                            type="checkbox"
                            name={contact.id}
                            defaultChecked={contact.isRead}
                            onChange={(e) =>
                              handleChangeCheckBox(
                                "contact",
                                contact.id,
                                e.target.checked
                              )
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <input
                          type="button"
                          name={contact.id}
                          value={"Suppr"}
                          onClick={(e) => handleDelete("contact", contact.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <p>Aucun contacts de disponible</p>
            </div>
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
   } else {
  return (
    <div className="admin">
      <p>Vous n'êtes pas authentifier</p>
      <p>
        <Link href="/home">Retour vers la page d'accueil</Link>
      </p>
    </div>
  );
  }
}
