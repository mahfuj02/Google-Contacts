export default function CreateUser(googleToken, route, setCookie) {
  fetch(
    `http://127.0.0.1:8000/login/google/`,

    // `${process.env.REACT_APP_API_URL}/login/google/`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ access_token: googleToken }),
    }
  )
    .then((res) => {
      res.json();
    })
    .then((data) => {
      console.log("data.. equal: ", data);
      // sessionStorage.setItem("adminToken", data?.key);
      setCookie("adminToken", data?.token);
      // dispatch(setAccessToken(data?.token));
      // getUserInfo(data?.token, dispatch);
      route.push(
        route.query.from ? decodeURIComponent(`${route.query.from}`) : "/"
      );
    });
}

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
