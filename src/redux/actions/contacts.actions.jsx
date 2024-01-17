import { DELETE_CONTACT, GET_CONTACTS, UPDATE_CONTACT } from "./types.actions";

export const getContacts = (contact) => {
  return {
    type: GET_CONTACTS,
    payload: contact,
  };
};

export const UpdateContact = (contactId, isRead) => {
  return {
    type: UPDATE_CONTACT,
    payload: {
      contactId,
      isRead,
    },
  };
};
export const DeleteContact = (contactId) => {
  return {
    type: DELETE_CONTACT,
    payload: {
      contactId
    },
  };
};
export function fetchGetContact(ErrorGet) {
  return async (dispatch) => {
    try {
      const url = "/api/contact";
      const response = await fetch(url, {
        method: "GET",
      });
      const dataResponse = await response.json();
      switch (dataResponse.status) {
        case 400:
          ErrorGet(dataResponse.message);
          break;
        case 200:
          const contact = dataResponse.body;
          dispatch(getContacts(contact));
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
}
export function fetchPostContact(content, message, ErrorGet) {
  return async (dispatch) => {
    try {
      const url = "/api/contact";
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
          ErrorGet(dataResponse.message);
          break;
        case 200:
          if (message === "EditContact") {
            const contenu = JSON.parse(content);
            dispatch(UpdateContact(contenu.id,contenu.isRead));
          }
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
}
export function fetchDeleteContact(content, ErrorGet) {
  return async (dispatch) => {
    try {
      const url = "/api/contact";
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: content,
      });
      const dataResponse = await response.json();
      switch (dataResponse.status) {
        case 400:
          ErrorGet(dataResponse.message);
          break;
        case 200:
          const contenu = JSON.parse(content);
          dispatch(DeleteContact(contenu.id));
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
}
