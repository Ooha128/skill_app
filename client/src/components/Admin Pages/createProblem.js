import React, { useState } from "react";
import { useNavigate } from "react-router";
import NavBar from "../NavBar";
export default function CreateProblem() {
  const [form, setForm] = useState({
    qsnId: "",
    title: "",
    difficulty: "",
    description: "",
    inputFormat: "",
    outputFormat: "",
    SampleInput: [],
    SampleOutput: [],
    testCases: []
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  const [inputFields, setInputFields] = useState([{id:1,
    input:[],output:[]
} ]);

const addFields = () => {
    let newfield = { input:[],output:[] }
    setInputFields([...inputFields, newfield])
}
const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1)
    setInputFields(data)
}
const handleFormChange = (index, event) => {
let data = [...inputFields];
data[index][event.target.name] = event.target.value;
setInputFields(data);
}
  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newQsn = { ...form };

    await fetch("http://localhost:5001/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQsn),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ qsnId: "",
    title: "",
    difficulty: "",
    description: "",
    inputFormat: "",
    outputFormat: "",
    SampleInput: [],
    SampleOutput: [],
    testCases: []});
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
    <div>
        <NavBar/>
    </div>
    
    <div class="m-5">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-black">Create New Question</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label class="block text-sm font-medium text-gray-700">Question ID</label>
          <input
            type="text"
            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
            id="name"
            value={form.qsnId}
            onChange={(e) => updateForm({ qsnId: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label class="block text-sm font-medium text-gray-700">Question Title</label>
          <input
            type="text"
            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
            id="position"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            type="text"
            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
            id="position"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label class="block text-sm font-medium text-gray-700">Input Format</label>
          <textarea
            type="text"
            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
            id="position"
            value={form.inputFormat}
            onChange={(e) => updateForm({ inputFormat: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label class="block text-sm font-medium text-gray-700">Output Format</label>
          <textarea
            type="text"
            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
            id="position"
            value={form.outputFormat}
            onChange={(e) => updateForm({ outputFormat: e.target.value })}
          />
        </div>
        <div className="mb-4">
        <lable class="block text-sm font-medium text-gray-700">Difficulty</lable> &nbsp; &nbsp;
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="Difficulty"
              id="difficultyEasy"
              value="Easy"
              checked={form.difficulty === "Easy"}
              onChange={(e) => updateForm({ difficulty: e.target.value })}
            />
            <label class="difficultyEasy" className="form-check-label"> Easy</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="Difficulty"
              id="difficultyMedium"
              value="Medium"
              checked={form.difficulty === "Medium"}
              onChange={(e) => updateForm({ difficulty: e.target.value })}
            />
            <label class="difficultyMedium" className="form-check-label"> Medium</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="Difficulty"
              id="difficultyHard"
              value="Hard"
              checked={form.difficulty === "Hard"}
              onChange={(e) => updateForm({ difficulty: e.target.value })}
            />
            <label class="difficultyHard" className="form-check-label"> Hard</label>
          </div>
        </div>
        <div className="mb-4">
        <label class="block text-sm font-medium text-gray-700">Sample Input: </label>&nbsp;
          <input
              name='sampleInput'
              value={form.SampleInput}
              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
              onChange={(e) => updateForm({ SampleInput: e.target.value})}
          />            
        </div>
        <div>
        <label class="block text-sm font-medium text-gray-700"> Sample Output: </label> &nbsp;
          <input
              name='output'
              value={form.SampleOutput}
              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
              onChange={(e) => updateForm({ SampleOutput: e.target.value })}
          />
        </div>
        <div className="mb-4 inline" onChange={(e) => updateForm({ testCases: inputFields })}>
        <label class="block text-sm font-medium text-gray-700">Test Cases (Note: Enter space seperated values)</label>
        {inputFields.map((input, index) => {
                    return (
                        <div key={index} >
                             <label class="block text-sm font-medium text-gray-700">Test Case# {index+1} &nbsp; Input: </label> &nbsp;
                        <input
                        type="text"
                            name='input'
                            placeholder='input'
                            value={input.input}
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                            onChange={event => handleFormChange(index, event)}
                        /> &nbsp;
                         <label class="block text-sm font-medium text-gray-700">Output: </label> &nbsp;
                        <input
                        type="text"
                            name='output'
                            placeholder='output'
                            value={input.output}
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                            onChange={event => handleFormChange(index, event)}
                        />&nbsp;&nbsp;
                        <input type="button" value="add" className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600" onClick={addFields}/>  &nbsp;&nbsp;
                        <input type="button" value="remove" className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600" onClick={() => removeFields(index)}/>
                      
                        </div>
                    )
                    })}
            </div>  
        <div className="mb-4">
          <input
            type="submit"
            value="Add Qsn"
            className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600"
          />
        </div>
      </form>
    </div>
    </>
  );
}
