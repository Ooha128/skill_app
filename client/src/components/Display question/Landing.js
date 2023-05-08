import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../../utils/general";
import { languageOptions } from "../../constants/languageOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defineTheme } from "../../lib/defineTheme";
import useKeyPress from "../../hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";
import TestCases from "./TestCases";
import { useParams, useNavigate } from "react-router-dom";
const Default = `/* Write your Code here */`;
let tcs=[];
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
    else{ if(dif==="Hard")
        return <span class="inline-block shadow-md py-3 px-3 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded ml-2">Hard</span>;
    }
}
const Landing = () => {
  const [code, setCode] = useState(Default);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [testCases, setTestCases] = useState(null);
  const [runTests, setRunTestCases] = useState(tcs);
  const [checkTestStatus,setTestStatus]=useState(0);
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");
  const params = useParams();
  const navigate = useNavigate();
  const [qsn, setForm] = useState({
    qsnId: "",
    title: "",
    difficulty:"",
    description: "",
    inputFormat: "",
    outputFormat:"",
    SampleInput: [],
    SampleOutput: [],
    testCases: []
  });
  const delay = ms => new Promise(res => setTimeout(res, ms));
  let n=0;
  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };
  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  useEffect(async() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5001/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
      tcs=record.testCases;
      setRunTestCases(record.testCases);
    }

    await fetchData();
    await delay(2000);
    return;
  }, [params.id, navigate]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = async() => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": 'judge0-ce.p.rapidapi.com',
        // "X-RapidAPI-Key": 'b208c207f7msh430460db1d5d5bep1726dajsn4ab20e9067c5',
        'X-RapidAPI-Key': '9d97b95a39mshfc179c76288e3dap1d3fb6jsncc180f98a27d',
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `Quota of 100 requests exceeded for the Day!`,
            10000
          );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };
 const runTestCases = async() => {
      n=tcs.length;
      setTestCases(true);
      for(let i=0;i<n;i++)
      {
        const formData = {
          language_id: language.id,
          source_code: btoa(code),
          stdin: btoa(tcs[i]["input"]),
          expected_output: btoa(tcs[i]["output"])
        };
        const options = {
          method: "POST",
          url: 'https://judge0-ce.p.rapidapi.com/submissions/',
          params: { base64_encoded: "true", fields: "*" },
          headers: {
            "content-type": "application/json",
            "Content-Type": "application/json",
            "X-RapidAPI-Host": 'judge0-ce.p.rapidapi.com',
            // "X-RapidAPI-Key": 'b208c207f7msh430460db1d5d5bep1726dajsn4ab20e9067c5',
            'X-RapidAPI-Key': '9d97b95a39mshfc179c76288e3dap1d3fb6jsncc180f98a27d',
          },
          data: formData,
        };
        await axios
          .request(options)
          .then(function (response) {
            console.log("res.data", response.data);
            const token = response.data.token;
            checkTestCaseStatus(token,i);
          })
          console.log(checkTestStatus);
          if(checkTestStatus == 1)
          {
            setTestCases(false);
            break;
          }
      }
      if(checkTestStatus!= 1)
      {
        await delay (2000);
        let ans=0;
        for(let i=0;i<n;i++)
        {
          // console.log(tcs[i]["your"]);
          if(tcs[i]["output"]===tcs[i]["your"])
          {
            ans++;
            tcs[i]["status"]="ACCEPTED";
          }
        }
        setTestCases(false);
        if(ans==n)
        {
          console.log(ans);
          showSuccessToast("Hurray!! All test cases Passes");
        }
        else{
          console.log('failed');
          showErrorToast(ans+" out of "+n+" test cases passed");
        }
      }
    setRunTestCases(tcs);
 };
 const checkTestCaseStatus = async (token,i) => {
  const options = {
   method: "GET",
   url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token,
   params: { base64_encoded: "true", fields: "*" },
   headers: {
     "X-RapidAPI-Host": 'judge0-ce.p.rapidapi.com',
    //  "X-RapidAPI-Key": 'b208c207f7msh430460db1d5d5bep1726dajsn4ab20e9067c5',
    'X-RapidAPI-Key': '9d97b95a39mshfc179c76288e3dap1d3fb6jsncc180f98a27d',
   },
 };
 try {
   let response = await axios.request(options);
   let statusId = response.data.status?.id;
 
   // Processed - we have a result
   if (statusId === 1 || statusId === 2) {
     // still processing
     setTimeout(() => {
       checkTestCaseStatus(token,i);
     }, 2000);
     return ;
   } else {
     console.log("response.data", response.data);
    //  console.log(response.data.stdout);
     setOutputDetails(response.data);
     if(response.data.status.id== 5)
     {
       tcs[i]['status']="TLE";
     }
     else if(response.data.status.id==6)
     {
       setTestStatus(1);
       return;
     }
     else{
      tcs[i]['your']=atob(response.data.stdout);
     }
     return;
   }
 } catch (err) {
   console.log("err", err);
   showErrorToast();
   return;
 }
  };
  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": 'judge0-ce.p.rapidapi.com',
        // "X-RapidAPI-Key": 'b208c207f7msh430460db1d5d5bep1726dajsn4ab20e9067c5',
        'X-RapidAPI-Key': '9d97b95a39mshfc179c76288e3dap1d3fb6jsncc180f98a27d',
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        if(response.data.stderr == null)
        {
          showSuccessToast(`Compiled Successfully!`);
        }
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg , {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div>
      <div className="flex flex-col px-4 py-2 ">
      <div class="px-5 py-2 w-full border-2 border-black z-10 rounded-md">
            <div>
            <h1 className="inline-block font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
        {qsn.title}
      </h1>
      <div class="inline-block float-right">
        {banner(qsn.difficulty)}
      </div>
      <hr class="w-50% h-1 bg-gray-100 border-0 rounded md:my-1 dark:bg-gray-700"></hr>
            </div>
    
      <div>
        <h2 class="font-medium leading-tight text-xl mt-0 mb-2 text-black-600"> Description </h2>
       <em class="text-lg">{qsn.description}</em>
      </div>
      <div class="py-2">
        <h2 class="font-medium leading-tight text-xl mt-0 mb-2 text-black-600">Input Format</h2>
        <p class="text-lg">{qsn.inputFormat}</p>
      </div>
      <div class="py-2">
        <h2 class="font-medium leading-tight text-xl mt-0 mb-2 text-black-600">Output Format</h2>
        <p class="text-lg">{qsn.outputFormat}</p>
      </div>
      <h2 class="font-medium leading-tight text-xl mt-0 mb-2 text-black-600">Examples</h2>
      <div class="flex-container grid md:grid-cols-2 gap-3">
      <div class="bg-gray-300 rounded-lg py-5 px-6 mb-4 text-base text-gray-800 mb-3">
        <h2 class="font-medium leading-tight text-xl mt-0 mb-2 text-black-600">Sample Input</h2>
        {qsn.SampleInput}
      </div>
      <div class="bg-gray-300 rounded-lg py-5 px-6 mb-4 text-base text-gray-800 mb-3">
        <h2 class="font-medium leading-tight text-xl mt-0 mb-2 text-black-600">Sample Output</h2>
        {qsn.SampleOutput}
      </div>
      </div>
      
    </div>
      </div>
      </div>
      <div className="flex flex-row">
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
      </div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          />
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
            <button
            onClick={runTestCases}
            disabled={!code}
            className={classnames(
              "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
              !code ? "opacity-50" : ""
            )}
            >
              {testCases ? "Executing..." : "Submit"}
            </button>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
      <div className="px-4 py-2 ">
          <TestCases
          tcs={runTests}
          />
      </div>
    </>
  );
};
export default Landing;