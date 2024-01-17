import { DELETE_CONTACT, GET_CONTACTS, UPDATE_CONTACT } from "../actions/types.actions";

const initialState = {
  status: "VOID",
  contacts: [],
};
export const ContactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        status: "SUCCEEDED",
        contacts: action.payload,
      };
    case UPDATE_CONTACT:
      const updatedContact = state.contacts.map((contact) =>
        contact.id === action.payload.contactId
          ? { ...contact, isRead: action.payload.isRead }
          : contact
      );
      return {
        ...state,
        contacts: updatedContact,
      };
    case DELETE_CONTACT:
      const updatedContactsAfterDelete = state.contacts.filter(
        (contact) => contact.id !== action.payload.contactId
      );
      return {
        ...state,
        contacts: updatedContactsAfterDelete,
      };
      
    default:
      return state;
  }
};
