import React, {useEffect, useState} from "react";
import {ThreeDots} from "react-loader-spinner";
import FetchData from "../../api";
import {AgGridReact} from 'ag-grid-react'; // the AG Grid React Component
import {Button, Modal} from "react-bootstrap";

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

export default function CryptoStats() {
    const [items, setItems] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [tradeKey, setTradeKey] = useState("");
    const [loading, setLoading] = useState(true);
    const riseNFall = {
        "cell-raise": params => params.value >= 0,
        "cell-fall": params => params.value < 0,
    }
    const props = {
        apiUri: 'coins'
    };

    const defaultColDef = {
        flex: 1,
        minWidth: 100,
        // allow every column to be aggregated
        enableValue: true,
        // allow every column to be grouped
        enableRowGroup: true,
        // allow every column to be pivoted
        enablePivot: true,
        sortable: true,
        filter: true,
    }

    const autoGroupColumnDef = {
        minWidth: 150,
    }

    const columnDefs = [
        {
            headerName: 'Powered by CoinStats.app',
            children: [
                {
                    field: 'Graph',
                    cellRenderer: (props) => renderGraphicBtn(props),
                },
                {
                    headerName: 'SYM',
                    field: 'icon',
                    cellRenderer: (props) => renderGraphicIcon(props),
                    cellStyle: {textAlign: 'left'},
                },
                {
                    field: 'name',
                    filter: true,
                    sortable: true,
                },
                {
                    field: 'price',
                    filter: 'agNumberColumnFilter',
                    sortable: true,
                    type: 'rightAligned',
                },
                {
                    headerName: 'to BTC',
                    field: 'priceBtc',
                    filter: 'agNumberColumnFilter',
                    sortable: true,
                    type: 'rightAligned',
                },
                {
                    headerName: '1 Hour',
                    field: 'priceChange1h',
                    cellClassRules: riseNFall,
                    filter: 'agNumberColumnFilter',
                    sortable: true,
                    maxWidth: 100
                },
                {
                    headerName: '1 Day',
                    field: 'priceChange1d',
                    cellClassRules: riseNFall,
                    filter: 'agNumberColumnFilter',
                    sortable: true,
                    maxWidth: 100
                },
                {
                    headerName: '1 Week',
                    field: 'priceChange1w',
                    cellClassRules: riseNFall,
                    filter: 'agNumberColumnFilter',
                    sortable: true,
                    maxWidth: 100
                },
                {
                    headerName: 'Website',
                    field: 'websiteUrl',
                    cellRenderer: (props) => renderURL(props),
                },
                {
                    headerName: 'Twitter',
                    field: 'twitterUrl',
                    cellRenderer: (props) => renderURL(props),
                }]
        }];


    useEffect(() => {
        FetchData(props, {})
            .then(r => {
                setItems(r.coins);
            })
            .finally(() => setLoading(false));
    }, [loading])


    if (loading) {
        return <ThreeDots
            height="100"
            width="100"
            radius="9"
            color="lightgrey"
            ariaLabel="loading"
            wrapperStyle={{}}
            wrapperClass="loader"
            visible={true}
        />
    }

    function resolveKey(e) {
        if (e.data.symbol === "USDT") {
            setTradeKey("BTC" + e.data.symbol);
        } else {
            setTradeKey(e.data.symbol + "USDT");
        }
    }

    function handleRowClick(e) {
        resolveKey(e);
        setModalShow(true);
    }

    function renderGraphicBtn(e) {
        return (
            <Button onClick={() => handleRowClick(e)}>Show</Button>
        )
    }

    function renderGraphicIcon(e) {
        const style = {
            width: "2rem",
            height: "2rem",
            marginRight: "0.3rem",
        }
        return (
            <div>
                <img alt="doge" style={style} src={e.data.icon}/>
                <span>{e.data.symbol}</span>
            </div>
        )
    }

    function renderURL(params) {
        if (params.data[params.colDef.field] === undefined) {
            return (<span> N/A </span>)
        }
        return (<a href={params.data[params.colDef.field]} rel="noreferrer" target="_blank">Open</a>)
    }

    items.map(m => {
        m.price = Number.parseFloat(m.price).toFixed(8);
    });


    return (
        <>
            <Modal
                className="modal-lg"
                aria-labelledby="contained-modal-title-vcenter"
                show={modalShow} onHide={() => setModalShow(false)}
                size="lg"
                centered
            >
                <Modal.Header>
                    <Modal.Title>{tradeKey}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <iframe width='100%' height='100%' src={`https://crypto-connect-web.vercel.app/?pair=${tradeKey}`}/>
                </Modal.Body>
                <Modal.Footer><span>Powered by crypto-connect-web</span></Modal.Footer>
            </Modal>
            <div className="ag-theme-alpine" style={{height: '95vh', width: '95vw'}}>
                <AgGridReact
                    rowData={items}
                    animateRows={true}
                    rowSelection="single"
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    paginationAutoPageSize={true}
                    autoGroupColumnDef={autoGroupColumnDef}
                    onRowDoubleClicked={(e) => handleRowClick(e)}
                >
                </AgGridReact>
            </div>
        </>
    )

}