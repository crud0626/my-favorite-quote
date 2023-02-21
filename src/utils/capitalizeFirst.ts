type capitalizeFirstType = (str: string, eachWord?: boolean) => string;

export const capitalizeFirst: capitalizeFirstType = (str, eachWord = false) => {
    const target = eachWord ? str.split(" ") : [str];

    const result = target.map((s) => {
        const firstChar = s.charAt(0).toUpperCase();
        const restChars = s.slice(1);
        return `${firstChar}${restChars}`;
    });

    return result.join(" ");
}