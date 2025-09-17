// src/components/SplashScreen.jsx
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function SplashScreen({
  onFinish,
  backgroundImage = "/bg.png",          // <-- Pass your background image URL here
  logoImage = "/logo.png",  // optional, defaults to /logo.png
  secondImage = "/logo_text.png" // optional, defaults to /second-image.png
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // Hide splash after 5 seconds
    }, 5000); // total splash duration
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        key="splash"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#FFFFFF",
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none", // <-- background image applied here
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1 } }} // fade out on exit
      >
        {/* Logo appears at center, then moves up */}
        <motion.img
          src={logoImage}
          alt="Logo"
          style={{ width: "150px", marginBottom: "10px"}} // small gap
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -100, opacity: 1 }}
          transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
        />

        {/* Second image fades in below logo */}
        <motion.img
          src={secondImage}
          alt="Secondary"
          style={{ width: "400px", marginTop: "5px", opacity: 0 }} // small gap
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default SplashScreen;
