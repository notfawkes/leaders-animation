import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollVideo.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideo() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    // Wait until metadata is loaded
    const handleLoaded = () => {
      const duration = video.duration;

      // GSAP timeline
      gsap.to(video, {
        currentTime: duration,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom+=200% top", // length of scroll
          scrub: 1, // makes it smooth
          pin: true, // keeps video in view while scrolling
          anticipatePin: 1,
        },
      });
    };

    video.addEventListener("loadedmetadata", handleLoaded);

    return () => video.removeEventListener("loadedmetadata", handleLoaded);
  }, []);

  return (
    <div ref={containerRef} className="scroll-video-container">
      {/* Scroll-controlled fullscreen video */}
      <section className="video-section">
        <video
          ref={videoRef}
          src="/smooth-lemons.mp4"
          preload="auto"
          playsInline
          muted
        />
      </section>

      {/* Next section */}
      <section className="content-section">
        <h2>Next Section Appears Here</h2>
        <p>
          This is the next part of your page — add your next React component
          here! The video above will play smoothly as you scroll.
        </p>
      </section>
    </div>
  );
}
