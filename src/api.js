const contentType = "application/json charset=UTF8";
const redditUrl = "https://cors-anywhere-3.herokuapp.com/";
const statsUrl = "https://api.coinstats.app/public/v1/";


export default function FetchData(params, controller) {
    let url;
    if (!params.apiUri.includes('coin')) {
        url = buildUrl(params, controller);
    } else {
        url = `${statsUrl}${params.apiUri}`;
    }
    const options = {
        method: 'GET',
        headers: {
            'content-type': contentType,
            'accept': '*/*',
        }
    };

    return fetch(url, options)
        .then(r => r.json())
        .then(r => JSON.parse(JSON.stringify(r)))
        .catch(e => {
            return e;
        })
}


function buildUrl(params, controller) {
    let url;
    const queryPrefix = "?";
    if (Object.keys(controller).length === 0) {
        url = `${redditUrl}${params.apiUri}.json`
    } else {
        let filteredCon = Object.keys(controller)
            .filter((k) => controller[k] != null)
            .reduce((a, k) => ({...a, [k]: controller[k]}), {});
        const queryString = queryPrefix + Object.keys(filteredCon)
            .map(m => `${encodeURIComponent(m)}=${encodeURIComponent(controller[m])}`)
            .join('&');
        url = `${redditUrl}${params.apiUri}.json${queryString}`
    }
    return url;
}