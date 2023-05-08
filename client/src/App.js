import './App.css';
import Loginnav from './components/Login Page/loginPagenav';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupNav from './components/Login Page/SignUpNav';
import Problems from './components/ProblemsList/Problems';
import ContestsList from './components/Contests/ContestList';
import Landing from './components/Display question/Landing';
import CreateProblem from './components/Admin Pages/createProblem';
import EditProblem from './components/Admin Pages/editProblem';
import ProblemsListAdmin from './components/Admin Pages/ProblemsListAdmin';
import Dashboard from './components/Admin Pages/dashboard';
import CreateContest from './components/Admin Pages/createContest';
import AddQuestion from './components/Admin Pages/addQuestions';
import AddMcq from './components/Admin Pages/mcqQsn';
import AddCodingQsn from './components/Admin Pages/addCodingQsn';
function App() {
  return (
    <>
    <div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Loginnav/>} />
            <Route path="/signup" element={<SignupNav />} />
            <Route path="/problems" element={<Problems/>} />
            <Route path='/contests' element={<ContestsList/>}/>
            <Route path="/solve/:id" element={<Landing/>} />
            <Route exact path="/admin/problems" element={<ProblemsListAdmin />} /> 
            <Route path="/editProblem/:id" element={<EditProblem />} />
            <Route path="/admin/createProblem" element={<CreateProblem />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/createContest" element={<CreateContest />} />
            <Route path="/admin/addQuestions" element={<AddQuestion />} />
            <Route path="/addMcq" element={<AddMcq />} />
            <Route path="/admin/addCodingQsn" element={<AddCodingQsn />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
    </>
  );
}

export default App;