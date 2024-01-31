'use client'
import DashboardUi from "@/components/dashboard/DashboardUi";
import { AccessContext } from "@/app/config/accessContext"
import { getCookie } from "@/components/cookie/cookie"
import { useState } from "react";

 const Dashboard =()=>{
    const [access, setAccess] = useState('')
    return(
        <>
        <div>
        <AccessContext.Provider value={[getCookie('id')]}>
            {console.log(getCookie())}
            <DashboardUi access={access}/>
            </AccessContext.Provider>
        </div>
        </>
    )
}

export default Dashboard;