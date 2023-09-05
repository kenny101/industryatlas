import IconGithub from "../assets/IconGithub";

const btnStyle: React.CSSProperties = {
  position: "fixed",
  top: "10px",
  right: "10px",
  padding: "10px",
  zIndex: 1000,
  fontSize: "40px",
  border: "none",
  width: "60px",
  height: "60px",
  borderRadius: "10px",
  backgroundColor: "rgba(51, 51, 51, 0.2)",
  color: "#333",
  cursor: "pointer",
};

const GithubButton = () => {
  return (
    <button style={btnStyle} id="GithubButton">
      <a
        href="https://github.com/kenny101/cbp-visualizer"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <IconGithub />
      </a>
    </button>
  );
};

export default GithubButton;
