import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import Filter from "./filter";
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
    <td>
      <Link className="btn btn-link" to={`/solve/${props.record._id}`}><button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Solve</button></Link> 
    </td>
  </tr>
);

export default function RecordList() {
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



  // This method will map out the records on the table
  function recordList() {
    return currentRecords.map((record,index) => {
      return (
        <Record
          record={record}
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
    <div class="m-5">
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
        <div className="relative -top-10 -left-10">{Filter()}</div>
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
