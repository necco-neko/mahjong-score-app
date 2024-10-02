const tileCount = (tiles: string[]) => {
    const tileCount = tiles.reduce((countMap, tile) => {
        countMap[tile] = (countMap[tile] || 0) + 1;
        return countMap;
    }, {} as { [key: string]: number });
    return tileCount;
}

export default tileCount;