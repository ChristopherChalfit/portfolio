import { fetchAddProject, fetchEditProject } from "@/redux/actions/projects.actions";
import "./ModalProject.sass";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { Editor } from "@tinymce/tinymce-react";
import { projects, skills } from "@/redux/store";

export default function ModalProject({projectEditable}) {
  const [descriptionContent, setEditorDescriptionContent] = useState("");
  const [presentationContent, setEditorPresentationContent] = useState("");

  const APIKeyEditor = process.env.editorwysiwyg;
  const handleDescriptionEditorChange = (content) => {
    setEditorDescriptionContent(content);
  };
  const handlePresentationEditorChange = (content) => {
    setEditorPresentationContent(content);
  };
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const m_skills = useSelector(skills);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const [formData, setFormData] = useState({
    fieldId:"",
    fieldName: "",
    fieldClient: "",
    fieldLinkGit: "",
    fieldLinkPrev: "",
  });
  const [fieldTags, setFieldTags] = useState([]);
  const [file, setFile] = useState(null);
  async function uploadImage() {
    const nameImage = "/" + uuidv4();
    const { data, error } = await supabase.storage
      .from("portfolio")
      .upload(nameImage, file);

    const publicUrl = supabase.storage
      .from("portfolio")
      .getPublicUrl(nameImage);
    fetchPost(publicUrl.data.publicUrl);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleChangeCheckbox = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFieldTags((prevTags) => [...prevTags, value]);
    } else {
      setFieldTags((prevTags) => prevTags.filter((tag) => tag !== value));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadImage();
    resetFormData();
  };
  const handleSubmitEdit = async (e)=>{
    e.preventDefault();
    const projects = JSON.stringify({
      id: formData.fieldId,
      name: formData.fieldName,
      client: formData.fieldClient,
      presentation: presentationContent,
      description: descriptionContent,
      linkgithub: formData.fieldLinkGit,
      linkpreview: formData.fieldLinkPrev,
      tags: JSON.stringify(fieldTags),
    });

    await dispatch(fetchEditProject(projects, ErrorAdd));
  }
  const resetFormData = () => {
    setFormData({
      fieldName: "",
      fieldClient: "",
      fieldPresentation: "",
      fieldDescription: "",
      fieldLinkGit: "",
      fieldLinkPrev: "",
    });
    setFile(null);
    setFieldTags([]);
  };
  async function fetchPost(dataId) {
    const projects = JSON.stringify({
      fieldName: formData.fieldName,
      fieldClient: formData.fieldClient,
      fieldPresentation: presentationContent,
      fieldDescription: descriptionContent,
      fieldLinkGit: formData.fieldLinkGit,
      fieldLinkPrev: formData.fieldLinkPrev,
      fieldTags: JSON.stringify(fieldTags),
      image: dataId,
    });

    await dispatch(fetchAddProject(projects, ErrorAdd));
  }
  const ErrorAdd = (message) => {
    console.log("Error " + message);
  };
  const m_project = useSelector(projects);
  useEffect(() => {
    if (projectEditable) { 
      const project = m_project.find((project) => project.id === projectEditable);
      const projectSkills = project.tags.map((skill) => skill.name);
      setFormData({
        fieldId: project.id,
        fieldName: project.name,
        fieldClient: project.client,
        fieldLinkGit: project.linkgithub,
        fieldLinkPrev: project.linkpreview,
      });
      setEditorDescriptionContent(project.description);
      setEditorPresentationContent(project.presentation);
      setFieldTags(projectSkills);
    }
  }, [projectEditable]);

  if(!projectEditable){
  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add Project
      </button>
      {showModal ? (
        <>
          <div className="">
            <div className="">
              {/*content*/}
              <div className="">
                {/*header*/}
                <div className="">
                  <h3 className="">Add Skills</h3>
                  <button className="" onClick={() => setShowModal(false)}>
                    <span className="">×</span>
                  </button>
                </div>
                {/*body*/}
                <div className="">
                  <form
                    onSubmit={handleSubmit}
                    className="modalskills--form"
                    encType="multipart/form-data"
                  >
                    <label>
                      Name:
                      <input
                        type="text"
                        name="fieldName"
                        value={formData.fieldName}
                        onChange={(e) => handleChange(e)}
                      />
                    </label>
                    <label>
                      Client:
                      <input
                        type="text"
                        name="fieldClient"
                        value={formData.fieldClient}
                        onChange={(e) => handleChange(e)}
                      />
                    </label>
                    <label>
                      Présentation:
                      <Editor
                        initialValue="<p>Contenu initial de l'éditeur</p>"
                        apiKey={APIKeyEditor}
                        init={{
                          height: 500,
                          menubar: false,
                          plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                          ],
                          toolbar:
                            "undo redo | formatselect | " +
                            "bold italic backcolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                        }}
                        onEditorChange={handlePresentationEditorChange}
                      />
                    </label>
                    <label>
                      Description:
                      <Editor
                        initialValue="<p>Contenu initial de l'éditeur</p>"
                        apiKey={APIKeyEditor}
                        init={{
                          height: 500,
                          menubar: false,
                          plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                          ],
                          toolbar:
                            "undo redo | formatselect | " +
                            "bold italic backcolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                        }}
                        onEditorChange={handleDescriptionEditorChange}
                      />
                    </label>
                    <label>
                      Lien Github:
                      <input
                        type="text"
                        name="fieldLinkGit"
                        value={formData.fieldLinkGit}
                        onChange={(e) => handleChange(e)}
                      />
                    </label>
                    <label>
                      Lien Preview:
                      <input
                        type="text"
                        name="fieldLinkPrev"
                        value={formData.fieldLinkPrev}
                        onChange={(e) => handleChange(e)}
                      />
                    </label>{" "}
                    <div className="modalproject--skills">
                      <label className="text-center">Langage / Framework</label>
                      <div className="modalproject--skills--checkbox">
                        {m_skills.map((skill, index) => (
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            <div className="form-check m-3">
                              {skill.name}
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="languages"
                                value={skill.name || ""}
                                id="flexCheckDefault"
                                onChange={(e) => handleChangeCheckbox(e)}
                              />
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                    <label>
                      Image:
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                    <input type="submit" value="Submit" />
                  </form>
                </div>
                {/*footer*/}
                <div className="">
                  <button
                    className=""
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className=""
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className=""></div>
        </>
      ) : null}
    </>
  );}
  else{
    return((
      <>
        <div className="">
          <div className="">
            {/*content*/}
            <div className="">
              {/*header*/}
              <div className="">
                <h3 className="">Edit Project</h3>
                <button className="" onClick={() => setShowModal(false)}>
                  <span className="">×</span>
                </button>
              </div>
              {/*body*/}
              <div className="">
                <form
                  onSubmit={handleSubmitEdit}
                  className="modalskills--form"
                  encType="multipart/form-data"
                >
                  <label>
                    Name:
                    <input
                      type="text"
                      name="fieldName"
                      defaultValue={formData.fieldName}
                      onChange={(e) => handleChange(e)}
                    />
                  </label>
                  <label>
                    Client:
                    <input
                      type="text"
                      name="fieldClient"
                      defaultValue={formData.fieldClient}
                      onChange={(e) => handleChange(e)}
                    />
                  </label>
                  <label>
                    Présentation:
                    <Editor
                      initialValue={presentationContent}
                      apiKey={APIKeyEditor}
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                          "undo redo | formatselect | " +
                          "bold italic backcolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help",
                      }}
                      onEditorChange={handlePresentationEditorChange}
                    />
                  </label>
                  <label>
                    Description:
                    <Editor
                      initialValue={descriptionContent}
                      apiKey={APIKeyEditor}
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                          "undo redo | formatselect | " +
                          "bold italic backcolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help",
                      }}
                      onEditorChange={handleDescriptionEditorChange}
                    />
                  </label>
                  <label>
                    Lien Github:
                    <input
                      type="text"
                      name="fieldLinkGit"
                      defaultValue={formData.fieldLinkGit}
                      onChange={(e) => handleChange(e)}
                    />
                  </label>
                  <label>
                    Lien Preview:
                    <input
                      type="text"
                      name="fieldLinkPrev"
                      defaultValue={formData.fieldLinkPrev}
                      onChange={(e) => handleChange(e)}
                    />
                  </label>{" "}
                  <div className="modalproject--skills">
                    <label className="text-center">Langage / Framework</label>
                    <div className="modalproject--skills--checkbox">
                      {m_skills.map((skill, index) => (
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          <div className="form-check m-3">
                            {skill.name}
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="languages"
                              value={skill.name || ""}
                              id="flexCheckDefault"
                              onChange={(e) => handleChangeCheckbox(e)}
                              checked={fieldTags.includes(skill.name)}
                            />
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                
                  <input type="submit" value="Submit" />
                </form>
              </div>
              {/*footer*/}
              <div className="">
                <button
                  className=""
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className=""
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=""></div>
      </>
    ))
  }
}
