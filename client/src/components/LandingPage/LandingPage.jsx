import React from "react";
import { useNavigate } from "react-router-dom";
import "./landingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="landing-container">
        <div className="landing-content">
          <h1>¡Bienvenido/a a TalentGo!</h1>
          <p>Encuentre su trabajo ideal con nuestra plataforma</p>
          <button onClick={() => navigate("/home")}>Ingresar</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
