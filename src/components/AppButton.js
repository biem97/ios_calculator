import React from 'react';

export default function AppButton(props) {
    const classType = props.type === "function" ? "btn-function": (props.type === "expression" ? "btn-expression" : (props.type === "number" && props.value === "0" ? "btn-number btn-zero" : "btn-number"));
    
    return(
      <button className={classType} onClick={props.onClick} value={props.value}>
        {props.value}
      </button>
    );

}