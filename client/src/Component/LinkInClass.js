// import React from "react";

// function LinkInClass(props){
//     return(
//         <span tabIndex="0" role="button"  className={props.className} onClick={(event) => props.onClick(event)}>
//             {props.value}
//         </span>
//     )    
// }

// export default LinkInClass;

import React from "react";
import { Link } from "react-router-dom";

function LinkInClass(props) {
  return (
    <Link to={props.to} className={props.className}>
      {props.children}
    </Link>
  );
}

export default LinkInClass;

