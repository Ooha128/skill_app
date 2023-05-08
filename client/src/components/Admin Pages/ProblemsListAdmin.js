import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import NavBar from "../NavBar";
import Filter from "../ProblemsList/filter";
function banner(dif)
{
    if(dif==="Easy")
    {
        return <span class="inline-block shadow-md py-3 px-3 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-600 text-white rounded ml-2">Easy</span>;
    }
    else if(dif==="Medium")
    {
        return <span class="inline-block shadow-md py-2.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-orange-600 text-white rounded ml-2">Medium</span>;
    }
    else{
        return <span class="inline-block shadow-md py-3 px-3 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded ml-2">Hard</span>;
    }
}
const Record = (props) => (
  <tr>
    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{props.index+1}</td>
    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{props.record.title}</td>
    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{banner(props.record.difficulty)}</td>
    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{props.record.qsnId}</td>
    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      <Link className="btn btn-link" to={`/editProblem/${props.record._id}`}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"> <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/> <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/> </svg></Link>
      <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"> <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/> </svg>
     </button>
    </td>
  </tr>
);

export default function ProblemsListAdmin() {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5001/record/`);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return; 
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5001/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return currentRecords.map((record,index) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
          index={index}
        />
      );
    });
  }
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(records.length / recordsPerPage);
  // This following section will display the table with the records of individuals.
  return (
    <>
    <div>
      <NavBar/>
    </div>
    <div class="m-5 inline-block">
      <h1 class="text-xl font-semibold">Questions List</h1>
      </div>
      <span className="flex">
        <div className="w-screen">
        <table class="m-5 px-4 w-3/4 border-2 border-black z-10 rounded-md text-center" >
        <thead class="bg-white border-b">
          <tr>
            <th class="text-sm font-medium text-gray-900 px-6 py-4 text-center">Qsn #</th>
            <th class="text-sm font-medium text-gray-900 px-6 py-4 text-center">Title</th>
            <th class="text-sm font-medium text-gray-900 px-6 py-4 text-center">Difficulty</th>
            <th class="text-sm font-medium text-gray-900 px-6 py-4 text-center">Qsn ID</th>
            <th class="text-sm font-medium text-gray-900 px-6 py-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
        </div>
        <div className="relative -top-10 -left-10">
        <Link className="nav-link text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" to="/admin/createProblem"> Create Record </Link>
        <div>{Filter()}</div>
        </div>
      </span>
      <div class="m-4">
    <Pagination
    nPages={nPages}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}/>
 </div>
 </>
  );
}
