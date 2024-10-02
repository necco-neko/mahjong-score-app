const isRyuiso = (tileCount: { [key: string ]: number }): boolean => {
    const greenTiles = ['s2', 's3', 's4', 's6', 's8', 'hatsu'];
    for (let tile in tileCount) {
        if (tileCount[tile] > 0 && !greenTiles.includes(tile)) {
            return false;
        }
    }
    return true;
};

export default isRyuiso;