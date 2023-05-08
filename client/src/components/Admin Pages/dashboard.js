import React from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NavBar from "../NavBar";

function Dashboard() {
    return (<>
    <NavBar/>
        <section className="w-full h-screen relative top-40 left-30 ">
            <Box sx={{ '& button': { m: 1 } }}>
                <div className=" w-1/2 m-auto">
                    <h1 >1.<Button href="/admin/createContest" variant="contained" size="large" className="w-3/4">
                        Create Contest
                    </Button></h1>
                    <br/>
                    <h1>2.<Button href="/contests" variant="contained" size="large" className="w-3/4">
                        View Contests
                    </Button></h1>
                    <br/>
                    <h1>3.<Button href="/admin/analysis" variant="contained" size="large" className="w-3/4 ">
                        View Analysis
                    </Button></h1>

                </div>
            </Box>
        </section>
    </>
    );
};

export default Dashboard;