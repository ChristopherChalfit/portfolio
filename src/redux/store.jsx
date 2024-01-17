import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {skillsReducer }from './reducers/skills.reducer.jsx';
import {ProjectsReducer} from './reducers/projects.reducer.jsx';
import {userReducer} from './reducers/user.reducer.jsx';
import { Provider, useSelector } from 'react-redux';
import { ContactsReducer } from './reducers/contacts.reducer.jsx';

const rootReducer = combineReducers({
   skills: skillsReducer,
   projects: ProjectsReducer,
   user: userReducer,
   contacts: ContactsReducer
})

const store = configureStore({
    reducer: rootReducer,
    devTools: true 
})
export const projects = (state) => state.projects.projects;
export const contacts = (state) => state.contacts.contacts;
export const skills = (state) => state.skills.skills;
export default store;

    