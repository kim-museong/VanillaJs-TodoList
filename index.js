const searchValue = document.getElementById("search");
const searchBtn = document.querySelector(".searchBtn");
const contentValue = document.querySelector(".content");
const contentBtn = document.querySelector(".contentBtn");
const viewPosts = document.querySelector(".viewPosts");
const xhr = new XMLHttpRequest();

// search 관련
searchBtn.addEventListener("click", () => {
  console.log("검색내용", searchValue.value);
  searchViewHandler(searchValue.value);
});

/** 글 저장버튼함수 */
contentBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addPostHandler(contentValue.value);
  contentValue.value = "";
});

/** 글 보이기 함수 */
const postsViewHandler = (posts) => {
  // 값 초기화
  viewPosts.textContent = "";
};

/** 검색결과 함수 */
const searchViewHandler = (keyword) => {
  // 검색결과 여부
  let found = false;
  viewPosts.textContent = "";

  posts.forEach((post) => {
    // keyword값이 존재하는 깂만 배열에 추가
    if (post.content.includes(keyword)) {
      const postBox = document.createElement("li");
      postBox.textContent = post.content;
      viewPosts.appendChild(postBox);
      found = true;
    }
  });

  if (!found) {
    viewPosts.textContent = "결과가 없습니다.";
  }
};

const getPostsHandler = () => {
  xhr.open("GET", "http://localhost:3000/posts");
  xhr.send();
  xhr.onload = () => {
    if (xhr.status === 200) {
      viewPosts.textContent = "";
      const posts = JSON.parse(xhr.response); // JSON형식 변환
      posts.forEach((post) => {
        console.log(post);
        const postBox = document.createElement("li");
        postBox.textContent = post.content;
        viewPosts.appendChild(postBox);
      });
    } else {
      console.error("posts불러오기오류", xhr.status, xhr.statusText);
    }
  };
};
getPostsHandler();

/** 글저장 함수 */
const addPostHandler = (content) => {
  if (content !== "") {
    xhr.open("POST", "http://localhost:3000/posts");
    xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
    xhr.send(JSON.stringify({ content: content }));

    xhr.onload = () => {
      if (xhr.status === 201) {
        getPostsHandler();
      } else {
        console.log(xhr.status, xhr.statusText);
      }
    };
  }
};
