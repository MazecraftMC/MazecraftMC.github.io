export async function onRequest(context: any) {
    const destinationURL = "https://plan.mazecraftmc.fun/v1/players";

    // Clone the headers
    const headers = new Headers(context.request.headers);

    // Set necessary headers for the upstream API
    headers.set("Origin", "https://plan.mazecraftmc.fun");
    headers.set("Referer", "https://plan.mazecraftmc.fun/");

    // Create the new request
    const newRequest = new Request(destinationURL, {
        method: context.request.method,
        headers: headers,
        redirect: 'follow'
    });

    try {
        return await fetch(newRequest);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
