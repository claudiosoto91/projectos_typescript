type Message = string;
type Title = string;
type Id = string;

interface Tweet {
  id: Id;
  message: Message;
}

interface TweetView {
  id: Id;
  tweets: Tweet[];
}

function createMainTweet(): TweetView {
  const id = crypto.randomUUID();
  const tweet = createTweet();

  return {
    id,
    tweets: [tweet],
  };
}

function createTweet(): Tweet {
  const id = crypto.randomUUID();
  const message = "";

  return {
    id,
    message,
  };
}

function renderView(tweetView: TweetView) {
  let view = document.querySelector("#container-" + tweetView.id);
  if (view) {
    view.innerHTML = "";
  } else {
    view = document.createElement("div");
    view.id = "container-" + tweetView.id;
    view.classList.add("mainContainer");
    document.querySelector("#tweets")?.append(view);
  }
  for (let i = 0; i < tweetView.tweets.length; i++) {
    //renderTweet

    renderTweet(
      tweetView,
      view as HTMLDivElement,
      tweetView.tweets[i],
      i === tweetView.tweets.length - 1
    );
  }
}

function renderTweet(
  tweetView: TweetView,
  view: HTMLDivElement,
  tweet: Tweet,
  last: boolean
) {
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
    const value = (e.target as HTMLTextAreaElement).value;
    updateTweet(tweetView, tweet, value);
  });

  form.append(textArea, countContainer);

  if (last) {
    form.appendChild(buttonAddMore);
  }

  view.appendChild(tweetContainer);
}

function updateTweet(tweetView: TweetView, tweet: Tweet, value: Message) {
  let ref: Tweet | null = null;
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

const bNewTweet = document.querySelector('#bNewTweet')!;
const tweetsContainer = document.querySelector('#tweets');
const tweetData: TweetView[] = [];
bNewTweet.addEventListener('click', (e) =>{
    e.preventDefault();
    const newTweetView = createMainTweet();
    renderView(newTweetView);
})