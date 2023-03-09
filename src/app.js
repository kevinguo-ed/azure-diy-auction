//
const BTN_bid = document.querySelector("#btn-bid");
const FIELD_current_bid = document.querySelector("#bid-current");

// Overlay elements
const OVERLAY_place_bid = document.querySelector("#overlay-place_bid");
const BTN_close_bid_overlay = document.querySelector("#btn-close_bid_overlay");
const BTN_place_bid = document.querySelector("#btn-place_bid");

BTN_bid.addEventListener("click", () => {
  OVERLAY_place_bid.classList.toggle("hidden");
});

BTN_close_bid_overlay.addEventListener("click", () => {
  OVERLAY_place_bid.classList.toggle("hidden");
});
