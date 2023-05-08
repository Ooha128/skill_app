import React from 'react';
import NavBar from '../NavBar';


export default function Contests() {
  return (
   <>
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
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">GAMES</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"><a href="#s" className="text-blue-600 underline hover:text-blue-800">1v1 Games by CodeChef</a></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10 Oct 2022 <br /> <span className="text-zinc-400">Mon 12:00</span></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">NA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">NA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="bg-[#34419A] hover:bg-blue-700 text-white py-2 px-4 rounded-full text-xs uppercase font-bold"><a href="#a">Participate</a></button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">GAMES</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"><a href="#s" className="text-blue-600 underline hover:text-blue-800">1v1 Games by CodeChef</a></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10 Oct 2022 <br /> <span className="text-zinc-400">Mon 12:00</span></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">NA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">NA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button className="bg-[#34419A] hover:bg-blue-700 text-white py-2 px-4 rounded-full text-xs uppercase font-bold"><a href="#a">Participate</a></button>
              </td>
            </tr>
        </tbody>
    </table>
    </div>
    </div>
    </div>
    </>
    )
}