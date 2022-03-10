import React, { useState, useEffect, useRef } from 'react';
import { gsap } from "gsap";
import lottie from "lottie-web";
import lightning from "../../../lottie/lightning.json";
import lightningMob from "../../../lottie/lightningMob.json";
import "./nav.scss";

function Nav() {

  // todo: handle menu color on scroll
  console.log(lightning);
  const anime = useRef(null);
  const animeMob = useRef(null);
  
  useEffect(() => {

    if (window.screen.width > 968) {
      lottie.loadAnimation({
        container: anime.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: lightning,
      });
    } else {
      lottie.loadAnimation({
        container: animeMob.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: lightningMob,
      });
    }
    return () => lottie.destroy();
  }, []);

  const handleNav = async() => {
    let body = document.querySelector("body");
    let tl = gsap.timeline();
     
      if (body.classList.contains("open")) {
        //Fermer le menu.
        body.classList.remove("open");
        tl.to(".sep", {
          duration: 0,
          opacity: 0,
        });

        tl.to(".sep__icon", {
          duration: 0,
          opacity: 0,
        });
       
      } else {
        //Ouvrir le menu.
        body.classList.add("open");
        
        tl.to(".sep", {
          duration: 0.75,
          height: "100%",
          delay: 0.5,
        });

        tl.to(".sep__icon", {
          opacity: 1,
          duration: 0.25,
          delay: -0.5,
        });

        tl.from(
          ".menu__left__inner__item",
          {
            y: 40,
            opacity: 1,
            stagger: 0.25,
          },
          "<-0.5"
        );

        tl.from(
          ".menu__right__inner__item",
          {
            y: 40,
            opacity: 1,
            stagger: 0.25,
          },
          "<0.5"
        ); 
      }
  }

  return (
    <header>
      <nav>
        <div onClick={handleNav} className={"toggle"}>
          <i className="fas fa-bars ouvrir"></i>
          <i className="fas fa-times fermer"></i>
        </div>
        <div className="menu">
          <div className="menu__left">
            <div className="menu__left__inner">
              <div className="menu__left__inner__item">
                <a href="#">
                  Home{" "}
                  <span className="menu__left__inner__item__small">#01</span>
                </a>
              </div>
              <div className="menu__left__inner__item">
                <a href="#">
                  About{" "}
                  <span className="menu__left__inner__item__small">#02</span>
                </a>
              </div>
              <div className="menu__left__inner__item">
                <a href="#">
                  Products{" "}
                  <span className="menu__left__inner__item__small">#03</span>
                </a>
              </div>
              <div className="menu__left__inner__item">
                <a href="#">
                  Contact{" "}
                  <span className="menu__left__inner__item__small">#04</span>
                </a>
              </div>
            </div>
          </div>
          <div className="menu__right">
            <div className="menu__right__inner">
              <div className="menu__right__inner__item">
                <div className="menu__right__inner__item__title">Contact</div>
                <ul>
                  <li>
                    <a href="mailto:contact@website.com">contact@website.com</a>
                  </li>
                </ul>
              </div>
              <div className="menu__right__inner__item">
                <div className="menu__right__inner__item__title">Socials</div>
                <ul>
                  <li>
                    <a href="#">Facebook</a>
                  </li>
                  <li>
                    <a href="#">Instagram</a>
                  </li>
                  <li>
                    <a href="#">Youtube</a>
                  </li>
                  <li>
                    <a href="#">Twitter</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="sep"></div>
          <div className="sep__icon">D£US</div>
        </div>
        <div className="anime" ref={anime}></div>
        <div className="animeMob" ref={animeMob}></div>
      </nav>
    </header>
  );
}

export default Nav
