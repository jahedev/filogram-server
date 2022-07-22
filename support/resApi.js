module.exports = resApi = (result, message) => {
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
