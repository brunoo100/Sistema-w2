import React from "react";
import "./home.css";
import logo from "../../img/image.png";

export default function Home() {
  return (
    <div className="container-home">
      <div className="home">
        <div>
          <img src={logo} alt="Logo" />
        </div>
        <div className="text-home">
          <p>Seja bem-vindo(a) a sistema</p>
        </div>
      </div>
    </div>
  );
}
