import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Nav from "./Nav";
import './home.scss';

import img7 from "../../img/7.png";
import img5 from "../../img/5.png";
import img6 from "../../img/6.png";

function Loading({ children }) {
  return <section className="loading">{children}</section>;
}

function Hero({ children }) {
  return <section className="hero">{children}</section>;
}

function Logo({ children }) {
  return <div className="logo">{children}</div>;
}

function Navigation({ children }) {
  return <Nav className="nav">{children}</Nav>;
}

function HeroH1({ children }) {
  return <h1 className="heroH1">{children}</h1>;
}

function HeroGp({ children }) {
  return <p className="heroGp">{children}</p>;
}

function Btn({ children }) {
  return <button className="btn">{children}</button>;
}


function Home() {

  const el = useRef();
  const q = gsap.utils.selector(el);

  // store the timeline in a ref.
  const tl = useRef();

  useEffect(() => {
    tl.current = gsap
      .timeline()
      .to(q(".loading"), {
        left: "100%",
        duration: 0.75,
      })
      .from(q(".hero"), {
        duration: 0.5,
        filter: "blur(5px)",
      })
      .from(q(".logo"), {
        opacity: 0,
        duration: 0.2,
      })
      .from(q(".nav"), {
        opacity: 0,
        duration: 0.2,
      })
      .from(q(".heroH1"), {
        opacity: 0,
        duration: 0.2,
      })
      .from(q(".heroGp"), {
        opacity: 0,
        duration: 0.2,
      })
      .from(q(".btn"), {
        opacity: 0,
        duration: 0.2,
      })
      .to(q(".loading"), {
        display: "none",
      });
    
  }, []);


  return (
    <div className="el" ref={el}>
      <Loading></Loading>

      <Hero>
        <Logo>MekaVerse</Logo>
        {/* <Socials>
          <ul>
            <li>
              <a href="#" target="_blank">
                <i className="fab fa-discord"></i>
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
          </ul>
        </Socials> */}
        <Navigation />
        <div className="heroG">
          <div>
            <HeroH1>
              Welcome on <span className="red">MekaVerse</span>
            </HeroH1>
            <HeroGp>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Similique doloremque vel laboriosam optio sunt eveniet illum,
              atque consequuntur quos omnis perferendis. Animi ex eveniet atque,
              ut enim nobis excepturi minus!
            </HeroGp>
            <a href="#">
              <Btn>See on OpenSea</Btn>
            </a>
          </div>
        </div>
        <div className="heroD"></div>
      </Hero>
      <section className="discord">
        <div className="container">
          <h2 data-aos="zoom-in">
            Join <span className="red">our Discord</span>
          </h2>
          <a href="#" data-aos="zoom-in-up">
            <Btn>Go !</Btn>
          </a>
        </div>
      </section>
      <div className="roadmap">
        <div className="container">
          <h2 data-aos="zoom-in">
            The <span className="red">Roadmap</span>
          </h2>
          <div className="line"></div>
          <div className="bloc" data-aos="zoom-in">
            <div className="number">1</div>
            <h4>Launch Roadmap</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum a
              repellendus nemo minus alias officia culpa ab. Eveniet esse
              repudiandae quisquam, necessitatibus iure, voluptatum ullam
              reiciendis molestias commodi, minima nemo.
            </p>
          </div>
          <div className="bloc" data-aos="zoom-in">
            <div className="number off">2</div>
            <h4>Launch Presale</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum a
              repellendus nemo minus alias officia culpa ab. Eveniet esse
              repudiandae quisquam, necessitatibus iure, voluptatum ullam
              reiciendis molestias commodi, minima nemo.
            </p>
          </div>
          <div className="bloc" data-aos="zoom-in">
            <div className="number off">3</div>
            <h4>Mint the remaining NFTs on OpenSea</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum a
              repellendus nemo minus alias officia culpa ab. Eveniet esse
              repudiandae quisquam, necessitatibus iure, voluptatum ullam
              reiciendis molestias commodi, minima nemo.
            </p>
          </div>
          <div className="bloc" data-aos="zoom-in">
            <div className="number off">4</div>
            <h4>Mint the remaining NFTs on OpenSea</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum a
              repellendus nemo minus alias officia culpa ab. Eveniet esse
              repudiandae quisquam, necessitatibus iure, voluptatum ullam
              reiciendis molestias commodi, minima nemo.
            </p>
          </div>
        </div>
      </div>
      <div className="team">
        <div className="container">
          <h2 data-aos="zoom-in">
            The <span className="red">Team</span>
          </h2>
          <div className="team__flex">
            <div className="member" data-aos="zoom-in">
              <h4>
                Ben / <span className="job">Blockchain Developper</span>
              </h4>
              <img src={img5} alt="Ben" />
            </div>
            <div className="member" data-aos="zoom-in">
              <h4>
                Marc / <span className="job">Designer</span>
              </h4>
              <img src={img6} alt="Marc" />
            </div>
            <div className="member" data-aos="zoom-in">
              <h4>
                Matt / <span className="job">Marketer</span>
              </h4>
              <img src={img7} alt="Matt" />
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className="container">
          <div className="footer__flex">
            <div className="footerG">MekaVerse</div>
            <div className="footerD">
              <ul>
                <li>
                  <a href="#">Link</a>
                </li>
                <li>
                  <a href="#">Link</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home
