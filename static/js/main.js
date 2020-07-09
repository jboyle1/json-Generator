const jsonButton = document.querySelector('#generate');
const buttonContainer = document.querySelector('#buttonContainer');
const display = document.querySelector('#displayContainer');

const collection = [
    "Another",
    "More",
    "Next",
    "Continue",
    "Keep going",
    "Click Me",
    "A new one"
];

const generateJson = () => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.onreadystatechange = () => {
        if (xhr.onreadystatechange === XMLHttpRequest.DONE) {
            renderResponse(xhr.response);
            changeButton();
        };
    };
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
    xhr.send();
};

const formatJson = (resJson) => {
    resJson = JSON.stringify(resJson);
    let counter = 0;
    return resJson
        .split('')
        .map(char => {
            switch (char) {
                case ',':
                    return `,\n${ ' '.repeat(counter * 2)}`;
                case '{':
                    counter += 1;
                    return `{\n${ ' '.repeat(counter * 2)}`;
                case '}':
                    counter -= 1;
                    return `\n${ ' '.repeat(counter * 2)}}`;
                default:
                    return char;
            }
        })
        .join('');
}