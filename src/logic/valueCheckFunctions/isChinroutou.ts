const isChinroutou = (tileCount: { [key: string ]: number }): boolean => {
    const endTiles = ['m1', 'm9', 'p1', 'p9', 's1', 's9'];
    for (let tile in tileCount) {
        if (tileCount[tile] > 0 && !endTiles.includes(tile)) {
            return false;
        }
    }
    return true;
};

export default isChinroutou;