export const fetchGet = (url) => {
    return fetch(url)
        .then(response => response.json())
        .catch((error) => console.error('Error:', error));
};

export const fetchPost = (url, body) => {
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .catch((error) => console.error('Error:', error));
};

export const fetchUpdate = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => console.error('Error:', error));
};

export const fetchDelete = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => console.error('Error:', error));
};