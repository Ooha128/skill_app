import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import NavBar from "../NavBar";

export default function EditProblem() {
  const [form, setForm] = useState({
    qsnId: "",
    title: "",
    difficulty:"",
    description: "",
    inputFormat: "",
    outputFormat:"",
    SampleInput: [],
    SampleOutput: [],
    testCases: {}
  });
  const params = useParams();
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState([{
    input:[],output:[]
} ]);
const handleFormChange = (index, event) => {
  let data = [...inputFields];
  data[index][event.target.name] = event.target.value.split(",");
  setInputFields(data);
  }
const addFields = () => {
    let newfield = { input:[],output:[] }
    setInputFields([...inputFields, newfield])
}
const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1)
    setInputFields(data)
}
  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5001/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedQsn = {
      qsnId: form.qsnId,
    title: form.title,
    difficulty:form.difficulty,
    description: form.description,
    inputFormat: form.inputFormat,
    outputFormat:form.outputFormat,
    SampleInput: form.SampleInput,
    SampleOutput: form.SampleOutput,
    testCases: form.testCases
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5001/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedQsn),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <>
    <div>
      <NavBar/>
    </div>
    <div class="m-5">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-black">Update Record</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label class="block text-sm font-medium text-gray-700" htmlFor="name">Question ID</label>
          <input
            type="text"
            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
            id="name"
            value={form.qsnId}
            onChange={(e) => updateForm({ qsnId: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label class="block text-sm font-medium text-gray-700" htmlFor="position">Question Title</label>
          <input
            type="text"
            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
            id="position"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label class="block text-sm font-medium text-gray-700" htmlFor="position">Description</label>
          <textarea
            type="text"
            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
            id="position"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label class="block text-sm font-medium text-gray-700" htmlFor="position">Input Format</label>
          <textarea
            type="text"
            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
            id="position"
            value={form.inputFormat}
            onChange={(e) => updateForm({ inputFormat: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label class="block text-sm font-medium text-gray-700" htmlFor="position">Output Format</label>
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
            <label class="block text-sm font-medium text-gray-700" htmlFor="difficultyEasy" className="form-check-label">Easy</label>
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
            <label class="block text-sm font-medium text-gray-700" htmlFor="difficultyMedium" className="form-check-label">Medium</label>
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
            <label class="block text-sm font-medium text-gray-700" htmlFor="difficultyHard" className="form-check-label">Hard</label>
          </div>
        </div>
        <div className="mb-4">
        <label class="block text-sm font-medium text-gray-700">Sample Input: </label>&nbsp;
          <input
              name='sampleInput'
              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
              value={form.SampleInput}
              onChange={(e) => updateForm({ SampleInput: e.target.value })}
          />            
        </div>
        <div>
        <label class="block text-sm font-medium text-gray-700"> Sample Output: </label> &nbsp;
          <input
              name='sampleOutput'
              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
              value={form.SampleOutput}
              onChange={(e) => updateForm({ SampleOutput: e.target.value })}
          />
        </div>
        <div className="mb-4" onChange={(e) => updateForm({ testCases: inputFields })}>
        <label class="block text-sm font-medium text-gray-700" htmlFor="position">Add more Test Cases (Note: Enter space seperated values)</label>
        {inputFields.map((tc, index) => {
                    return (
                        <div key={index}>

                            <label>Test Case# {index+1} &nbsp; Input: </label> &nbsp;
                        <input
                        className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                        type="text"
                            name='input'
                            value={tc.input}
                            onChange={event => handleFormChange(index, event)}
                        /> &nbsp;
                         <label>Output: </label> &nbsp;
                        <input
                        className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                        type="text"
                            name='output'
                            value={tc.output}
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
            value="Update Record"
            className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600"
          />
        </div>
      </form>
    </div>
    </>
  );
}
