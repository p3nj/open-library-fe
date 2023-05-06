import React, {Suspense, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import FetchData from "../../api";
import {Form, Tab, Tabs} from 'react-bootstrap';

const FeedsDetailsComponent = React.lazy(() => import('./FeedsDetails'));


export default function Feeds() {
    let {boardName} = useParams();
    const boardTypeList = ["hot", "new", "best", "rising"];
    const [ boardTitle, setBoardTitle ] = useState(`r/${boardName}`);
    const [items, setItems] = useState({});
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uri, setUri] = useState(`r/${boardName}`);
    const [thread, setThread] = useState(true);
    const [params, setParams] = useState({
        q: null,
        after: null,
        before: null,
        limit: 10,
        count: 11,
    });
    const [pagination, setPagination] = useState({
        before: null,
        after: null,
    });
    const [keyword, setKeyword] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        const props = {
            apiUri: `api.reddit.com/${uri}`,
        }

        FetchData(props, params)
            .then(r => {
                setItems(r);
                try {
                    // avoid unvalid search result.
                    setPosts(r.data.children);
                    setThread(r.data.after?.startsWith('t3_'));
                }
                catch(e) {
                    setThread(false);
                }

                setPagination({
                    after: r.data.after,
                    before: r.data.before,
                });
            })
            .finally(() => setLoading(false));
    }, [loading]);


    const handleChange = event => {
        setKeyword(event.target.value);
    }

    const handleKeyDown = event => {
        const para = {
            after: null,
            before: null,
            limit: 15
        }
        if (event.key === 'Enter') {
            if (keyword.startsWith("r/")) {
                setUri(keyword);
                setBoardTitle(`${keyword}`);
                boardName = keyword.replace("r/", "");
                setParams({
                    ...para,
                    q: null,
                });
                navigate(`/${keyword}`);
            } else if (keyword.includes('in r/')) {
                const inputArr = keyword.replace(" in r/", "|").split("|");
                setUri(`r/${inputArr[1]}/search`);
                setBoardTitle(`"${inputArr[0]}" in r/${inputArr[1]}`);
                boardName = inputArr[1];
                window.history.replaceState({boardName: inputArr[1]}, "");
                console.log(inputArr[0].replace(" ", "+"));
                setParams({
                    ...para,
                    q: inputArr[0].replace(" ", "+"),
                });
                navigate(`/r/${inputArr[1]}/search`);
            } else {
                setUri("search");
                setBoardTitle(`"${keyword}"`);
                setParams({
                    ...para,
                    q: keyword,
                });
                navigate("/search");
            }
            event.target.value = "";
            setPosts([]);
            triggerLoading();
        }
    };


    // Handle child component callback
    const handleCallBack = (data) => {
        if (params.after === items.data.after) {
            return;
        }
        let newParams = {
            ...data,
            q: params.q,
            limit: 10,
            count: 11
        };
        setParams(newParams);
        triggerLoading();
    }

    // handle clicks on Tabs event
    const handleTabClick = eventKey => {
        setParams({
            q: params.q,
            before: null,
            after: null,
            limit: 10,
            count: 11,
        });
        setUri(`r/${boardName}/${eventKey}`);
        triggerLoading();
    }

    const triggerLoading = () => {
        setLoading(true);
    }

    return (
        <div id="feeds" className="container">
            <div className="sticky top-0 h-24 bg-blue-200">
                <Form.Label htmlFor="subreddit"
                            className="h1">{ boardTitle }</Form.Label>
                <Form.Control
                    type="text"
                    id="subreddit"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="r/pic for subreddit or phrase e.g. 'COVID 2023 in r/world' 'Covid News'"
                />
            </div>
            {!uri.includes('search') ?
                <Tabs
                    onSelect={handleTabClick}
                    defaultActiveKey="hot"
                    id="fill-tab"
                    className="mb-3 container-fulid"
                    fill
                    justify
                >
                    {
                        boardTypeList.map((m, i) => {
                                return (
                                    <Tab key={i} eventKey={m} title={m.toUpperCase()} style={{backgroundColor: "#28292A"}}>
                                        <Suspense fallback={<div>Loading...</div>}>
                                            <FeedsDetailsComponent
                                                posts={posts}
                                                boardType={m}
                                                loading={loading}
                                                paging={pagination}
                                                thread={thread}
                                                handleCallBack={handleCallBack}/>
                                        </Suspense>
                                    </Tab>)
                            }
                        )}
                </Tabs>
                :
                <Suspense fallback={<div>Loading...</div>}>
                    <FeedsDetailsComponent
                        posts={posts}
                        loading={loading}
                        paging={pagination}
                        thread={thread}
                        handleCallBack={handleCallBack}/>
                </Suspense>
            }

        </div>
    )
}
