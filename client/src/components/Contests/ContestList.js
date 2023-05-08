import React from "react";
import NavBar from "../NavBar";
import { useEffect, useState } from "react";

const Record = (props) => (
 <>
     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{props.record.code}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"><a href="#s" className="text-blue-600 underline hover:text-blue-800">{props.record.name}</a></td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{props.record.startTime}</td>
    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{props.record.duration}</td> */}
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{props.record.endTime}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
    <button className="bg-[#34419A] hover:bg-blue-700 text-white py-2 px-4 rounded-full text-xs uppercase font-bold"><a href="#a">Participate</a></button>
    </td>
    </>
);
let ongoingContests=[];
let completedContests=[];
let upcomingContests=[];
const ContestsList = () => {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5001/contests/`);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      const now = new Date(); // current time
      // separate the contests into ongoing, completed, and upcoming contests based on their start and end times
      ongoingContests = records.filter(contest => now >= new Date(contest.startTime) && now <= new Date(contest.endTime));
      completedContests = records.filter(contest => now > new Date(contest.endTime));
      upcomingContests = records.filter(contest => now < new Date(contest.startTime));
      setRecords(records);
    }
    getRecords();
    return; 
  }, [records.length]);

  function recordList(contests) {
    return contests.map((record,index) => {
      return (
        <Record
          record={record}
          key={record._id}
          index={index}
        />
      );
    });
  }
    return(
        <>
    <section><div className="fixed w-screen sticky">{NavBar()}</div></section>
    <section>
    <h1 className="text-center font-heading text-2xl font-bold">ONGOING CONTESTS </h1>
    <br />
    <div className='flex justify-center'>
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className='bg-black'>
              <th className="px-6 py-3 text-xs font-bold text-left text-white uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-xs font-bold text-left text-white uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-xs font-bold text-left text-white uppercase tracking-wider">Start</th>
              {/* <th className="px-6 py-3 text-xs font-bold text-left text-white uppercase tracking-wider">Duration</th> */}
              <th className="px-6 py-3 text-xs font-bold text-left text-white uppercase tracking-wider">Ends In</th>
              <th className="px-6 py-3 text-xs font-bold text-left text-white uppercase tracking-wider">Participate</th>
            </tr>
          </thead>
      <tr className="rounded">{recordList(records)}</tr>
      </table>
      </div>
      </div>
      </div>
    </section>
    
    <br />
    <hr />
    <br />
    <hr />
    <br />

    <section>
    <h1 className="text-center font-heading text-2xl font-bold">UPCOMING CONTESTS </h1>
    <br />
    <div className='flex justify-center'>
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className='bg-black'>
              <th className="px-6 py-3 text-xs font-bold text-left text-white uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-xs font-bold text-left text-white uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-xs font-bold text-left text-white uppercase tracking-wider">Start</th>
              <th className="px-6 py-3 text-xs font-bold text-left text-white uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-xs font-bold text-left text-white uppercase tracking-wider">Ends In</th>
              <th className="px-6 py-3 text-xs font-bold text-left text-white uppercase tracking-wider">Participate</th>
            </tr>
          </thead>
      <div className="rounded">{recordList(upcomingContests)}</div>
      </table>
      </div>
      </div>
      </div>
    </section>
    <br />
    <hr />
    <br />
    <hr />
    <br />
    <section>
    <h1 className="text-center font-heading text-2xl font-bold">PAST CONTESTS </h1>
    <br />
    <div className='flex justify-center'>
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className='bg-black'>
              <th className="px-6 py-3 text-xs font-bold text-left text-white uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-xs font-bold text-left text-white uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-xs font-bold text-left text-white uppercase tracking-wider">Start</th>
              <th className="px-6 py-3 text-xs font-bold text-left text-white uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-xs font-bold text-left text-white uppercase tracking-wider">Ends In</th>
              <th className="px-6 py-3 text-xs font-bold text-left text-white uppercase tracking-wider">Participate</th>
            </tr>
          </thead>
      <div className="rounded">{recordList(completedContests)}</div>
      </table>
      </div>
      </div>
      </div>
    </section>
    <section className="h-20"> 

    </section>
      </>
    );
}

export default ContestsList ;