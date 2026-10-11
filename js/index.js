/* =========================
   Pickup Slider
========================= */

const pickupIds = ["01", "07", "16"];

const pickupProducts = pickupIds
  .map((id) => products.find((product) => product.id === id))
  .filter(Boolean);

const pickup = document.querySelector(".pickup");
const pickupSlider = pickup?.querySelector(".pickupSlider");
const pickupList = pickup?.querySelector(".pickupList");
const pickupDots = pickup?.querySelector(".pickupDots");
const pickupPrev = pickup?.querySelector(".pickupPrev");
const pickupNext = pickup?.querySelector(".pickupNext");

if (
  pickupList &&
  pickupDots &&
  pickupPrev &&
  pickupNext &&
  pickupProducts.length
) {
  let currentIndex = 0;
  let touchStartX = 0;
  let touchStartY = 0;

  // 商品を生成
  pickupProducts.forEach((product, index) => {
    const item = document.createElement("article");

    item.classList.add("pickupItem");

    if (index === 0) {
      item.classList.add("is-active");
    }

    item.innerHTML = `
      <div class="pickupImg visual">
        <img src="${product.image}" alt="${product.name}" />

      </div>

      <div class="pickupInfo">
        <span class="pickupNumber">${product.id}</span>

        <div class="pickupDetails">
          <h3 class="pickupName">${product.name}</h3>
          <p class="pickupDescription">${product.description}</p>
          <p class="pickupPrice">
            ¥ ${product.price.replace("¥", "").trim()}
          </p>
        </div>

        <a
          href="/product.html?product=${product.id}"
          class="textLink pickupView"
        >
          View More
        </a>
      </div>
    `;

    pickupList.append(item);
  });

  const items = [...pickupList.querySelectorAll(".pickupItem")];

  // ドットを生成
  pickupProducts.forEach((product, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.classList.add("pickupDot");
    dot.setAttribute("aria-label", `${product.name}を表示`);
    dot.setAttribute("aria-pressed", String(index === 0));

    if (index === 0) {
      dot.classList.add("is-active");
    }

    dot.addEventListener("click", () => {
      showPickup(index);
    });

    pickupDots.append(dot);
  });

  const dots = [...pickupDots.querySelectorAll(".pickupDot")];

  // 表示切り替え
  function showPickup(index) {
    currentIndex = (index + items.length) % items.length;

    items.forEach((item, itemIndex) => {
      const isActive = itemIndex === currentIndex;

      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-hidden", String(!isActive));
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === currentIndex;

      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-pressed", String(isActive));
    });
  }

  // 左右の矢印
  pickupPrev.addEventListener("click", () => {
    showPickup(currentIndex - 1);
  });

  pickupNext.addEventListener("click", () => {
    showPickup(currentIndex + 1);
  });

  // スマホのスワイプ
  pickupSlider.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.changedTouches[0];

      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    },
    { passive: true },
  );

  pickupSlider.addEventListener(
    "touchend",
    (event) => {
      const touch = event.changedTouches[0];

      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;

      // 横方向に十分動いたときだけ切り替える
      if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) {
        return;
      }

      showPickup(currentIndex + (deltaX < 0 ? 1 : -1));
    },
    { passive: true },
  );

  // 商品が1つしかない場合は操作を隠す
  const hasMultipleItems = items.length > 1;

  pickupPrev.hidden = !hasMultipleItems;
  pickupNext.hidden = !hasMultipleItems;
  pickupDots.hidden = !hasMultipleItems;

  showPickup(0);
}
