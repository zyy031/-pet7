/* ============================================================
   script.js — Minimalist Brutalism
   ============================================================ */

var praiseList = [
  "你今天看起来像一束光",
  "哇，你的品味也太好了吧",
  "有你在的地方，空气都是甜的",
  "今天也要像小太阳一样发光",
  "你认真做事的样子，超级迷人",
  "你的存在，就是世界的一块糖",
  "别怀疑，你就是最特别的那一个",
  "今天也辛苦啦，你超棒的",
  "你的笑容，可以治愈一切",
  "抱抱你，你已经做得很好了",
  "今天的不开心到此为止",
  "你怎么连发呆都这么可爱",
  "你认真生活的样子，自带高光",
  "好运气正在赶来的路上",
  "你的温柔，是世间最贵的宝藏",
  "像你这样的人，就该甜甜地过每一天",
  "听，连风都在夸你今天的节奏感",
  "你今天连呼吸都带着云朵的软糯",
  "别比了，今天的最佳主角就是你",
  "你的眼睛里，住着温柔的宇宙",
  "今天的你，甜度超标，请继续保持",
  "别怕，你正在变成更好的自己",
  "生活这场大秀，你是最耀眼的主角",
  "被你喜欢过的人，一定都很幸福",
  "Git commit 写得清晰，同事偷偷点赞"
];

/* 5套强调色 */
var themes = ["black", "red", "blue", "green", "raw"];
var themeIndex = 0;

/* DOM */
var petEl      = document.getElementById("pet");
var faceEl     = document.getElementById("face");
var bubbleEl   = document.getElementById("bubble");
var bubbleText = document.getElementById("bubbleText");
var dotEls     = document.querySelectorAll(".theme-dot");

/* 状态 */
var isAnimating = false;
var hideTimer   = null;

/* 工具 */
function randomPraise() {
  return praiseList[Math.floor(Math.random() * praiseList.length)];
}

function showBubble(text) {
  if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
  bubbleText.textContent = text;
  bubbleEl.classList.add("bubble--visible");
}

function hideBubble() {
  bubbleEl.classList.remove("bubble--visible");
  hideTimer = null;
}

function triggerBounce() {
  petEl.classList.remove("creature--bouncing");
  void petEl.offsetWidth;
  petEl.classList.add("creature--bouncing");
  setTimeout(function () { petEl.classList.remove("creature--bouncing"); }, 400);
}

function showHappyFace(duration) {
  faceEl.classList.add("creature__face--happy");
  setTimeout(function () { faceEl.classList.remove("creature__face--happy"); }, duration);
}

function cycleTheme() {
  themeIndex = (themeIndex + 1) % themes.length;
  document.body.setAttribute("data-theme", themes[themeIndex]);
  // 更新指示点
  dotEls.forEach(function (dot, i) {
    dot.classList.toggle("is-active", i === themeIndex);
  });
}

/* 光标拖拽视差 */
petEl.addEventListener("mousemove", function (e) {
  var rect = petEl.getBoundingClientRect();
  var cx = rect.left + rect.width / 2;
  var cy = rect.top + rect.height / 2;
  var dx = (e.clientX - cx) / (rect.width / 2);
  var dy = (e.clientY - cy) / (rect.height / 2);
  dx = Math.max(-1, Math.min(1, dx));
  dy = Math.max(-1, Math.min(1, dy));
  petEl.style.setProperty("--mx", dx);
  petEl.style.setProperty("--my", dy);
});

petEl.addEventListener("mouseleave", function () {
  petEl.style.setProperty("--mx", 0);
  petEl.style.setProperty("--my", 0);
});

/* 点击 */
petEl.addEventListener("click", function () {
  if (isAnimating) return;
  isAnimating = true;

  showBubble(randomPraise());
  triggerBounce();
  showHappyFace(450);
  cycleTheme();

  setTimeout(function () {
    isAnimating = false;
    hideTimer = setTimeout(hideBubble, 2600);
  }, 420);
});

/* 移动端 */
petEl.addEventListener("contextmenu", function (e) { e.preventDefault(); });

petEl.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var rect = petEl.getBoundingClientRect();
  var cx = rect.left + rect.width / 2;
  var cy = rect.top + rect.height / 2;
  var dx = (touch.clientX - cx) / (rect.width / 2);
  var dy = (touch.clientY - cy) / (rect.height / 2);
  dx = Math.max(-1, Math.min(1, dx));
  dy = Math.max(-1, Math.min(1, dy));
  petEl.style.setProperty("--mx", dx);
  petEl.style.setProperty("--my", dy);
}, { passive: true });

petEl.addEventListener("touchend", function () {
  petEl.style.setProperty("--mx", 0);
  petEl.style.setProperty("--my", 0);
});
