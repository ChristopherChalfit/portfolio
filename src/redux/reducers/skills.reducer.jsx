import {
  ADD_SKILL,
  DELETE_SKILL,
  GET_SKILLS,
  UPDATE_SKILL,
} from "../actions/types.actions";

const initialState = {
  status: "VOID",
  skills: [],
};
export const skillsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SKILLS:
      return {
        ...state,
        status: "SUCCEEDED",
        skills: action.payload,
      };
    case ADD_SKILL:
      const newSkills = [...state.skills, action.payload];
      return {
        ...state,
        status: "ADDED",
        skills: newSkills,
      };
    case UPDATE_SKILL:
      const updatedSkills = state.skills.map((skill) =>
        skill.name === action.payload.skillName
          ? { ...skill, isActif: action.payload.isActif }
          : skill
      );
      return {
        ...state,
        skills: updatedSkills,
      };
    case DELETE_SKILL:
      const updatedContactsAfterDelete = state.skills.filter(
        (skill) => skill.id !== action.payload.skillId
      );
      return {
        ...state,
        skills: updatedContactsAfterDelete,
      };

    default:
      return state;
  }
};
