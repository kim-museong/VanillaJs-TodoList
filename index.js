const searchValue = document.getElementById("search");
const searchBtn = document.querySelector(".searchBtn");
const contentValue = document.querySelector(".content");
const contentBtn = document.querySelector(".contentBtn");
const viewPosts = document.querySelector(".viewPosts");

// 작성글 저장 배열
let id = 0;
const posts = [];

// search 관련
searchBtn.addEventListener("click", () => {
  console.log("검색내용", searchValue.value);
  searchViewHandler(searchValue.value);
});

// 글 작성 관련
contentBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("작성내용", contentValue.value);
  posts.push({ id, content: contentValue.value });
  id++;
  contentValue.value = "";
  console.log(posts, `nextId: ${id}`);
  postsViewHandler();
});

/** 글 보이기 함수 */
const postsViewHandler = () => {
  // 값 초기화
  viewPosts.textContent = "";

  // 변경된 값 추가
  posts.forEach((post) => {
    console.log(post);
    const postBox = document.createElement("li");
    postBox.textContent = post.content;
    viewPosts.appendChild(postBox);
  });
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
