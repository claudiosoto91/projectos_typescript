"use strict";
function createMainTweet() {
    const id = crypto.randomUUID();
    const tweet = createTweet();
    return {
        id,
        tweets: [tweet],
    };
}
function createTweet() {
    const id = crypto.randomUUID();
    const message = "";
    return {
        id,
        message,
    };
}
function renderView(tweetView) {
    var _a;
    let view = document.querySelector("#container-" + tweetView.id);
    if (view) {
        view.innerHTML = "";
    }
    else {
        view = document.createElement("div");
        view.id = "container-" + tweetView.id;
        view.classList.add("mainContainer");
        (_a = document.querySelector("#tweets")) === null || _a === void 0 ? void 0 : _a.append(view);
    }
    for (let i = 0; i < tweetView.tweets.length; i++) {
        //renderTweet
        renderTweet(tweetView, view, tweetView.tweets[i], i === tweetView.tweets.length - 1);
    }
}
function renderTweet(tweetView, view, tweet, last) {
    const tweetContainer = document.createElement("div");
    tweetContainer.id = "container-" + tweetView.id;
    tweetContainer.classList.add("tweetContainer");
    const form = document.createElement("form");
    form.id = "form-" + tweetView.id;
    tweetContainer.appendChild(form);
    const countContainer = document.createElement("div");
    countContainer.classList.add("countContainer");
    const textArea = document.createElement("textarea");
    textArea.id = "textArea-" + tweet.id;
    textArea.value = tweet.message;
    textArea.maxLength = 256;
    countContainer.textContent = textArea.value.length.toString() + "/250";
    const buttonAddMore = document.createElement("button");
    buttonAddMore.classList.add("button", "buttonNew");
    buttonAddMore.value = "Add another tweet";
    buttonAddMore.append(document.createTextNode("Add another tweet"));
    //Listeners
    buttonAddMore.addEventListener("click", (e) => {
        e.preventDefault();
        const anotherTweet = createTweet();
        tweetView.tweets.push(anotherTweet);
        renderView(tweetView);
    });
    textArea.addEventListener("input", (e) => {
        const value = e.target.value;
        updateTweet(tweetView, tweet, value);
    });
    form.append(textArea, countContainer);
    if (last) {
        form.appendChild(buttonAddMore);
    }
    view.appendChild(tweetContainer);
}
function updateTweet(tweetView, tweet, value) {
    let ref = null;
    for (let i = 0; i < tweetView.tweets.length; i++) {
        const t = tweetView.tweets[i];
        if (t.id === tweet.id) {
            ref = t;
        }
    }
    if (ref) {
        ref.message = value;
    }
}
const bNewTweet = document.querySelector('#bNewTweet');
const tweetsContainer = document.querySelector('#tweets');
const tweetData = [];
bNewTweet.addEventListener('click', (e) => {
    e.preventDefault();
    const newTweetView = createMainTweet();
    renderView(newTweetView);
});
