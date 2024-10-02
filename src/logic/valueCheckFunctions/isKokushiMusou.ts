export const isKokushiMusou = (tileCount: { [key: string]: number }) => {
    const kokushiTiles = ["m1", "m9", "p1", "p9", "s1", "s9", "east", "south", "west", "north", "haku", "hatsu", "chun"];
    let uniqueCount = 0;
    let pairTile = false;

    for (const tile of kokushiTiles) {
        const count = tileCount[tile] || 0;
        if (count > 0) uniqueCount++;
        if (count === 2) pairTile = true;
    }

    return uniqueCount === 13 && pairTile;
};

export const isKokushiMusou13Wait = (tileCount: { [key: string]: number }, agariTile: string) => {
    return tileCount[agariTile] === 2;
};
