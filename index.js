const searchValue = document.getElementById("search");
const searchBtn = document.querySelector(".searchBtn");
const contentValue = document.querySelector(".content");
const contentBtn = document.querySelector(".contentBtn");
const viewPosts = document.querySelector(".viewPosts");
const xhr = new XMLHttpRequest();

// search 관련
searchBtn.addEventListener("click", () => {
  console.log("검색내용", searchValue.value);
  findPostHandler(searchValue.value);
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
const findPostHandler = (keyword) => {
  // 검색결과 여부
  let found = false;
  viewPosts.textContent = "";

  xhr.open("GET", "http://localhost:3000/posts");
  xhr.send();
  xhr.onload = () => {
    if (xhr.status === 200) {
      viewPosts.textContent = "";
      const posts = JSON.parse(xhr.response); // JSON형식 변환
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
    } else {
      console.error("검색 오류", xhr.status, xhr.statusText);
    }
  };
};

const getPostsHandler = () => {
  xhr.open("GET", "http://localhost:3000/posts");
  xhr.send();
  xhr.onload = () => {
    if (xhr.status === 200) {
      viewPosts.textContent = "";
      const posts = JSON.parse(xhr.response); // JSON형식 변환
      posts.forEach((post) => {
        createPostHandler(post);
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

/** 글생성 함수 */
const createPostHandler = (post) => {
  console.log(post);
  const postBox = document.createElement("li");
  const postBtnBox = document.createElement("div");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  editBtn.textContent = "수정";
  deleteBtn.textContent = "삭제";
  postBox.textContent = post.content;
  postBtnBox.appendChild(editBtn);
  postBtnBox.appendChild(deleteBtn);
  postBox.appendChild(postBtnBox);
  viewPosts.appendChild(postBox);

  // 버튼 이벤트 생성
  deleteBtn.addEventListener("click", () => deletePostHandler(post));
  editBtn.addEventListener("click", () => editPostHandler(post));
};

/** 글삭제 함수 */
const deletePostHandler = (post) => {
  if (post.id !== "") {
    xhr.open("DELETE", `http://localhost:3000/posts/${post.id}`);
    xhr.getResponseHeader("content-type", "application/json; charset=UTF-8");
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        alert(`${post.content}가 삭제되었습니다.`);
        getPostsHandler();
      } else {
        console.log("글삭제 오류", xhr.status, xhr.statusText);
      }
    };
  }
};

/** 글수정 함수 */
const editPostHandler = (post) => {
  if (post.id !== "" && contentValue.value !== "") {
    xhr.open("PATCH", `http://localhost:3000/posts/${post.id}`);
    xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
    xhr.send(JSON.stringify({ content: contentValue.value }));

    xhr.onload = () => {
      if (xhr.status === 200) {
        alert(
          `${post.content}내용이 ${contentValue.value}으로 변경되었습니다.`
        );
        getPostsHandler();
      } else {
        console.log("글수정 오류", xhr.status, xhr.statusText);
      }
    };
  } else {
    alert("변경할 내용을 입력해주세요.");
  }
};
