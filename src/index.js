import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を追加ボタンが押されたときに取得し初期化する．
  const inputText = document.getElementById("todo-text").value;
  document.getElementById("todo-text").value = "";
  createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除する関数
const deleteFromIncompleteList = (target) => {
  // 押された削除ボタンの親タグ(li)を未完了リストから削除
  const deleteTask = target.parentNode.parentNode;
  document.getElementById("incomplete-list").removeChild(deleteTask);
};

// 未完了リストにタスクを追加する関数
const createIncompleteList = (text) => {
  // liタグ生成
  const li = document.createElement("li");

  // divタグ生成
  const div = document.createElement("div");
  div.className = "list-row";

  // pタグ生成
  const p = document.createElement("p");
  p.innerText = text;

  // 完了ボタン生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの親タグ(li)を未完了リストから削除
    deleteFromIncompleteList(completeButton);

    // 完了したタスクの内容テキストを取得
    const addTarget = completeButton.parentNode.parentNode;
    const text = addTarget.firstElementChild.firstElementChild.innerText;
    addTarget.firstElementChild.textContent = null;
    // pタグ生成
    const p = document.createElement("p");
    p.innerText = text;

    // 戻すボタンを生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 押された戻すボタンの親タグを完了リストから削除
      const deleteTarget = backButton.parentNode.parentElement;
      document.getElementById("complete-list").removeChild(deleteTarget);

      // 戻すタスクのテキストを取得
      const backTarget = backButton.parentNode.parentNode;
      const text = backTarget.firstElementChild.firstElementChild.innerText;
      createIncompleteList(text);
    });

    // 完了したタスクに完了済みのタスクを追加
    addTarget.firstElementChild.appendChild(p);
    addTarget.firstElementChild.appendChild(backButton);
    document.getElementById("complete-list").appendChild(addTarget);
  });

  // 削除ボタン生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ(li)を未完了リストから削除
    deleteFromIncompleteList(deleteButton);
  });

  // タスクの生成
  li.appendChild(div).appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  //未完了リストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
