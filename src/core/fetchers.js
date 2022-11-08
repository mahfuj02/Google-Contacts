const GetHeader = (server_token) => {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `token ${server_token}`
    }
}

export const getRequest = async (url, server_token) => {
    const head = GetHeader(server_token);
    const response = await fetch(url, {
        method: "GET",
        headers: head
    });

    if (response.status >= 400) {
        return {statusCode: response.status}
    }
    let data = await response.json();
    data.statusCode = response.status;
    return data;
}

export const postRequest = async (url, body, server_token) => {
    const head = GetHeader(server_token);
    const response = await fetch(url, {
        method: "POST",
        headers: head,
        body: JSON.stringify(body)
    });

    if (response.status >= 400) {
        return {statusCode: response.status}
    }

    let data = await response.json();
    data.statusCode = response.status;
    console.log(data)
    return data
}

export const userCreatePostRequest = async (url, token) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ access_token: token })
    });

    
    if (response.status >= 400) {
        return {statusCode: response.status}
    }
    
    let data = await response.json();
    data.statusCode = response.status;
    console.log("Fetcher response: ", data);
    return data
}

export const updateRequest = async (url, body, server_token) => {
    const head = GetHeader(server_token);
    const response = await fetch(url, {
        method: "PUT",
        headers: head,
        body: JSON.stringify(body)
    });
    return {statusCode: response.status}
}

export const deleteRequest = async (url, server_token) => {
    const head = GetHeader(server_token);
    const response = await fetch(url, {
        method: "DELETE",
        headers: head,
    });
    return {statusCode: response.status}
}