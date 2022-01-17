import "./Footer.css";

const links = [
  { link: "about", url: "#" },
  { link: "write", url: "#" },
  { link: "help", url: "#" },
  { link: "legal", url: "#" },
];

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-wrapper">
        <div className="footer-logo">
          <img src={"/assets/large-logo.png"} />
        </div>
        <div className="footer-links">
          <ul>
            {links.map((x) => (
              <li key={x.link}>
                <a href={x.url}>{x.link}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
