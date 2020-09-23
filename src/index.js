async function start() {
    return Promise.resolve("promise");
}

start().then(console.log);
