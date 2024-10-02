const isTsuiso = (tileCount: { [key: string ]: number }): boolean => {
    const honorTiles = ["east", "south", "west", "north", "haku", "hatsu", "chun"];
    for (let tile in tileCount) {
        if (tileCount[tile] > 0 && !honorTiles.includes(tile)) {
            return false;
        }
    }
    return true;
};

export default isTsuiso;