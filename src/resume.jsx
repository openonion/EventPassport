import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResumeComponent from "./components/resumeComponent";
import JobDescriptionInput from "./components/JobDescriptionInput";


import React from "react";
const Resume = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
       <div class="flex">
          <ResumeComponent counter={counter}/>
          <div>
            <JobDescriptionInput/>
            <button
              type="submit"
              onClick={() => setCounter(counter + 1)}
              className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit
            </button>          
          </div>
      </div>
    </>
   
  );
};

export default Resume;
