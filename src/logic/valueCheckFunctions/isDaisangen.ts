const isDaisangen = (tileCount: { [key: string ]: number }): boolean => {
    const sangenTiles = ['haku', 'hatsu', 'chun'];
    for (let tile of sangenTiles) {
        if (!tileCount[tile] || tileCount[tile] < 3) {
            return false;
        }
    }
    return true;
};

export default isDaisangen;