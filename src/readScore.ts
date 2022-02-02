function readScore(input: String) {
    if (!input || input.match(/^\s*$/))
        throw new Error("Invalid input : score can't be empty")

    let nb : number = parseInt(input);

    if (nb !== nb)
        throw new Error("Invalid input : score must be a number");

    if (nb < 0 || nb > 10)
        throw new Error("Invalid input : score must be within 0 and 10");

    return nb;
}

export { readScore }
