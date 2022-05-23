import React from "react";

function RightBar() {
  return (
    <div class="col-3">
      <div class="flex pos-sticky p-2">
        <div class="user__suggestions p-0-25 border-radius">
          <h2 class="px-2 bold">Who to follow</h2>
          <div class="suggestions__lists px-1">
            <div class="suggestion__item flex py-0-5">
              <div class="av-lg txt-scn br-scn">A</div>
              <span>Adarsh Balika</span>
              <div>
                <button class="btn bg-scn txt-white border-bs">Follow</button>
              </div>
            </div>
            <div class="suggestion__item flex py-0-5">
              <div class="av-lg txt-scn br-scn">A</div>
              <span>Adarsh Balika</span>
              <div>
                <button class="btn bg-scn txt-white border-bs">Follow</button>
              </div>
            </div>
            <div class="suggestion__item flex py-0-5">
              <div class="av-lg txt-scn br-scn">A</div>
              <span>Adarsh Balika</span>
              <div>
                <button class="btn bg-scn txt-white border-bs">Follow</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightBar;
