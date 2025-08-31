import React, { useState } from "react";

// Question Components
const TrueFalseQuestion = ({ index }) => (
  <div className="p-2 border rounded bg-white mb-3 shadow-sm">
    <p className="font-semibold">Q{index + 1}: True / False</p>
    <label className="mr-4">
      <input type="radio" name={`q${index}`} /> True
    </label>
    <label>
      <input type="radio" name={`q${index}`} /> False
    </label>
  </div>
);

const MultipleChoiceQuestion = ({ index }) => (
  <div className="p-2 border rounded bg-white mb-3 shadow-sm">
    <p className="font-semibold">Q{index + 1}: Multiple Choice</p>
    <label className="block">
      <input type="checkbox" /> Option A
    </label>
    <label className="block">
      <input type="checkbox" /> Option B
    </label>
    <label className="block">
      <input type="checkbox" /> Option C
    </label>
  </div>
);

const ShortAnswerQuestion = ({ index }) => (
  <div className="p-2 border rounded bg-white mb-3 shadow-sm">
    <p className="font-semibold">Q{index + 1}: Short Answer</p>
    <input
      type="text"
      placeholder="Enter answer here..."
      className="border p-1 w-full rounded"
    />
  </div>
);

const Side = () => {
  const [sections, setSections] = useState([{ id: 1, questions: [] }]);
  const [activeSection, setActiveSection] = useState(0);
  const [PreviewCoverPage, setPreviewCoverPage] = useState(false)

  const questionTypes = [
    { id: 1, type: "Multiple Choice", component: MultipleChoiceQuestion },
    { id: 2, type: "True/False", component: TrueFalseQuestion },
    { id: 3, type: "Short Answer", component: ShortAnswerQuestion },
  ];

  // Add a question to the active section
  const addQuestion = (questionType) => {
    setSections((prev) =>
      prev.map((sec, i) =>
        i === activeSection
          ? { ...sec, questions: [...sec.questions, questionType] }
          : sec
      )
    );
  };

  // Add new section
  const addSection = () => {
    const newSections = [...sections, { id: sections.length + 1, questions: [] }];
    setSections(newSections);
    setActiveSection(newSections.length - 1);
  };

  return (
    <div className="flex h-screen p-4 gap-4 bg-gray-100">
      {/* LEFT TOOLBOX */}
      <div className="w-56 border p-3 bg-white shadow rounded">
        <h3 className="font-bold mb-3 text-lg">Question Types</h3>
        {questionTypes.map((q) => (
          <button
            key={q.id}
            className="block w-full bg-gray-200 rounded p-2 my-1 hover:bg-gray-300 transition"
            onClick={() => addQuestion(q)}
          >
            ➕ {q.type}
          </button>
        ))}
        <button
          onClick={addSection}
          className="block w-full bg-green-400 text-white font-semibold rounded p-2 my-2 hover:bg-green-500 transition"
        >
          + Add Section
        </button>
      </div>

      {/* CENTER: BUILDER */}
      <div className="flex-1 border p-4 bg-white rounded shadow overflow-y-auto">
        {sections.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-xl mb-3">
              Section {activeSection + 1} of {sections.length}
            </h4>
            {sections[activeSection].questions.length === 0 && (
              <p className="text-gray-500 italic">No questions added yet...</p>
            )}
            {sections[activeSection].questions.map((q, qIndex) => {
              const Component = q.component;
              return <Component key={qIndex} index={qIndex} />;
            })}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setActiveSection((prev) => Math.max(prev - 1, 0))}
            disabled={activeSection === 0}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            ← Back
          </button>
          <button
            onClick={() =>
              setActiveSection((prev) => Math.min(prev + 1, sections.length - 1))
            }
            disabled={activeSection === sections.length - 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      </div>

      {/* RIGHT: LIVE PREVIEW */}
      <div className="w-72 border bg-white shadow rounded relative">
        <div className="p-3">
          <h3 onClick={()=>setPreviewCoverPage(!PreviewCoverPage)} className="font-bold mb-3 text-lg">📄 Assignment Preview</h3>
            {sections.map((sec, i) => (
              <div key={sec.id} className="mb-4">
                <h4 className="font-semibold">Section {i + 1}</h4>
                {sec.questions.map((q, idx) => (
                  <p key={idx} className="text-sm text-gray-700">
                    • {q.type} Question
                  </p>
                ))}
              </div>
            ))}
        </div>
        <div onClick={() => setPreviewCoverPage(false)}
        className={`absolute top-0 bg-purple-500 text-white flex items-center justify-center rounded-lg origin-right transition-all duration-700 ease-in-out
        ${PreviewCoverPage ? "w-full h-full opacity-100 scale-100" : "w-0 h-0 opacity-0 scale-0"}`}
      >
        {PreviewCoverPage && <p className="p-4">Hello, I expanded!</p>}
      </div>
      </div>
    </div>
  );
};

export default Side;
