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
                <p>Yet Another Crypto Viewer is the best thing since sliced bread.</p>
            </div>
        </footer>
    );
};

export default Footer;
