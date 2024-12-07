import { useEffect, useState } from "react";

import React from "react";
import Groq from "groq-sdk";


const JobDescriptionInput = ({counter, setCounter}) => {
  const [jobDescription, setJobDescription] = useState('');
  const handleChange = (event) => {
    setJobDescription(event.target.value);
  };

  useEffect(() => {
    // Check if "pag" exists in graphObj, otherwise use the first graph as default
    
  }, [jobDescription]); // This will run when graphObj is updated




  return (
    <>
      <div className="max-w-lg mx-auto p-4">
        <label
          // htmlFor="jobDescription"
          className="block text-lg font-semibold text-gray-700 mb-2"
        >
          Job Description
        </label>
        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={handleChange}
          rows="6"
          placeholder="Enter the job description here..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        />
        <p className="mt-2 text-sm text-gray-500">
          Please provide a detailed job description.
        </p>
        <button onClick={() => setCounter(counter + 1)}>Submit</button>
      </div>
    </>
  );
};

export default JobDescriptionInput;

const groqAPI = async (prompt) => {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
  

  async function getGroqChatCompletion() {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
    });
  }
}




