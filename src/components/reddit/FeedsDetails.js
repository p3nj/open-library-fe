/* eslint-disable react/prop-types */
import React, {useEffect, useState} from "react";
import moment from "moment/moment";
import parse from 'html-react-parser';
import SuchEmpty from "../defaults/SuchEmpty";
import {ThreeDots} from "react-loader-spinner";
import {ListGroup, Modal, Pagination} from 'react-bootstrap';


export default function FeedsDetails(props) {
    const [data, setData] = useState([]);
    const [img, setImg] = useState({
        show: false,
        item: {},
    });

    const [thread, setThread] = useState({
        show: false,
        item: {},
    });


    const Loading = () => {
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
    const decodeHtml = (html) => {
        let txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    const isImg = (url) => {
        return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
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
            setImg({
                show: true,
                item: m
            });
        } else {
            return window.location = m.url;
        }
    }

    const handleThreadLink = () => {
        setThread({
            show: false,
            item: {},
        });
        if (isImg(thread.item.url)) {
            setImg({
                show: true,
                item: thread.item
            });
        } else {
            return window.location = `https://www.reddit.com/${thread.item.permalink}`
        }
    }


    const handleTitleClick = m => {
        console.log(m.data);
        setThread({
            show: true,
            item: m.data,
        });
    }

    const handleImgClose = () => {
        setImg({
            show: false,
            item: {}
        });
    }
    const handleThreadClose = () => {
        setThread({
            show: false,
            item: {}
        });
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
                                                src={isImg(m.data.thumbnail) ? m.data.thumbnail : "https://i.redd.it/ldbo7yn202m21.jpg"}
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
                                                <small className="h6 feeds-author">Posted
                                                    by {m.data.author} at {handleTimeDisplay(m.data)}  </small>
                                            </div>
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

            <Modal size="lg" show={thread.show} fullscreen={false} onHide={handleThreadClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{thread.item.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"mb-1"} style={{overflow: "hidden"}}>
                        {
                            thread.item.selftext === '' ?
                                handleThreadLink()
                                : parse(decodeHtml(thread.item.selftext_html))
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-content-between">
                        <span className="h6">
                            by <span
                            className="h5"> {thread.item.author}</span> at {handleTimeDisplay(thread.item)} with <span
                            className="h5">{handleUpVoteDisplay(thread.item.score)}</span> upvodes
                        </span>
                    </div>
                </Modal.Footer>
            </Modal>

            <Modal size="lg" show={img.show} onHide={handleImgClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{img.item.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img className="img-fluid" alt="img" src={img.item.url}></img>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-between">
                        <p style={{fontSize: "calc(5px + 2vmin)"}}>
                            by <span
                            className="h6"> {img.item.author}</span> at <span
                            className="h6">{handleTimeDisplay(img.item)}</span> with <span
                            className="h6">{handleUpVoteDisplay(img.item.score)}</span> upvodes
                        </p>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
