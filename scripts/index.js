const search = document.querySelector("#search");
const kind = document.querySelector("#kind");
const category = document.querySelector("#category");
const list = document.querySelector("#notes");
const empty = document.querySelector("#empty");

let cards = [];
let monthHeadings = [];

function monthKey(date) {
  return date.slice(0, 7);
}

function monthLabel(key) {
  const [year, month] = key.split("-");
  return `${year}年${Number(month)}月`;
}

function appendTextElement(parent, tagName, className, text) {
  if (!text) return null;
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  parent.append(element);
  return element;
}

function createCard(item) {
  const card = document.createElement("a");
  card.className = "note-card";
  card.href = item.href;
  card.dataset.kind = item.kind;
  card.dataset.title = item.title;
  card.dataset.category = item.category;
  card.dataset.keywords = item.keywords || "";
  if (item.source) card.dataset.source = item.source;

  appendTextElement(card, "span", "kind", item.kind === "source" ? "外部資料" : "解説ノート");
  appendTextElement(card, "span", "tag", item.categoryLabel);
  appendTextElement(card, "span", "source-label", item.sourceLabel);
  appendTextElement(card, "h2", "", item.title);
  appendTextElement(card, "p", "", item.summary);

  const time = appendTextElement(card, "time", "", item.dateLabel || item.date);
  time.dateTime = item.date;

  return card;
}

function renderItems(items) {
  list.replaceChildren();
  let currentMonth = "";
  const sortedItems = [...items].sort((a, b) => b.date.localeCompare(a.date));

  sortedItems.forEach((item) => {
    const key = monthKey(item.date);
    if (key !== currentMonth) {
      currentMonth = key;
      const heading = document.createElement("h2");
      heading.className = "month-heading";
      heading.dataset.month = key;
      heading.textContent = monthLabel(key);
      list.append(heading);
    }
    list.append(createCard(item));
  });

  cards = [...document.querySelectorAll(".note-card")];
  monthHeadings = [...document.querySelectorAll(".month-heading")];
  filterItems();
}

function filterItems() {
  const query = search.value.trim().toLowerCase();
  let visible = 0;

  cards.forEach((card) => {
    const text = `${card.dataset.title} ${card.dataset.keywords} ${card.dataset.source || ""}`.toLowerCase();
    const matches =
      text.includes(query) &&
      (!kind.value || card.dataset.kind === kind.value) &&
      (!category.value || card.dataset.category === category.value);
    card.hidden = !matches;
    if (matches) visible += 1;
  });

  monthHeadings.forEach((heading) => {
    const nextCards = [];
    let node = heading.nextElementSibling;
    while (node && !node.classList.contains("month-heading")) {
      if (node.classList.contains("note-card")) nextCards.push(node);
      node = node.nextElementSibling;
    }
    heading.hidden = !nextCards.some((card) => !card.hidden);
  });

  empty.style.display = visible ? "none" : "block";
}

async function loadItems() {
  try {
    const response = await fetch("data/index-items.json", { cache: "no-cache" });
    if (!response.ok) throw new Error(`Failed to load index data: ${response.status}`);
    const items = await response.json();
    renderItems(items);
  } catch (error) {
    console.error(error);
    empty.textContent = "一覧データを読み込めませんでした。";
    empty.style.display = "block";
  }
}

search.addEventListener("input", filterItems);
kind.addEventListener("change", filterItems);
category.addEventListener("change", filterItems);

loadItems();
