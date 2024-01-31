import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import * as api from '../api/index';
import { toast } from 'react-toastify';


export const useCaptcha = () =>{

    return useQuery('captcha',api.getCaptcha)
}

export const useMobileVerification = (mobile,captcha,encrypted_response) =>{
    const QueryClient = useQueryClient();

    return useMutation(()=>api.mobileVerify(mobile,captcha,encrypted_response),{
        onSuccess:()=>{
            toast.success("کد تایید ارسال شد.", {
                position: "top-center"
              });
        },
        onError:(error)=>{
            toast.error(error.response.data.message),{
                position: "top-center"
            }
            console.log(error.response.data.message)

        }
    })
}

export const useOtp = (mobile,code) =>{
    
    const QueryClient = useQueryClient();

    return useMutation(()=>api.otpVerify(mobile,code),{
        onSuccess:()=>{
            toast.success("خوش آمدید", {
                position: "top-center"
              });
        },
        onError:(error)=>{
            toast.error(error.response.data.message),{
                position: "top-center"
            }
            console.log(error)

        }
    })
 }