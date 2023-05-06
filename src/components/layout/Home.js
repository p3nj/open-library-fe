import React from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function LandingPageButton() {
    const navigate = useNavigate();
    return (
        <Button
            className="btn"
            variant="primary"
            onClick={() => navigate('/cryptostats')}
        >
            <span style={{fontSize: "24px"}}>
                Get Started!
            </span>
        </Button>
    )
}

function LandingFrameMessage() {
    const style = {
        margin: "auto",
        padding: "5% 35% 15% 5%",
        color: "lightgrey",
        fontWeight: 900,
        backgroundColor: "transparent",
        boxShadow: "(0 0 20px rgba(0, 0, 0, 0.5))",
    }
    return <div style={style}>

        <div style={{fontSize: "3rem"}}>
            Yet Another Crypto Viewer
        </div>

        <div style={{fontSize: "1rem"}}>
            Browse Reddit using official public JSON API.
            Track your favorite token on the CoinStats section. <br/>
            With the Biance realtime websocket protocol, you will retrieve the latest information that only delay is
            between you and the server.
        </div>

        <br/>
        <LandingPageButton/>
    </div>
}

function LandingFrame() {
    const style = {
        backgroundImage: `url('./images/landing.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "absolute",
        height: "100%",
        width: "100%"
    }
    return <div style={style}>
        <LandingFrameMessage/>
    </div>
}

function Home() {
    return <LandingFrame/>
}

export default Home;