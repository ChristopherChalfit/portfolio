"use client";
import Image from "next/image";
import "./Presentation.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPeace } from "@fortawesome/free-solid-svg-icons";
import TextWriter from "../TextWriter/TextWriter";
export default function Presentation() {
  return (
    <div>
      <p className="presentation--textWriter"><TextWriter/></p>
      <div className="presentation">
        
        <div className="presentation--head">
        
          <h2>
            Salut
            <FontAwesomeIcon icon={faHandPeace} />
          </h2>
          <p>Je m'appelle</p>
          <p className="presentation--name">Christopher Chalafit</p>
          <p>Je développe des sites pour vous</p>
          
        </div>
        <Image
          src="/assets/Profil.png"
          className="presentation--image"
          alt="Ma photo de présentation"
          width={515}
          height={440}
        />
      </div>
      <div className="presentation--text" id="about">
        <h2>Je m'appelle Christopher</h2>
        <p>
          Passionné d'informatique et de développement, j'ai commencé a
          développé très jeune, j'ai fait des sites web, des applications et
          j'ai enfin décidé après plusieurs années, de me reconvertir au métier
          du web, le Développement Web. Aillant suivi une formation et étant
          passionnée, j'ai pris plaisir à faire cette formation pour en
          apprendre plus sur le métier du web et afin d'acquérir des
          compétences. En effet, cette formation m'a permis de réaliser des
          projets avec React, Sass, Node.JS et Redux. N'hésitez pas à parcourir
          mon portfolio et prendre contact si vous souhaitez collaborer ou tout
          bien discuté de projet. Je serais enchanté de vous répondre.
        </p>
      </div>
    </div>
  );
}
