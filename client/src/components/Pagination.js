import React from "react";

const Pagination = ({nPages, currentPage, setCurrentPage})=>{
    const pageNumbers = [...Array(nPages+1).keys()].slice(1)
    const nextPage = () => {
        if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return(
        <nav>
            <ul className='flex list-reset pl-0 rounded justify-center'>
                <li className="page-item">
                    <a className="relative block py-2 px-3 -ml-px leading-normal text-blue bg-white border border-gray-200 no-underline hover:text-blue-800 hover:bg-gray-200" 
                        onClick={prevPage} 
                        href='#'>
                        
                        Previous
                    </a>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} 
                        className= {`page-item ${currentPage === pgNumber ? 'active' : ''} `} >

                        <a onClick={() => setCurrentPage(pgNumber)}  
                            className='relative block py-2 px-3 -ml-px leading-normal text-blue bg-white border border-gray-200 no-underline hover:text-blue-800 hover:bg-gray-200' 
                            href='#'>
                            
                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a className="relative block py-2 px-3 -ml-px leading-normal text-blue bg-white border border-gray-200 no-underline hover:text-blue-800 hover:bg-gray-200" 
                        onClick={nextPage}
                        href='#'>
                        
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
}
export default Pagination;