const mult = (a,b) => {
    if (a === null || b === null) return null;
    if (typeof a == "string" || typeof b == "string") return "string";
    if(a === undefined || b === undefined) return undefined;
    return a * b;
};

module.exports = mult;