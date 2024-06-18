import React, { useState } from "react";
import "./Style.css";

function RegisterF() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vérifier que le mot de passe et la confirmation de mot de passe correspondent
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    // Logique pour soumettre les données d'inscription
    console.log("Email:", email);
    console.log("Mot de passe:", password);
    console.log("Confirmation de mot de passe:", confirmPassword);
    // Réinitialiser les champs après la soumission
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="F-page">
      <div className="container">
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit} className="form-register row">
          <div className="col-lg-6">
            <label>First Name :</label>
            <input type="text" required />
          </div>
          <div className="col-lg-6">
            <label>Last Name :</label>
            <input type="text" required />
          </div>
          <div className="col-lg-12">
            <label htmlFor="email">E-mail :</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="col-lg-12">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="col-lg-12">
            <label htmlFor="confirmPassword">Confirm password :</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterF;
