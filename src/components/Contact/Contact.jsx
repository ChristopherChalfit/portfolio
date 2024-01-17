"use client";
import { useState } from "react";
import * as React from "react";
import "./Contact.sass";
import { BebasNeue } from "@/lib/Font";
import { fetchPostContact } from "@/redux/actions/contacts.actions";
import { useDispatch } from "react-redux";
export default function Contact() {
  
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    tel: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(fetchPostContact(JSON.stringify(formData), "AddContact", ErrorGet));
    setFormData({
      name: "",
      email: "",
      subject: "",
      tel: "",
      message: "",
    });
  };
  const ErrorGet = (message) => {
    console.log(message);
  };
  return (
    <div className="contact" id="contact">
      <h2 className={`contact--head ${BebasNeue.className}`}>CONTACT</h2>
      <form onSubmit={handleSubmit} className="contact--form">
        <label className="name">
          Nom:
          <input
            type="text"
            name="name"
            placeholder="Votre nom ici"
            value={formData.name}
            onChange={handleChange}
            className="contact--input"
            required
          />
          <div className="line"></div>
        </label>
        <label className="email">
          E-mail:
          <input
            type="email"
            name="email"
            placeholder="Votre email ici"
            value={formData.email}
            onChange={handleChange}
            className="contact--input"
            required
          />
          <div className="line"></div>
        </label>
        <label className="tel">
          Numéro de téléphone:
          <input
            type="tel"
            name="tel"
            placeholder="Votre numéro"
            value={formData.tel}
            onChange={handleChange}
            className="contact--input"
            pattern="[0-9]{10}"
            required
          />
          <div className="line"></div>
        </label>
        <label className="subject">
          Sujet:
          <input
            type="text"
            name="subject"
            placeholder="Votre sujet ici"
            value={formData.subject}
            onChange={handleChange}
            className="contact--input"
            required
          />
          <div className="line"></div>
        </label>
        <label className="message">
          Message:
          <textarea
            type="text"
            name="message"
            placeholder="Votre message ici"
            value={formData.message}
            onChange={handleChange}
            className="message--area contact--input"
            required
          />
          <div className="line"></div>
        </label>
        <input type="submit" value="Envoyer" className="submit" />
      </form>
    </div>
  );
}
