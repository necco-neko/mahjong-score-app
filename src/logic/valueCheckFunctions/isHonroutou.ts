const isHonroutou = (tileCount: { [key: string]: number }): boolean => {
    //1,9,字牌
    const validTiles = ["m1", "m9", "p1", "p9", "s1", "s9", "east", "south", "west", "north", "haku", "hatsu", "chun"];

    //1,9,字牌のみで構成されていなければ不成立
    for (const tile in tileCount) {
        if (tileCount[tile] > 0 && !validTiles.includes(tile)) {
            return false;
        }
    }

    return true;
};

export default isHonroutou;