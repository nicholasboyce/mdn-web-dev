addEventListener("message", (message) => {
    if (message.data.command === "generate") {
        generatePrimes(message.data.quota);
    }
});