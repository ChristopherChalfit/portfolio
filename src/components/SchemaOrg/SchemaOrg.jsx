import React from 'react';

const SchemaOrg = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: `
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Christopher Chalafit",
        "url": "https://christopher-chalafit.fr/",
        "logo": "https://christopher-chalafit.fr/g5Eu1XCD.png",
        "sameAs": [
          "https://twitter.com/ChristChalafit9",
          "https://www.linkedin.com/in/christopher-chalafit-893873197/",
          "https://github.com/ChristopherChalfit",
          "https://christopher-chalafit.fr"
        ]
      }
      `,
    }}
  />
);

export default SchemaOrg;