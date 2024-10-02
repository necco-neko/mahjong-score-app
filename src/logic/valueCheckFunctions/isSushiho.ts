export const isDaisushi = (tileCount: { [key: string]: number }): boolean => {
    const windTiles = ['east', 'south', 'west', 'north'];

    for (let tile of windTiles) {
        if (!tileCount[tile] || tileCount[tile] < 3) {
            return false;
        }
    }
    return true;
};

export const isShosushi = (tileCount: { [key: string]: number }): boolean => {
    const windTiles = ['east', 'south', 'west', 'north'];

    let threeOrMoreCount = 0;
    let twoCount = 0;

    for (let tile of windTiles) {
        const count = tileCount[tile] || 0;

        if (count >= 3) {
            threeOrMoreCount++;
        } else if (count === 2) {
            twoCount++;
        }
    }

    return threeOrMoreCount === 3 && twoCount === 1;
};
