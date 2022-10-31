import { Google } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useGoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import getServerCode from "../services/googleLogin";

const GoogleSignIn = () => {
  
    const router = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const [cookie, setCookie] = useCookies(["adminToken"]);

    const {signIn, loaded} = useGoogleLogin({
        clientId: `${process.env.GOOGLE_CLIENT_ID}`,
        isSignedIn: false,
        uxMode: "popup",
        scope: "profile email",
        accessType: "online",
        responseType: "token",

        onAutoLoadFinished: () => setLoading(false),

        // @ts-ignore
        onSuccess: async (loginResponse) => {
            getServerCode(loginResponse.accessToken, dispatch, router, setCookie);
        },

        onFailure: (error) => {
            setLoading(false);

            console.log("onFailure", error);
            if (error.error === "idpiframe_initialization_failed") {
                // setErrorMessage({
                //   type: "warning",
                //   text: "Please enable all cookies option in your setting to sign in",
                // });
            }
            // TODO: render some error message.
        },
    });

    return (
        <Box sx={{p: {xs: "40px 30px 0", md: "40px 30px 0"}}}>
            <LoadingButton
                loading={loading}
                startIcon={<Google/>}
                variant="outlined"
                color="primary"
                sx={{width: "100%"}}
                onClick={() => {
                    setLoading(true);
                    signIn();
                }}
            >
                Sign in with google
            </LoadingButton>
            <h1>Hello login page..</h1> 
        </Box>
    );
};

export default GoogleSignIn;


// 385414291713-go7kf35ep3vv5ubgt5gg1446s1c1mig4.apps.googleusercontent.com
// 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

// npm install @mui/material @emotion/react @emotion/styled