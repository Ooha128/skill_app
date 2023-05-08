import React from "react";
function Ts(props)
{
    return <tr class="bg-white border-b"><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{props.id}</td><td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{props.input}</td><td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"> {props.output}</td><td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{props.your}</td><td class="text-sm font-bold text-gray-900 font-light px-6 py-4 whitespace-nowrap">{props.status}</td></tr>;
}
const TestCases = ({tcs}) => {
  return (
    <>
    <div>
    <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
        Test Cases
      </h1>
      <div class="w-3/4 border-2 border-black z-10 rounded-md">
      
 
      <table className="min-w-full text-center">
        <thead class="border-b bg-gray-800">
        <th className="text-sm font-medium text-white px-6 py-4">Test Case#</th>
            <th className="text-sm font-medium text-white px-6 py-4">Input</th>
            <th className="text-sm font-medium text-white px-6 py-4">Expected Output</th>
            <th className="text-sm font-medium text-white px-6 py-4">Your Output</th>
            <th className="text-sm font-medium text-white px-6 py-4">Status</th>
        </thead >
        {tcs.map((tc,index)=> <Ts id={index+1} input={tc.input} output={tc.output} your={tc.your} status={tc.status}/>)}
      </table>
    </div>
    </div>
    
    </>
  );
};

export default TestCases;