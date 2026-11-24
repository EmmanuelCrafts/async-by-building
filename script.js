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

// endpoints
const usersEndpoint = "https://jsonplaceholder.typicode.com/users";
const postsEndpoint = "https://jsonplaceholder.typicode.com/posts?userId=";
const commentsEndpoint = "https://jsonplaceholder.typicode.com/comments?postId=";


usersList.addEventListener('click', (e) => {
    const userCard = e.target.closest(".user-card");
    if(!userCard) return;

    const userId = userCard.dataset.userId;
    postsList.innerHTML = "";
    commentsList.innerHTML = "";

    fetchPosts(userId)
        .then(data => {
            postsCount.textContent = data.length;
            renderPosts(data);
        })
        .catch(error => {
            console.log(error);
            postsError.hidden = false;
        })
        .finally(() => {
            postsEmpty.hidden = true;
        })
})

postsList.addEventListener('click', (e) => {
    const postCard = e.target.closest(".post-card");
    if(!postCard) return;

    const postId = postCard.dataset.postId;
    commentsList.innerHTML = "";

    fetchComments(postId)
        .then(data => {
            commentsCount.textContent = data.length;
            renderComments(data);
        })
        .catch(error => {
            console.log(error);
            commentsError.hidden = false;
        })
        .finally(() => {
            commentsEmpty.hidden = true;
        })
})

function fetchUsers() {
    return fetch (usersEndpoint)
            .then(response => {
                if(!response.ok) throw new Error("Failed to fetch users");
                return response.json();
            })
}

fetchUsers()
    .then(data => {
        usersCount.textContent = data.length;
        renderUsers(data);
    })
    .catch(error => {
        console.log(error);
        usersError.hidden = false;
    })
    .finally(() => {
        usersLoading.hidden = true;
    })  

function fetchPosts(userId) {
    return fetch(postsEndpoint + userId)
        .then(response => {
            if(!response.ok) throw new Error("Failed to fetch posts");
            return response.json();
        })
}

function fetchComments(postId) {
    return fetch(commentsEndpoint + postId)
        .then(response => {
            if(!response.ok) throw new Error("Failed to fetch comments");
            return response.json();
        })
}

function renderUsers(users) {
    users.forEach(user => {
        usersList.appendChild(createUserItem(user));
    });
}

function renderPosts(posts) {
    posts.forEach(post => {
        postsList.appendChild(createUserPost(post));
    });
}

function renderComments(comments) {
    comments.forEach(comment => {
        commentsList.appendChild(createPostComment(comment));
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

function createUserPost(post) {
    const clone = postTemplate.content.cloneNode(true);

    const button = clone.querySelector(".post-card");
    const title = clone.querySelector('[data-field="title"]');
    const body = clone.querySelector('[data-field="body"]');

    button.dataset.postId = post.id;
    title.textContent = post.title;
    body.textContent = post.body;

    return clone;
}

function createPostComment(comment) {
    const clone = commentTemplate.content.cloneNode(true);

    const initials = clone.querySelector('[data-field="initials"]');
    const name = clone.querySelector('[data-field="name"]');
    const email = clone.querySelector('[data-field="email"]');
    const body = clone.querySelector('[data-field="body"]');

    initials.textContent = comment.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2);
    name.textContent = comment.name;
    email.textContent = comment.email;
    body.textContent = comment.body;

    return clone;
}