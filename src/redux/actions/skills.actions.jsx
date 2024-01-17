import { ADD_SKILL, DELETE_SKILL, GET_SKILLS, UPDATE_SKILL } from "./types.actions";

export const getSkills = (skills) => {
  return {
    type: GET_SKILLS,
    payload: skills,
  };
};

export const addSkills = (skill) => {
  const parsedSkill = JSON.parse(skill);
  return {
    type: ADD_SKILL,
    payload: {
      name: parsedSkill.name,
      icon: parsedSkill.image,
    },
  };
};

export const DeleteSkill = (skillId) => {
  return {
    type: DELETE_SKILL,
    payload: {
      skillId
    },
  };
};
export const updateSkill = (skillName, isActif) => {
  return {
    type: UPDATE_SKILL,
    payload: {
      skillName,
      isActif,
    },
  };
};
export function fetchAddSkills(content, message, ErrorAdd) {
  return async (dispatch) => {
    try {
      const url = "/api/Skills";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Message-Type": message,
        },
        body: content,
      });
      const dataResponse = await response.json();
      switch (dataResponse.status) {
        case 400:
          ErrorAdd(dataResponse.message);
          break;
        case 200:
          if (message === "AddSkills") {
            dispatch(addSkills(content));
          }else if(message ==="UpdateActif"){
            const contenu = JSON.parse(content);
            dispatch(updateSkill(contenu.name,contenu.isActif))
          }

          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchGetSkills(ErrorGet) {
  return async (dispatch) => {
    try {
      const url = "/api/Skills";
      const response = await fetch(url, {
        method: "GET",
      });
      const dataResponse = await response.json();
      switch (dataResponse.status) {
        case 400:
          ErrorGet(dataResponse.message);
          break;
        case 200:
          const skills = dataResponse.body;
          dispatch(getSkills(skills));
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
}
export function fetchDeleteSkills(content, ErrorGet) {
  return async (dispatch) => {
    try {
      const url = "/api/Skills";
      const response = await fetch(url, {
        method: "DELETE",
        body: content,
      });
      const dataResponse = await response.json();
      switch (dataResponse.status) {
        case 400:
          ErrorGet(dataResponse.message);
          break;
        case 200:
          const contenu = JSON.parse(content);
          dispatch(DeleteSkill(contenu.id));
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
}
