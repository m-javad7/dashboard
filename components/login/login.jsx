"use client";
import { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as hook from "../../app/hook/index";
import Image from "next/image";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCookie } from "@/components/cookie/cookie"

// const validateMobileNumber = (value) => {
//   const startsWithZero = /^0/.test(value);
//   const isLengthValid = value.length === 11;
//   if (!startsWithZero) {
//     return "شماره موبایل باید با صفر شروع شود";
//   } else if (!isLengthValid) {
//     return "شماره موبایل باید 11 رقم باشد";
//   }


// };


export const Login = () => {
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [step, setStep] = useState(1);
  const [captchaResponse, setCaptchaResponse] = useState(null);
  
  const {data: captchaData, isLoading: loadingCaptcha,refetch: reCaptcha,} = hook.useCaptcha();
  const {mutate:mutateVerify,status:verifyStatus} = hook.useMobileVerification(mobile,captcha,captchaResponse);
  const {mutate:mutateOtp,status:codeStatus,data:getDataVerify} = hook.useOtp(mobile,code);
  const captchaR = (e) => {setCaptcha(e.target.value);setCaptchaResponse(captchaData?.encrypted_response || "");}

  // const acsess = useContext()
  console.log(codeStatus)
  const handleSubmit = async () => {
    if (step === 1) {
      await mutateVerify()
    }
    if (step === 2){
      await mutateOtp()   
     }
    else{}
  }


  const handleVerifyMobile = ()=>{
    
    if (verifyStatus=='success'){
      setStep(2)
    }else
    {
      setStep(1)
    }
  }
  useEffect(handleVerifyMobile,[verifyStatus,])

  const getData = ()=>{
    if (codeStatus == 'success')
    console.log(getDataVerify)
    setCookie(getDataVerify);

  }
  useEffect(getData,[codeStatus,])

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 1,
          p: 4,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          فرا سایت
        </Typography>
        <form>
          <Box elevation={20}>
            <TextField
              disabled={step==2}
              variant="outlined"
              fullWidth
              id="mobile"
              label="شماره موبایل"
              name="mobile"
              type="number"
              autoComplete="tel"
              autoFocus
              defaultValue={mobile}
              onChange={(e) => setMobile(e.target.value)}
              />
            
            {step == 1 ? (
              <>
                <Box>
                  {loadingCaptcha ? null : (
                    <Image
                      src={`data:image/png;base64,${captchaData.image}`}
                      onClick={reCaptcha}
                      width={500}
                      height={500}
                      alt="Picture of the author"
                    />
                  )}
                </Box>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="captch"
                  label="کد تصویر را وارد کنید"
                  type="text"
                  defaultValue={captcha}
                  onChange={captchaR}
                 
                />
              </>
            ) : null}
            {step == 2 ? (
              <TextField
                variant="outlined"
                required
                fullWidth
                name="code"
                label="کد تایید دریافتی"
                type="number"
                autoComplete="off"
                defaultValue={code}
                onChange={(e) => setCode(e.target.value)}
              />
            ) : null}

            <Button
              className="bg-blue-500"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
                تایید
            </Button>
          </Box>
        </form>
        <ToastContainer />
      </Box>
    </Container>
  );
};
