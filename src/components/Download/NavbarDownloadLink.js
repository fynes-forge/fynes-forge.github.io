import React from "react";
import Link from "@docusaurus/Link"; // Or just a plain <a> tag

function NavbarDownloadLink({ label, href, filename }) {
  return (
    <Link
      className="navbar__item navbar__link" // Apply Docusaurus navbar styling
      to={href}
      download={filename || true} // Use the download attribute
    >
      {label}
    </Link>
  );
}

export default NavbarDownloadLink;
