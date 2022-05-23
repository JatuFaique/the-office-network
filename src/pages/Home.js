import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RightBar from "../Components/RightBar";
import SideBar from "../Components/SideBar";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    //   Get posts
  });
  return (
    <div className="container grid">
      <SideBar />
      <div class="col-2">
        <div class="flex py-2">
          <div class="create__post border-radius border-vs flex p-0-5">
            <div class="row flex">
              <div class="av-lg txt br-scn bg-acc">
                A<span class="badge-act"></span>
              </div>
              <textarea
                class="border-bs p-0-5"
                placeholder="Whats on your Mind?"
              ></textarea>
            </div>
            <button class="btn bg-prm py-0-25 px-0-5 txt-white">Send</button>
          </div>
        </div>
        <div class="filter border-bs border-radius flex">
          <div class="filter__trending p-1 txt bold txt-scn">
            <i class="fa-solid fa-fire"></i>Trending
          </div>
          <div class="filter__recent p-1 txt">
            <i class="fa-solid fa-bolt"></i>Recent
          </div>
        </div>
        <div class="flex p-2">
          <div class="post border-bs px-2 py-1 post__horizontal">
            <div class="post__header flex">
              <div class="av-lg txt-prm br-prm">
                A <span class="badge-act"></span>
              </div>
              <span>
                <h3>Title</h3>
              </span>
            </div>
            <div class="post__text py-1">
              <p>
                Visit ten places on our planet that are undergoing the biggest
                changes today. Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Doloremque alias corporis repellendus velit
                dolore deserunt ad sunt nam eos totam, quibusdam vero. Repellat,
                autem ut quo aspernatur similique quod reprehenderit.
              </p>
            </div>
            <div class="post__buttons flex py-1">
              <span class="txt-scn">
                {/* <!-- <i class="fa-solid fa-heart"></i> --> */}
                <i class="fa-regular fa-heart"></i>
                Like
              </span>
              <span>
                <i class="fa-regular fa-bookmark"></i>
                BookMark
              </span>
            </div>
            <div class="user__comment flex">
              <div class="av-m txt-prm br-prm">
                A <span class="badge-act"></span>
              </div>
              <input class="border-bs" type="text" />
              <button class="btn bg-prm py-0-25 px-0-5 txt-white">Send</button>
            </div>
            <div class="post__comments flex column py-1">
              <div class="comment__card border-radius p-0-5">
                <div class="flex">
                  <div class="av-m txt-white bg-scn">R</div>
                  <span>
                    <h3>Hello</h3>
                  </span>
                </div>

                <div class="comment__content">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Repellendus ut deserunt
                  </p>
                </div>
              </div>
              <div class="comment__card border-radius p-0-5">
                <div class="flex">
                  <div class="av-m txt-white bg-scn">R</div>
                  <span>
                    <h3>Hello</h3>
                  </span>
                </div>

                <div class="comment__content">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Repellendus ut deserunt
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex px-2 py-1">
          <div class="post border-bs px-2 py-1 post__horizontal">
            <div class="post__header flex">
              <div class="av-lg txt-prm br-prm">
                A <span class="badge-act"></span>
              </div>
              <span>
                <h3>Title</h3>
              </span>
            </div>
            <div class="post__text py-1">
              <p>
                Visit ten places on our planet that are undergoing the biggest
                changes today. Lorem ipsum, dolor sit amet consectetur
              </p>
            </div>
            <div class="post__buttons flex py-1">
              <span class="txt-scn">
                {/* <!-- <i class="fa-solid fa-heart"></i> --> */}
                <i class="fa-regular fa-heart"></i>
                Like
              </span>
              <span>
                <i class="fa-regular fa-bookmark"></i>
                BookMark
              </span>
            </div>
            <div class="user__comment flex">
              <div class="av-m txt-prm br-prm">
                A <span class="badge-act"></span>
              </div>
              <input type="text" />
              <button class="btn bg-prm py-0-25 px-0-5 txt-white">Send</button>
            </div>
            <div class="post__comments flex column py-1">
              <div class="comment__card border-radius p-0-5">
                <div class="flex">
                  <div class="av-m txt-white bg-scn">R</div>
                  <span>
                    <h3>Hello</h3>
                  </span>
                </div>

                <div class="comment__content">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Repellendus ut deserunt
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RightBar />
    </div>
  );
}

export default Home;
