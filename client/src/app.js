//
const BTN_bid = document.querySelector("#btn-bid");
const FIELD_current_bid = document.querySelector("#bid-current");
const BTN_new_bid = document.querySelector("#btn-place_bid");
// Overlay elements
const OVERLAY_place_bid = document.querySelector("#overlay-place_bid");
const BTN_close_bid_overlay = document.querySelector("#btn-close_bid_overlay");
const BTN_place_bid = document.querySelector("#btn-place_bid");

async function connect(){
  let res = await fetch("/negotiate");
  let url = await res.text();
  let websocket = new WebSocket(url);
  websocket.onopen = () => {
    console.log("WebSocket opened");
  };
  websocket.onmessage = e => {
    console.log(e.data);
    // {currentBid: maxBid}
    let bid = JSON.parse(e.data).currentBid;
    FIELD_current_bid.innerText = bid;
  }
}
connect();
BTN_bid.addEventListener("click", () => {
  OVERLAY_place_bid.classList.toggle("hidden");
});
BTN_new_bid.addEventListener("click", () => {
  let value = document.getElementById("new-bid").value;
  let body = JSON.stringify({bid: value});
  console.log(body);
  fetch(`/bid?bid=${value}`, { method: "POST" }).then((response)=>{
    if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
        response.status);
      return;
    }
    OVERLAY_place_bid.classList.toggle("hidden");
    return response.text();
  }).then(text=>{
    FIELD_current_bid.innerText = text;
  }).catch((e)=>{
    document.getElementById("error").innerText = e;
  });
})
BTN_close_bid_overlay.addEventListener("click", () => {
  OVERLAY_place_bid.classList.toggle("hidden");
});
