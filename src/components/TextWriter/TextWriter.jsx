import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function TextWriter(){
    return(<>
    <span>
    <TypeAnimation
        sequence={[
          "Développeur",
          1200,
          "Passionné",
          1200,
          "Créatif",
          1200,
        ]}
        speed={30}
        repeat={Infinity}
        cursor={false}
      />
    </span>
    </>)
}