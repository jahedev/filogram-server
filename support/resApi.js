// Used to send API responses with a result being "success", "error",
// or user chosen string, and a custom message.
module.exports = resAPI = (result, message) => {
    return {
        result:
            typeof result === "boolean"
                ? result
                    ? "success"
                    : "error"
                : result,
        message: message,
    };
};
