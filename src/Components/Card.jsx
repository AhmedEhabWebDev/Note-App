import React from "react";

export default function Card({children}) {


return<>
<div className="bg-danger p-3 w-25">
{children}
</div>
</>
}

Card.Heading = ({ children }) => {
  return <div className="p-3 bg-info">{children}</div>;
};
Card.Body = ({ children }) => {
  return <div className="p-3 bg-success">{children}</div>;
};
Card.Footer = ({ children }) => {
  return <div className="p-3 bg-primary">{children}</div>;
};
