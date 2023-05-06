/* eslint-disable react/prop-types */
import React, {useEffect, useState} from "react";
import {ThreeDots} from "react-loader-spinner";
import {ListGroup, Modal, Pagination} from 'react-bootstrap';
import moment from "moment/moment";
import SuchEmpty from "../defaults/SuchEmpty";
import parse from 'html-react-parser';


export default function FeedsDetails(props) {
    const [data, setData] = useState([]); const [modalShow, setModalShow] = useState(false);
    const [imgPerma, setImgPerma] = useState({});

    useEffect(() => {
        setData(props.posts);
    }, [props.loading])

    if (props.loading) {
        return <Loading/>
    }

    if (!props.thread) {
        console.log(props.thread);
        return <SuchEmpty/>
    }
    const handlePrevClick = () => {
        props.handleCallBack({
            before: props.paging.after,
        });
    }

    const handleNextClick = () => {
        props.handleCallBack({
            after: props.paging.after,
        });

    }

    const handleLinkClick = m => {
        if (isImg(m.url)) {
            setImgPerma(m);
        } else {
            return window.location = m.url;
        }
        setModalShow(true);
    }

    const handleTitleClick = m => {
        return window.location = `https://www.reddit.com/${m.data.permalink}`;
    }

    const handleTimeDisplay = m => {
        const date = moment.unix(m.created_utc);
        return date.fromNow();
    }

    const handleUpVoteDisplay = (value) => {
        const suffixes = ["", "K", "M", "B", "T"];
        const suffixNum = Math.floor(("" + value).length / 3);
        let shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(3));
        if (shortValue % 1 != 0) {
            shortValue = shortValue.toFixed(1);
        }
        return shortValue + suffixes[suffixNum];
    }

    return (
        <div className="container feeds-items">
            <ListGroup variant="flush" border="primary">
                <Pagination className="w-100">
                    <Pagination.Prev
                        className="w-50"
                        onClick={handlePrevClick}
                    />
                    <Pagination.Next
                        className="w-50"
                        onClick={handleNextClick}/>
                </Pagination>
                {
                    data.filter((r) => !r.data.stickied)
                        .map((m) => (
                                <ListGroup.Item
                                    className="feeds-items"
                                    key={m.data.id}
                                >
                                    <div className="d-flex justify-content-between align-items-center feeds-items">
                                        <div className="d-flex align-items-left">
                                            <img
                                                className="img-fulid"
                                                src={ isImg(m.data.thumbnail) ? m.data.thumbnail : "https://i.redd.it/ldbo7yn202m21.jpg"}
                                                alt="Thread Picture"
                                                onClick={() => handleLinkClick(m.data)}
                                                style={{
                                                    width: '10vw',
                                                    height: '10vh',
                                                    marginRight: '1rem',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <div>
                                                <p
                                                    className="h5 bold mb-1"
                                                    onClick={() => handleTitleClick(m)}
                                                >
                                                    {m.data.title}
                                                </p>
                                                <p
                                                    className="mb-1"
                                                >
                                                    {m.kind === "t3" ?
                                                            parse(decodeHtml(m.data.selftext_html)): <br />
                                                    }
                                                </p>
                                                <small className="h6 feeds-author">Posted
                                                    by {m.data.author} at {handleTimeDisplay(m.data)}  </small>
                                            </div>
                                        </div>
                                        <div className="container-fulid">
                                            <span className="mx-1 w-20 bold h4">{handleUpVoteDisplay(m.data.score)}</span>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            )
                        )
                }
                <Pagination className="w-100">
                    <Pagination.Prev
                        className="w-50"
                        onClick={handlePrevClick}
                    />
                    <Pagination.Next
                        className="w-50"
                        onClick={handleNextClick}/>
                </Pagination>
            </ListGroup>
            <Modal size="lg" show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{imgPerma.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img className="img-fluid" alt="img" src={imgPerma.url}></img>
                </Modal.Body>
            </Modal>
        </div>
    )
}
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
function Loading() {
    return (
        <ThreeDots
            height="100"
            width="100"
            radius="9"
            color="lightgrey"
            ariaLabel="loading"
            wrapperStyle={{}}
            wrapperClass="loader"
            visible={true}
            className="container-fulid loader"
        />
    )
}

function isImg(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

