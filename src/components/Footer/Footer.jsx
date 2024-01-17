import Image from "next/image";
import "./Footer.sass";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer--name">
        <p>Chalafit Christopher</p>
        <p><Link href="mailto:christopher.chalafit@laposte.net" target="_blank">christopher.chalafit@laposte.net</Link></p>
      </div>
      <div className="footer--arrow">
        <Link href="#navbar">
          <Image src="/assets/Arrow.png" alt="Logo" width={25} height={25} />
        </Link>
      </div>
      <div className="footer--icon">
        <Link href="https://github.com/ChristopherChalfit" target="_blank" aria-label="Lien de mon Github">
          <Image src="/assets/github.png" alt="Logo" width={25} height={25} />
        </Link>
        <Link href="https://twitter.com/ChristChalafit9" target="_blank"aria-label="Lien de mon Twitter">
          {' '}
        <FontAwesomeIcon icon={faXTwitter} className="footer--icon--fa"/>
        </Link>
        <Link href="https://www.linkedin.com/in/christopher-chalafit-893873197" target="_blank" aria-label="Lien de mon Linkedin">
          <Image src="/assets/linkedin.png" alt="Logo" width={25} height={25} />
        </Link>
      </div>
    </footer>
  );
}
