/* =========================
   Product Elements
========================= */

const productGrid = document.querySelector(".productGrid");
const filterButtons = document.querySelectorAll(".productFilterButton");

const detailPanel = document.querySelector("#detailPanel");
const detailPanelClose = detailPanel?.querySelector(".detailPanelClose");

const detailPanelImg = detailPanel?.querySelector(".detailPanelImg img");
const detailPanelNumber = detailPanel?.querySelector(".detailPanelNumber");
const detailPanelName = detailPanel?.querySelector(".detailPanelName");
const detailPanelPrice = detailPanel?.querySelector(".detailPanelPrice");
const detailPanelSize = detailPanel?.querySelector(".detailPanelSize");
const detailPanelMaterial = detailPanel?.querySelector(".detailPanelMaterial");
const detailPanelColor = detailPanel?.querySelector(".detailPanelColor");
const detailPanelDescription = detailPanel?.querySelector(
  ".detailPanelDescription p",
);

/* =========================
   Product Card
========================= */

function createProductCard(product) {
  const article = document.createElement("article");

  article.classList.add("productCard", ...getProductLayoutClasses(product.id));

  article.dataset.category = product.category;
  article.dataset.product = product.id;

  article.innerHTML = `
    <button
      type="button"
      class="productCardButton"
      aria-label="${product.name}の詳細を見る"
    >
      <div class="productCardImg visual">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        />
      </div>

      <div class="productCardInfo">
        <span class="productCardNumber">${product.id}</span>

        <div>
          <h2 class="productCardName">${product.name}</h2>
          <p class="productCardPrice">${product.price}</p>
        </div>
      </div>
    </button>
  `;

  return article;
}

/* =========================
   Product Layout
========================= */

function getProductLayoutClasses(id) {
  const layoutMap = {
    "01": ["productCardSplit", "productCardSquare", "productCardMedium"],
    "02": ["productCardWide", "productCardMedium"],
    "03": ["productCardSplit", "productCardSquare", "productCardMedium"],
    "04": ["productCardWide", "productCardLarge"],
    "05": ["productCardWide", "productCardSmall"],
    "06": ["productCardPortrait", "productCardSmall"],
    "07": ["productCardWide", "productCardMedium"],
    "08": ["productCardSplit", "productCardSquare", "productCardMedium"],
    "09": ["productCardWide", "productCardMedium"],
    10: ["productCardPortrait", "productCardMedium"],
    11: ["productCardWide", "productCardMedium"],
    12: ["productCardSplit", "productCardSquare", "productCardMedium"],
    13: ["productCardWide", "productCardMedium"],
    14: ["productCardPortrait", "productCardMedium"],
    15: ["productCardWide", "productCardMedium"],
    16: ["productCardSplit", "productCardSquare", "productCardLarge"],
    17: ["productCardWide", "productCardLarge"],
    18: ["productCardPortrait", "productCardMedium"],
    19: ["productCardWide", "productCardMedium"],
    20: ["productCardSplit", "productCardSquare", "productCardMedium"],
    21: ["productCardWide", "productCardMedium"],
    22: ["productCardPortrait", "productCardSmall"],
    23: ["productCardWide", "productCardMedium"],
    24: ["productCardSplit", "productCardSquare", "productCardMedium"],
    25: ["productCardWide", "productCardMedium"],
    26: ["productCardPortrait", "productCardSmall"],
    27: ["productCardWide", "productCardMedium"],
    28: ["productCardSplit", "productCardSquare", "productCardMedium"],
    29: ["productCardWide", "productCardSmall"],
  };

  return layoutMap[id] || ["productCardMedium"];
}

/* =========================
   Render Products
========================= */

function renderProducts() {
  productGrid.innerHTML = "";

  products.forEach((product) => {
    const card = createProductCard(product);
    productGrid.append(card);
  });
}

/* =========================
   Category Filter
========================= */

function filterProducts(category) {
  const productCards = productGrid.querySelectorAll(".productCard");

  productCards.forEach((card) => {
    const cardCategory = card.dataset.category;

    card.classList.toggle(
      "is-hidden",
      category !== "all" && cardCategory !== category,
    );
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === filter;

      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive);
    });

    filterProducts(filter);
  });
});

const params = new URLSearchParams(window.location.search);
const category = params.get("category");

if (category) {
  const targetButton = document.querySelector(
    `.productFilterButton[data-filter="${category}"]`,
  );

  if (targetButton) {
    targetButton.click();
  }
}

/* =========================
   Detail Panel
========================= */

function openDetailPanel(productId) {
  const product = products.find((product) => product.id === productId);

  if (!product) {
    return;
  }

  detailPanelImg.src = product.image;
  detailPanelImg.alt = product.name;

  detailPanelNumber.textContent = product.id;
  detailPanelName.textContent = product.name;
  detailPanelPrice.textContent = product.price;

  detailPanelSize.textContent = product.size;
  detailPanelMaterial.textContent = product.material;
  detailPanelColor.textContent = product.color;

  detailPanelDescription.textContent = product.description;

  detailPanel.showModal();

  document.body.classList.add("is-panel-open");
}

/* =========================
   Open Detail Panel from URL
========================= */

const productId = params.get("product");

if (productId) {
  openDetailPanel(productId);
}

/* =========================
   Product Card Click
========================= */

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".productCardButton");

  if (!button) {
    return;
  }

  const card = button.closest(".productCard");
  const productId = card.dataset.product;

  openDetailPanel(productId);
});

/* =========================
   Close Detail Panel
========================= */

detailPanelClose.addEventListener("click", () => {
  detailPanel.close();
});

detailPanel.addEventListener("click", (event) => {
  if (event.target === detailPanel) {
    detailPanel.close();
  }
});

detailPanel.addEventListener("close", () => {
  document.body.classList.remove("is-panel-open");
});

/* =========================
   Initial Render
========================= */

renderProducts();
