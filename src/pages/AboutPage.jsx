import "../styles/about.css";

function AboutPage() {
  return (
    <div className="about">
      <h1 className="about-title">About Us</h1>

      <p className="about-text">
        This application is built with React, Redux and Firebase.
      </p>

      <p className="about-text">
        It uses the Rick and Morty API to display characters.
      </p>
    </div>
  );
}

export default AboutPage;
