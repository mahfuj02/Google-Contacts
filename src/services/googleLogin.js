export default function getServerCode (googleToken, dispatch, route , setCookie){
    fetch(
        `http://127.0.0.1:8000/login/google/`,

        // `${process.env.REACT_APP_API_URL}/login/google/`,
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({access_token: googleToken}),
        }
    )
        .then((res) => res.json())

        .then((data) => {
            // sessionStorage.setItem("adminToken", data?.key);
            setCookie("adminToken", data?.token);
            // dispatch(setAccessToken(data?.token));
            // getUserInfo(data?.token, dispatch);
            route.push(
                route.query.from ? decodeURIComponent(`${route.query.from}`) : "/"
            );
        });
};

// export const getUserInfo = (token, dispatch) => {
//     fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/api/accounts/v1/user-info/`, {
//         method: "GET",
//         headers: {
//             "content-type": "application/json",
//             Authorization: `Token ${token}`,
//         },
//     })
//         .then((res) => res.json())
//         .then((data) => {
//             dispatch(setUserInfo(data));
//         });
// };





// import axios from "axios";

// /**
//  *
//  * @param {*} accesstoken This is the accesstoken of the user obtained from Google
//  */
// const googleLogin = async (accesstoken) => {
//   let res = await axios.post("http://127.0.0.1:8000/dj-rest-auth/google/", {
//     access_token: accesstoken,
//   });
//   console.log(res);
//   console.log("accessToken", accesstoken);
//   return await res.status;
// };

// export default googleLogin;
