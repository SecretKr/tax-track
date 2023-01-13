import React from "react";

function Bill(props) {
  return (
    <div className="bill">
      <span className="bill-name">{props.name} </span>
      <span className="bill-price">{props.price} </span>
      <span className="bill-date">{props.date}</span>
      <button className="bill-delete" onClick={ () => props.deleteBill(props.id)}><i className="fa fa-trash"></i></button>
    </div>
  )
}
    
export default Bill