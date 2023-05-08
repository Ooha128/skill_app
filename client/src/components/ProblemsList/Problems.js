import React from "react";
import ProblemList from "./ProblemsList";
import NavBar from "../NavBar";
const Problems = () => {
    return(
        <>
        <NavBar/>
         <div class="justify-center">
            <ProblemList/>
         </div>
        </>
    );
}

export default Problems;