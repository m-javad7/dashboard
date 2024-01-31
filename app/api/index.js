import axios from "axios";
import { OnRun } from "@/app/config/OnRun"


const Client = axios.create({baseURL:OnRun})

export const getCaptcha = async()=>{

    const {data} =await Client.get('/authentication/captcha')
    return data    
}

export const mobileVerify = async(mobile,captcha,encrypted_response)=>{
    const {data} = await Client.post('/authentication/mobileverification',{mobile:mobile,captcha:captcha,encrypted_response:encrypted_response})
    
    return data
}


export const otpVerify = async(mobile,code)=>{
    const {data} = await Client.post('/authentication/otp',{mobile:mobile,code:code}) 
    return data
}