import React from 'react';

const footerBottomStyle = {
    textAlign: 'center',
    paddingTop: '1rem',
}

const footerStyle = {
    width: "100%",
    backgroundColor: "#333",
    color: "#fff",
    padding: "1rem 0"
}

const Footer = () => {
    return (
        <footer className="footer" style={footerStyle}>
            <div className="footer-bottom" style={footerBottomStyle}>
                <p>IFN666 Web and Mobile Application Development - Benjamin Wang</p>
            </div>
        </footer>
    );
};

export default Footer;