import React from "react";
import { useParams } from "react-router-dom";
const AllDoctors = () => {
  const { speciality } = useParams();

  if (speciality === "General physician") {
    return (
      <>
        <div>general physcianhello amer</div>
        <h1>specaility={speciality}</h1>
      </>
    );
  }

  return (
    <>
      <div>AllDoctors page</div>
    </>
  ); 
};

export default AllDoctors;
