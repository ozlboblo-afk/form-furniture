/* =========================
   Pickup
========================= */

const pickupIds = ["01", "07", "16"];

const pickupProducts = pickupIds
  .map((id) => products.find((product) => product.id === id))
  .filter(Boolean);

const pickupList = document.querySelector(".pickupList");

if (pickupList) {
  pickupProducts.forEach((product, index) => {
    const item = document.createElement("article");

    item.classList.add("pickupItem");

    if (index === 0) {
      item.classList.add("is-active");
    }

    item.innerHTML = `
      <div class="pickupImg visual">
        <img
          src="${product.image}"
          alt="${product.name}"
        />
      </div>

      <div class="pickupInfo">

        <span class="pickupNumber">
          ${product.id}
        </span>

        <div class="pickupDetails">

          <h3 class="pickupName">
            ${product.name}
          </h3>

          <p class="pickupDescription">
            ${product.description}
          </p>

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
}

const pickupDots = document.createElement("div");

pickupDots.classList.add("pickupDots");

pickupProducts.forEach((product, index) => {
  const dot = document.createElement("button");

  dot.type = "button";
  dot.classList.add("pickupDot");

  if (index === 0) {
    dot.classList.add("is-active");
  }

  dot.setAttribute("aria-label", `${product.name}を表示`);

  dot.addEventListener("click", () => {
    document.querySelectorAll(".pickupItem").forEach((item, itemIndex) => {
      item.classList.toggle("is-active", itemIndex === index);
    });

    document.querySelectorAll(".pickupDot").forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });
  });

  pickupDots.append(dot);
});

pickupList.append(pickupDots);
