import { ADD_PROJECT, GET_PROJECTS, UPDATE_PROJECT } from "./types.actions";

export const getProjects = (projects) => {
  return {
    type: GET_PROJECTS,
    payload: projects,
  };
};

export const addProject = (project) => {

  return {
    type: ADD_PROJECT,
    payload: project,
  };
};
export const updateProject = (project) => {
  return {
    type: UPDATE_PROJECT,
    payload: {
      project
    },
  };
};
export function fetchAddProject(content, ErrorAdd) {
  return async (dispatch) => {
    try {
      const url = "/api/Projects";
      const response = await fetch(url, {
        method: "POST",
        body: content,
      });
      const dataResponse = await response.json();
      switch (dataResponse.status) {
        case 400:
          ErrorAdd(dataResponse.message);
          break;
        case 200:
          const projects = dataResponse.body;
          dispatch(addProject(projects));
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
}
export function fetchEditProject(content, ErrorAdd) {
  return async (dispatch) => { 
    try {
      const url = "/api/Projects";
      const response = await fetch(url, {
        method: "PUT",
        body: content,
      });
      const dataResponse = await response.json();
      switch (dataResponse.status) {
        case 400:
          ErrorAdd(dataResponse.message);
          break;
        case 200:
          const updatedProject = JSON.parse(content);
          dispatch(updateProject(updatedProject));
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
}
export function fetchGetProjects(ErrorGet) {
  return async (dispatch) => {
    try {
      const url = "/api/Projects";
      const response = await fetch(url, {
        method: "GET",
      });
      const dataResponse = await response.json();
      switch (dataResponse.status) {
        case 400:
          ErrorGet(dataResponse.message);
          break;
        case 200:
          const projects = dataResponse.body;
          dispatch(getProjects(projects));
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
}
