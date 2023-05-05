import React from "react";
import { useParams } from "react-router-dom";

export default function Products(props) {
  var a = useParams();
  console.log("------------------------------------");
  console.log(a);
  console.log("------------------------------------");
  return <h1> accessory </h1>;
}
