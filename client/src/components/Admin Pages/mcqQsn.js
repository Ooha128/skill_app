import React from "react";
//import LabTabs from "./tabs";
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import TextEditor from "./textEditor";
import NavBar from "../NavBar";

export default function AddMcq() {
    return (
        <>
        <NavBar/>
        <div className="justify-items-center m-auto ">
            <h1 className="font-heading text-5xl text-center">ADD MCQ's</h1>
            {/* {LabTabs()} */}
            <p className="italic text-gray-400 w-1/2 text-center m-auto">Host your own coding contest on HackerRank. You can practice and compete with friends from your organization or school. Select from our library of over 1,500 coding challenges or create your own.

Get started by providing the initial details for your contest.</p>
<br /><br />

            <Box className="w-11/12 m-auto"
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '70ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div className="">
                    <div className="m-auto h-48">
                        <h1 className="font-bold h-10">MCQ : </h1>
                        <div className="m-auto w-11/12">{TextEditor()}</div>
                    </div>
                    <div className="m-auto h-48">
                        <h1 className="font-bold h-10">MCQ Description : </h1>
                        <div className="m-auto w-11/12">{TextEditor()}</div>
                    </div>
                    
                    <div>
                        <h1 className="flex">Options<h6>(Check the corect answer) :</h6></h1>
                        <div className="grid grid-cols-2 h-48 p-5">
                            <div>
                                <input type="checkbox" className="accent-green-500 justify-item" />
                                <TextField fullWidth
                                    required
                                    id="outlined-required fullWidth"
                                    label="Option 1"
                                    type="text"
                                    defaultValue=""
                                />
                            </div>
                            <div>
                                <input type="checkbox" className="accent-green-500" />
                                <TextField fullWidth
                                    required
                                    id="outlined-required fullWidth"
                                    label="Option 2"
                                    type="text"
                                    defaultValue=""
                                />
                            </div>
                            <div>
                                <input type="checkbox" className="accent-green-500" />
                                <TextField fullWidth
                                    required
                                    id="outlined-required fullWidth"
                                    label="Option 3"
                                    type="text"
                                    defaultValue=""
                                />
                            </div>
                            <div>
                                <input type="checkbox" className="accent-green-500" />
                                <TextField fullWidth
                                    required
                                    id="outlined-required fullWidth"
                                    label="Option 4"
                                    type="text"
                                    defaultValue=""
                                />
                            </div></div>
                    </div>
                    <div className="p-7">
                    <h1 className="font-bold">Marks </h1>
                    <TextField fullWidth
                        required
                        id="outlined-required fullWidth"
                        label="Marks"
                        type="number"
                        defaultValue="0"
                    />
                    </div>
                    
                    <Button variant="contained" size="large">
                        Add MCQ
                    </Button>
                </div>
            </Box>
            </div>
        </>
    )
}