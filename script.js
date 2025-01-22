// ポイント管理
const pointsKey = "points";

// ポイントを取得
function getPoints() {
  const points = localStorage.getItem(pointsKey);
  return points ? parseInt(points, 10) : 0;
}

// ポイントを更新
function updatePointsDisplay() {
  const points = getPoints();
  const pointsDisplay = document.querySelectorAll("#points");
  pointsDisplay.forEach(display => (display.textContent = points));
}

// ポイントを消費して購入
function buyItem(cost, itemName) {
  const currentPoints = getPoints();
  if (currentPoints >= cost) {
    localStorage.setItem(pointsKey, currentPoints - cost);
    alert(`${itemName}を購入しました！`);
    updatePointsDisplay();
  } else {
    alert("ポイントが足りません！");
  }
}

// ショップボタンの設定
document.addEventListener("DOMContentLoaded", () => {
  updatePointsDisplay();

  const shopButton = document.getElementById("shop-button");
  if (shopButton) {
    shopButton.addEventListener("click", () => {
      window.location.href = "shop.html";
    });
  }

  const buyButtons = document.querySelectorAll(".buy-button");
  buyButtons.forEach(button => {
    button.addEventListener("click", () => {
      const shopItem = button.parentNode;
      const cost = parseInt(shopItem.dataset.cost, 10);
      const name = shopItem.dataset.name;
      buyItem(cost, name);
    });
  });
});
