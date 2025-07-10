export const fetchGet = (url) => {
    return fetch(url)
    .then(response => response.json())
    .catch((error) => console.error('Error:', error));
};

export const fetchPost = (url) => {
    return fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
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