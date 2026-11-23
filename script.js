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

// ---------- User template ----------
const userClone = userTemplate.content.cloneNode(true);

const userButton = userClone.querySelector(".user-card");
const userName = userClone.querySelector('[data-field="name"]');
const userUsername = userClone.querySelector('[data-field="username"]');
const userEmail = userClone.querySelector('[data-field="email"]');
const userInitials = userClone.querySelector('[data-field="initials"]');

// ---------- Post template ----------
const postClone = postTemplate.content.cloneNode(true);

const postButton = postClone.querySelector(".post-card");
const postTitle = postClone.querySelector('[data-field="title"]');
const postBody = postClone.querySelector('[data-field="body"]');

// ---------- Comment template ----------
const commentClone = commentTemplate.content.cloneNode(true);

const commentInitials = commentClone.querySelector('[data-field="initials"]');
const commentName = commentClone.querySelector('[data-field="name"]');
const commentEmail = commentClone.querySelector('[data-field="email"]');
const commentBody = commentClone.querySelector('[data-field="body"]');

// endpoints
const usersEndpoint = "https://jsonplaceholder.typicode.com/users";
const postsEndpoint = "https://jsonplaceholder.typicode.com/posts?userId=";
const commentsEndpoint = "https://jsonplaceholder.typicode.com/comments?postId=";
// usage: postsEndpoint + userId


function fetchUsers() {
    return fetch (usersEndpoint)
            .then(response => {
                if(!response.ok) throw new Error("Failed to fetch users");
                return response.json();
            })
}

fetchUsers()
    .then(data => {
        console.log(data)
        renderUsers(data);
    })
    .catch(error => {
        console.log(error);
    })  

function renderUsers(users) {
    users.forEach(user => {
        usersList.appendChild(createUserItem(user));
    });
}

function createUserItem(user) {
  const clone = userTemplate.content.cloneNode(true);

  const button = clone.querySelector(".user-card");
  const name = clone.querySelector('[data-field="name"]');
  const username = clone.querySelector('[data-field="username"]');
  const email = clone.querySelector('[data-field="email"]');
  const initials = clone.querySelector('[data-field="initials"]');

  button.dataset.userId = user.id;
  name.textContent = user.name;
  username.textContent = `@${user.username}`;
  email.textContent = user.email;
  initials.textContent = user.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return clone;
}