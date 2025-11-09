import React from "react";
import foodBanner from "../../assets/food-banner.jpg"

export default function AuthSidePanel() {
  return (
    <div 
      className="d-flex flex-column justify-content-center align-items-center p-4 text-light"
      style={{height: "100%", width: "90%"}}
    >
      <h3 className="text-center text-warning mb-2">Welcome Back!</h3>
      <p className="text-center mb-4">
        Login to continue exploring our services.
      </p>
    <img 
        src={foodBanner} 
        alt="Auth Banner"
        style={{ width: "100%", marginBottom: "200px" }}
      />
    </div>
  );
}
