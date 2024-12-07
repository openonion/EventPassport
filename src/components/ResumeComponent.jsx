import { useEffect, useState } from "react";

import React from "react";

const ResumeComponent = ({counter}) => {
  const [eventName1, setEventName1] = useState('UNIHACK');
  const [event1Skill1, setevent1Skill1] = useState('Developed Application using Next JS and deployed on Vercel');
  const [event1Skill2, setevent1Skill2] = useState('Worked in a team');


  const [eventName2, setEventName2] = useState('DevSoc BluePrint Hackathon');
  const [event2Skill1, setevent2Skill1] = useState('Developed Application using Next JS and deployed on Vercel');
  const [event2Skill2, setevent2Skill2] = useState('Worked in a team');

  useEffect(() => {
    console.log(counter);
    if (counter > 0) {
      setEventName1('Language translation Hackathon');
      setEventName2('ED Tech');
      setevent1Skill1('Developed a Marian model LLM that can translate from English to Italian');
      setevent1Skill2('Trained the LLM using corpus dataset');
      setevent2Skill1('Used Groq API to suggest projects for resume');
      setevent2Skill2('Used Groq AI API to group skills learned from competitions, projects and events');
    } else {
      console.log('counter is ', counter);
    }
  }, [counter])
  return (
    <div className="font-sans bg-gray-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">John Doe</h1>
            <p className="text-xl text-gray-600">Full Stack Developer</p>
            <p className="text-gray-500 mt-2">john.doe@email.com</p>
            <p className="text-gray-500">www.johndoe.com</p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://linkedin.com/in/johndoe"
              className="text-blue-500 hover:text-blue-700"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/johndoe"
              className="text-gray-700 hover:text-gray-900"
            >
              GitHub
            </a>
          </div>
        </header>
        {/* Projects */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Experience</h2>
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-700">{eventName1}</h3>
                <p className="text-gray-500">February 2024</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>{event1Skill1}</li>
                  <li>{event1Skill2}</li>
                </ul>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-700">{eventName2}</h3>
                <p className="text-gray-500">December 2024</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>{event2Skill1}</li>
                  <li>{event2Skill2}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Education</h2>
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Bachelor of Science in Computer Science</h3>
            <p className="text-gray-500">UNSW</p>
            <p className="text-gray-500">Graduated: May 2025</p>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <span className="bg-gray-100 px-4 py-2 rounded-full text-gray-700">React</span>
            <span className="bg-gray-100 px-4 py-2 rounded-full text-gray-700">Tailwind CSS</span>
            <span className="bg-gray-100 px-4 py-2 rounded-full text-gray-700">Node.js</span>
            <span className="bg-gray-100 px-4 py-2 rounded-full text-gray-700">JavaScript</span>
            <span className="bg-gray-100 px-4 py-2 rounded-full text-gray-700">Git</span>
            <span className="bg-gray-100 px-4 py-2 rounded-full text-gray-700">SQL</span>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact</h2>
          <p>If you're interested in working with me, feel free to contact me via email: <strong>john.doe@email.com</strong></p>
        </section>
      </div>
    </div>
  );
};

export default ResumeComponent;


