export const postRequest = (url, body) => {
    return fetch(url, {
        headers: {
            "content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(body)
    });
}

export const getRequest = url => {
    return fetch(url, {
        headers: {
            "content-type": "application/json"
        }
    });
}