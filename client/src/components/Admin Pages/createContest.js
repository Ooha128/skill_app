import React, { useState } from "react";
import { useNavigate } from "react-router";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import NavBar from "../NavBar";

function CreateContest() {
    const [form, setForm] = useState({
        code: "",
        name: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        organizationName: ""
      });
      const navigate = useNavigate();
      // These methods will update the state properties.
      function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, ...value };
        });
      }
    // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    console.log(e);
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newContest = { ...form };

    await fetch("http://localhost:5001/contests/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContest),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ code: "",
    name: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    organizationName: "" ,
    questions:[]});
    navigate("/contests");
  }
    return (<>
    <NavBar/>
        <section className="w-full h-screen relative top-40 left-30 ">
            <div className="w-1/2 justify-items-center m-auto ">
            <h1 className="font-heading text-5xl">CREATE CONTEST</h1>
            <br /><br /><br />
            <p className="italic text-gray-400">Host your own coding contest. You can practice and compete with friends from your organization or school. Select from our library of over 1,500 coding challenges or create your own.

Get started by providing the initial details for your contest.</p>
<br /><br /><br /><br />

<Box className="w-full"
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '75ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="w-full">
      <TextField fullWidth
          required
          id="outlined-required fullWidth outlined-multiline-flexible"
          label="Contest Code "
          value={form.code}
          onChange={(e) => updateForm({ code: e.target.value })}
          defaultValue=""
        />
        
        <br />
        <TextField fullWidth
          required
          id="outlined-required fullWidth outlined-multiline-flexible"
          label="Contest Name "
          value={form.name}
          onChange={(e) => updateForm({ name: e.target.value })}
          defaultValue=""
        />
        
        <br />
        <TextField fullWidth
          required
          id="outlined-required fullWidth"
          label="Start Date"
          type="date"
          value={form.startDate}
          onChange={(e) => updateForm({ startDate: e.target.value })}
          defaultValue=""
        />
        <br />
        <TextField
          id="outlined-password-input"
          label="end Date"
          type="date"
          value={form.endDate}
          onChange={(e) => updateForm({ endDate: e.target.value })}
          autoComplete="current-password"
        />
        <TextField fullWidth
          required
          id="outlined-required fullWidth"
          label="Start time"
          value={form.startTime}
          onChange={(e) => updateForm({ startTime: e.target.value })}
          type="time"
          defaultValue=""
          
        />
        <br />
        <TextField fullWidth
          required
          id="outlined-required fullWidth endTime"
          label="End time"
          value={form.endTime}
          onChange={(e) => updateForm({ endTime: e.target.value })}
          type="time"
          defaultValue=""
        />
        <br />
        <TextField fullWidth
          required
          id="outlined-required fullWidth"
          label="Organization Name"
          value={form.organizationName}
          onChange={(e) => updateForm({ organizationName: e.target.value })}
          type="text"
          defaultValue=""
        />
        <br />
        <br />
        <Button type="submit" variant="contained" size="large" onSubmit={onSubmit} href="/addChallenge/${props.record._id}">
                        Create Contest
        </Button>
      </div>
      </Box>
            </div>
        </section>
    </>
    );
};

export default CreateContest;