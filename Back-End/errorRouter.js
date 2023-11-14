
export default function errorFunc(_req, res) {

    const response = {
        data: null,
        error: {
            messege: "404 not found"
        }
    }
    res.writeHead(404, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
        "content-type": "application/json",
        "content-length": Buffer.byteLength(JSON.stringify(response))
    })
    res.write(JSON.stringify(response))
    res.end()
}