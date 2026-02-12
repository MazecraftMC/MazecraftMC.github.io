// Cloudflare Pages function that proxies requests to the Bun stats server.
// Update BUN_SERVER_URL to match your deployment.

const BUN_SERVER_URL = "http://node.siddz.com:25572";

export async function onRequest(context: any) {
    const destinationURL = `${BUN_SERVER_URL}/api/kills`;

    const headers = new Headers();
    headers.set("Accept", "application/json");

    const newRequest = new Request(destinationURL, {
        method: "GET",
        headers: headers,
        redirect: "follow",
    });

    try {
        const response = await fetch(newRequest);
        const body = await response.text();

        return new Response(body, {
            status: response.status,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=300",
            },
        });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 502,
            headers: { "Content-Type": "application/json" },
        });
    }
}
