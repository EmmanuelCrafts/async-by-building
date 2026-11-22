// ---------- Users ----------
const usersList = document.querySelector("#users-list");
const usersCount = document.querySelector("#users-count");
const usersLoading = document.querySelector("#users-loading");
const usersError = document.querySelector("#users-error");

// ---------- Posts ----------
const postsList = document.querySelector("#posts-list");
const postsCount = document.querySelector("#posts-count");
const postsEmpty = document.querySelector("#posts-empty");
const postsLoading = document.querySelector("#posts-loading");
const postsError = document.querySelector("#posts-error");

// ---------- Comments ----------
const commentsList = document.querySelector("#comments-list");
const commentsCount = document.querySelector("#comments-count");
const commentsEmpty = document.querySelector("#comments-empty");
const commentsLoading = document.querySelector("#comments-loading");
const commentsError = document.querySelector("#comments-error");

// ---------- Templates ----------
const userTemplate = document.querySelector("#user-template");
const postTemplate = document.querySelector("#post-template");
const commentTemplate = document.querySelector("#comment-template");

const clone = userTemplate.content.cloneNode(true);

const button = clone.querySelector(".user-card");
const name = clone.querySelector('[data-field="name"]');
const username = clone.querySelector('[data-field="username"]');
const email = clone.querySelector('[data-field="email"]');
const initials = clone.querySelector('[data-field="initials"]');

// endpoints
const usersEndpoint = "https://jsonplaceholder.typicode.com/users";
const postsEndpoint = "https://jsonplaceholder.typicode.com/posts?userId=";
const commentsEndpoint = "https://jsonplaceholder.typicode.com/comments?postId=";
// usage: postsEndpoint + userId

let users = [];

function fetchUsers() {
    return fetch (usersEndpoint)
            .then(response => {
                console.log(response);

                if(!response.ok) throw new Error("Something went wrong!")
                    return response.json();
            })
}

fetchUsers()
    .then(data => {
        console.log(data);
        users = data;
        usersCount.textContent = data.length;
    })
    .catch(error => {
        console.log(error);
    })  
