import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollVideo.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideo() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleLoaded = () => {
      const duration = video.duration;

      // Main GSAP scroll animation
      gsap.to(video, {
        currentTime: duration,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom+=30% top", // scroll distance for full video
          scrub: true, // ties video progress to scroll
          pin: true, // keeps video in view
          anticipatePin: 1,
        },
      });
    };

    video.addEventListener("loadedmetadata", handleLoaded);
    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="scroll-video-container">
      <section className="video-section">
        <video
          ref={videoRef}
          src="/Final-Video-Smooth.mp4"
          preload="auto"
          playsInline
          muted
          style={{
            width: "100%",
            height: "100vh",
            objectFit: "cover",
            display: "block",
          }}
        />
      </section>

      <section className="content-section">
        <h2>Avada Kedavra</h2>
        <p>Kyu nahi hori padhai?</p>
      </section>
    </div>
  );
}
