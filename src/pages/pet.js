import React from "react";
import { useParams } from "react-router-dom";

export default function Pet(props) {
  var a = useParams();
  console.log("------------------------------------");
  console.log(a);
  console.log("------------------------------------");
  return (
    <div>
      <h1>cat</h1>
    </div>
  );
}
