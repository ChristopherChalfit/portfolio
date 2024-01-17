import {
  ADD_PROJECT,
  GET_PROJECTS,
  UPDATE_PROJECT,
} from "../actions/types.actions";

const initialState = {
  status: "VOID",
  projects: [],
};
export const ProjectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        status: "SUCCEEDED",
        projects: action.payload,
      };
    case ADD_PROJECT:
      return {
        ...state,
        status: "ADDED",
        projects: action.payload,
      };
    case UPDATE_PROJECT:
      console.log(action.payload.project.name);
      const updatedProject = state.projects.map((project) =>
        project.id === action.payload.project.id
          ? {
              ...project,
              name: action.payload.project.name,
              client: action.payload.project.client,
            }
          : project
      );
      console.log(updatedProject);
      return {
        ...state,
        projects: updatedProject,
      };
    default:
      return state;
  }
};
