import { useState } from 'react'
import './Collapse.sass'
import Image from 'next/image'
function Collapse({title, content}){
    const [isOpen, setIsOpen] = useState(false)
    return(
        <div className={`collapse ${isOpen ? "open" : ""}`}>
            <div className="collapse__header">
                <h2>{title}</h2>
                <button className="collapse__header-button" onClick={() => setIsOpen(!isOpen)}>
                <Image src="/assets/ArrowTop.webp" alt="Chevron" className={`chevron-up ${isOpen ? "open" : ""}`} width={25}
            height={15}/>
                </button>
            </div>
            <div className={`collapse__content ${isOpen ? "open" : ""}`} dangerouslySetInnerHTML={{ __html: content }} >
           
            </div>
        </div>
    )

}
export default Collapse