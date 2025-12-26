const movies = [
  {
    id: "miracle",
    title: "奇迹·笨小孩",
    category: "热门",
    rating: 8.4,
    tags: ["励志", "家庭"],
    poster: "assets/images/posters/poster1.jpg",
    cast: "易烊千玺 / 田雨",
    length: "118分钟"
  },
  {
    id: "wandering-earth-2",
    title: "流浪地球2",
    category: "正在热映",
    rating: 9.1,
    tags: ["科幻", "IMAX"],
    poster: "assets/images/posters/poster2.jpg",
    cast: "吴京 / 刘德华",
    length: "173分钟"
  },
  {
    id: "dune-2",
    title: "沙丘2",
    category: "正在热映",
    rating: 9.0,
    tags: ["科幻", "史诗"],
    poster: "assets/images/posters/poster3.jpg",
    cast: "提莫西·查拉梅 / 赞达亚",
    length: "166分钟"
  },
  {
    id: "detective-chinatown-3",
    title: "唐人街探案3",
    category: "经典",
    rating: 7.4,
    tags: ["喜剧", "悬疑"],
    poster: "assets/images/posters/poster4.jpg",
    cast: "王宝强 / 刘昊然",
    length: "136分钟"
  },
  {
    id: "no-more-bet",
    title: "孤注一掷",
    category: "热门",
    rating: 8.2,
    tags: ["犯罪", "反诈"],
    poster: "assets/images/posters/poster5.jpg",
    cast: "张艺兴 / 金晨",
    length: "129分钟"
  },
  {
    id: "inside-out-2",
    title: "头脑特工队2",
    category: "即将上映",
    rating: 8.9,
    tags: ["动画", "家庭"],
    poster: "assets/images/posters/poster6.jpg",
    cast: "艾米·波勒 (配音)",
    length: "100分钟"
  },
  {
    id: "avengers-endgame",
    title: "复仇者联盟4",
    category: "经典",
    rating: 9.2,
    tags: ["动作", "科幻"],
    poster: "assets/images/posters/poster7.jpg",
    cast: "小罗伯特·唐尼",
    length: "181分钟"
  },
  {
    id: "spider-verse",
    title: "蜘蛛侠：纵横宇宙",
    category: "即将上映",
    rating: 9.3,
    tags: ["动画", "动作"],
    poster: "assets/images/posters/poster8.jpg",
    cast: "沙梅克·摩尔 (配音)",
    length: "140分钟"
  }
];

const carouselItems = [
  "wandering-earth-2",
  "dune-2",
  "no-more-bet",
  "miracle",
  "inside-out-2"
];

const boxOffice = [
  { rank: 1, title: "流浪地球2", amount: "5432万", trend: "up" },
  { rank: 2, title: "沙丘2", amount: "4210万", trend: "up" },
  { rank: 3, title: "孤注一掷", amount: "3102万", trend: "down" },
  { rank: 4, title: "奇迹·笨小孩", amount: "2850万", trend: "up" },
  { rank: 5, title: "头脑特工队2", amount: "2106万", trend: "up" },
  { rank: 6, title: "唐人街探案3", amount: "1901万", trend: "down" }
];

const state = {
  category: "全部",
  slideIndex: 0,
  timer: null,
  reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
};

const refs = {
  track: document.getElementById("carouselTrack"),
  dots: document.getElementById("carouselDots"),
  prev: document.getElementById("prevSlide"),
  next: document.getElementById("nextSlide"),
  grid: document.getElementById("movieGrid"),
  ranking: document.getElementById("rankingList"),
  recommend: document.getElementById("recommendList"),
  tabs: document.querySelectorAll(".category-tabs .tab"),
  searchInput: document.getElementById("searchInput"),
  clearSearch: document.getElementById("clearSearch"),
  suggestions: document.getElementById("suggestions")
};

const debounce = (fn, delay = 200) => {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), delay);
  };
};

function findMovie(id) {
  return movies.find((m) => m.id === id);
}

function renderCarousel() {
  refs.track.innerHTML = "";
  refs.dots.innerHTML = "";
  carouselItems.forEach((movieId, index) => {
    const movie = findMovie(movieId);
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.style.backgroundImage = `url(${movie.poster})`;

    const content = document.createElement("div");
    content.className = "slide-content";
    const title = document.createElement("h3");
    title.className = "slide-title";
    title.textContent = movie.title;
    const meta = document.createElement("p");
    meta.className = "slide-meta";
    meta.textContent = `${movie.cast} · 评分 ${movie.rating}`;
    content.append(title, meta);
    slide.append(content);
    refs.track.append(slide);

    const dot = document.createElement("div");
    dot.className = "dot";
    if (index === state.slideIndex) dot.classList.add("active");
    dot.addEventListener("click", () => updateSlide(index));
    refs.dots.append(dot);
  });
  updateSlide(0);
  startAutoPlay();
  addSwipe();
}

function updateSlide(nextIndex) {
  const total = carouselItems.length;
  state.slideIndex = (nextIndex + total) % total;
  refs.track.style.transform = `translateX(-${state.slideIndex * 100}%)`;
  Array.from(refs.dots.children).forEach((dot, idx) => {
    dot.classList.toggle("active", idx === state.slideIndex);
  });
}

function startAutoPlay() {
  if (state.reducedMotion) return;
  clearInterval(state.timer);
  state.timer = setInterval(() => updateSlide(state.slideIndex + 1), 4500);
}

function addSwipe() {
  let startX = 0;
  refs.track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    clearInterval(state.timer);
  });
  refs.track.addEventListener("touchend", (e) => {
    const delta = e.changedTouches[0].clientX - startX;
    if (Math.abs(delta) > 40) {
      updateSlide(state.slideIndex + (delta < 0 ? 1 : -1));
    }
    startAutoPlay();
  });
}

function renderMovies(filterCategory = state.category, searchTerm = "") {
  state.category = filterCategory;
  refs.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.category === filterCategory));
  let list = [...movies];
  if (filterCategory !== "全部") {
    list = list.filter((m) => m.category === filterCategory);
  }
  if (searchTerm) {
    list = list.filter((m) => m.title.includes(searchTerm));
  }
  refs.grid.innerHTML = "";
  list.forEach((m) => {
    const card = document.createElement("article");
    card.className = "card";

    const img = document.createElement("img");
    img.src = m.poster;
    img.alt = `${m.title} 海报 (请用真实图片替换占位图)`;

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = m.title;

    const meta = document.createElement("div");
    meta.className = "card-meta";
    meta.innerHTML = `<span>${m.cast}</span><span>评分 ${m.rating}</span>`;

    const badges = document.createElement("div");
    badges.className = "badges";
    m.tags.forEach((tag) => {
      const b = document.createElement("span");
      b.className = "badge";
      b.textContent = tag;
      badges.append(b);
    });

    const buttons = document.createElement("div");
    buttons.className = "button-row";
    const buy = document.createElement("button");
    buy.className = "btn-primary";
    buy.textContent = "选座购票";
    const trailer = document.createElement("button");
    trailer.className = "btn-ghost";
    trailer.textContent = "预告片";
    buttons.append(buy, trailer);

    const length = document.createElement("span");
    length.className = "meta";
    length.textContent = `片长 ${m.length}`;

    body.append(title, meta, badges, buttons, length);
    card.append(img, body);
    refs.grid.append(card);
  });
}

function renderRanking() {
  refs.ranking.innerHTML = "";
  boxOffice.forEach((item) => {
    const row = document.createElement("li");
    row.className = "rank-row";

    const num = document.createElement("span");
    num.className = "rank-num";
    num.textContent = item.rank;

    const title = document.createElement("span");
    title.className = "rank-title";
    title.textContent = item.title;

    const amount = document.createElement("span");
    amount.className = "rank-amount";
    amount.textContent = item.amount;

    const trend = document.createElement("span");
    trend.className = `trend ${item.trend}`;
    trend.innerHTML = item.trend === "up" ? "▲" : "▼";

    row.append(num, title, amount, trend);
    refs.ranking.append(row);
  });
}

function renderRecommend() {
  const picks = movies.slice(0, 5);
  refs.recommend.innerHTML = "";
  picks.forEach((m) => {
    const card = document.createElement("article");
    card.className = "small-card";

    const img = document.createElement("img");
    img.src = m.poster;
    img.alt = `${m.title} 推荐图 (请用真实图片替换占位图)`;

    const body = document.createElement("div");
    body.className = "small-card-body";
    const title = document.createElement("h4");
    title.className = "small-card-title";
    title.textContent = m.title;
    const meta = document.createElement("div");
    meta.className = "small-meta";
    meta.textContent = `${m.tags.join(" · ")} · 评分 ${m.rating}`;
    const btn = document.createElement("button");
    btn.className = "btn-primary";
    btn.textContent = "去购票";
    body.append(title, meta, btn);

    card.append(img, body);
    refs.recommend.append(card);
  });
}

function updateSuggestions(value) {
  const keyword = value.trim();
  refs.clearSearch.hidden = keyword.length === 0;
  if (!keyword) {
    refs.suggestions.hidden = true;
    refs.suggestions.innerHTML = "";
    renderMovies(state.category, "");
    return;
  }
  const matched = movies.filter((m) => m.title.includes(keyword)).slice(0, 6);
  refs.suggestions.innerHTML = "";
  matched.forEach((m) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = m.title;
    btn.addEventListener("click", () => {
      refs.searchInput.value = m.title;
      refs.suggestions.hidden = true;
      renderMovies("全部", m.title);
      refs.searchInput.blur();
    });
    li.append(btn);
    refs.suggestions.append(li);
  });
  refs.suggestions.hidden = matched.length === 0;
}

function bindEvents() {
  refs.prev.addEventListener("click", () => {
    updateSlide(state.slideIndex - 1);
    startAutoPlay();
  });
  refs.next.addEventListener("click", () => {
    updateSlide(state.slideIndex + 1);
    startAutoPlay();
  });

  refs.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      renderMovies(tab.dataset.category, "");
      refs.searchInput.value = "";
      refs.suggestions.hidden = true;
      refs.clearSearch.hidden = true;
    });
  });

  const debouncedSuggest = debounce(updateSuggestions, 220);
  refs.searchInput.addEventListener("input", (e) => debouncedSuggest(e.target.value));
  refs.searchInput.addEventListener("focus", (e) => updateSuggestions(e.target.value));
  refs.clearSearch.addEventListener("click", () => {
    refs.searchInput.value = "";
    updateSuggestions("");
  });
}

function init() {
  renderCarousel();
  renderMovies();
  renderRanking();
  renderRecommend();
  bindEvents();
}

document.addEventListener("DOMContentLoaded", init);
