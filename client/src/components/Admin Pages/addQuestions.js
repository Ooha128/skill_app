import React, { useState } from "react";
import NavBar from "../NavBar";

import Button from '@mui/material/Button';

export default function AddQuestion() {
    const [inputFields, setInputFields] = useState([{id:1,
        addMcq:[],coding:[]
    } ]);
    const addFields = () => {
        let newfield = { addMcq:[],coding:[] }
        setInputFields([...inputFields, newfield])
    }
    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }
    return (
        <>
        <div><NavBar/></div>
          <div className="mb-4 inline">
        <label class="block text-sm font-medium text-gray-700">Add Questions</label>
        {inputFields.map((input, index) => {
                    return (
                        <div key={index} >
                             <label class="block text-sm font-medium text-gray-700">Question# {index+1} &nbsp; Input: </label> &nbsp;
                        
                             <div className="flex flex-col ">
      <div>
        <Button className="mr-4 bg-blue-900 hover:bg-blue-800 text-white hover:text-gray-300 font-bold py-2 px-4 rounded" href='/addMcq'>
          Add MCQ
        </Button>
        <Button className="bg-blue-900 hover:bg-blue-800 text-white  hover:text-gray-300 font-bold py-2 px-4 rounded" href="/addCodingQsn">
          Add Coding Question
        </Button>
      </div>
    </div>
                        <input type="button" value="add" className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600" onClick={addFields}/>  &nbsp;&nbsp;
                        <input type="button" value="remove" className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600" onClick={() => removeFields(index)}/>
                      
                        </div>
                    )
                    })}
            </div>  
        </>
    )
}