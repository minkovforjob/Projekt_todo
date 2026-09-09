// fetch("https://jsonplaceholder.typicode.com/todos")
//     .then((response) => response.json())
//     .then((json) => {
//         json.forEach((element) => {
//             document.body.append(element.title, document.createElement("br"));
//         });
//     });


const requestBtn = document.querySelector("button");
const BASE_URL = "https://jsonplaceholder.typicode.com/";
// console.log(requestBtn);


function getPosts() {
    // по умолч GET
    fetch(BASE_URL + "/posts")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const body = document.querySelector("body");
            data.forEach((post) => {
                body.append(document.createElement("br"), post.id, post.title);
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

// создание нового
function createPost() {
    fetch(BASE_URL + "/posts",
        {
            method: "POST",
            body: JSON.stringify({
                id: 101,
                userId: 1,
                title: "Task1",
                body: "somthing"
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log(error);

        });
}

// редактирование
function editPost() {
    fetch(BASE_URL + "/posts/1",
        {
            method: "PUT",
            body: JSON.stringify({
                id: 1,
                title: "foo",
                body: "render",
                userId: 1,
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log(error);

        });

}

// DELETE
function deletePost() {
    fetch(BASE_URL + "/posts/1", {
        method: "DELETE",
    })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log(error);
        });
}

requestBtn.addEventListener("click", deletePost);