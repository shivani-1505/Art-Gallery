import React from "react";

const VirtualTour = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Art Gallery Virtual Tour</h2>
      <iframe
        style={styles.iframe}
        src="https://www.google.com/maps/embed?pb=!4v1739352433032!6m8!1m7!1s9c7ir7nppKPJgtHHhIf_vw!2m2!1d48.8599720182624!2d2.326003137199185!3f230.9652871251002!4f0!5f0.7820865974627469"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#0e0f12",
    color: "white",
    textAlign: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  iframe: {
    width: "80%",
    height: "500px",
    border: "0",
  },
};

export default VirtualTour;