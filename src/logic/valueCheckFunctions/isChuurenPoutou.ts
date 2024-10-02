export const isChuurenPoutou = (tileCount: { [key: string]: number }) => {
    // m1 と m9 がそれぞれ3枚以上、m2からm8がそれぞれ1枚以上であるかを確認
    const countM1 = tileCount['m1'] || 0;
    const countM9 = tileCount['m9'] || 0;
    
    const countM2toM8 = ['m2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8'].every(tile => (tileCount[tile] || 0) > 0);

    // 九蓮宝燈の成立条件
    const isValidChuurenPoutou = countM1 >= 3 && countM9 >= 3 && countM2toM8;
    
    return isValidChuurenPoutou;
};

export const isJunseiChuurenPoutou = (tileCount: { [key: string]: number }, agariTile: string) => {
    //あがり牌を除いた手牌を確認
    const adjustedTileCount = { ...tileCount };
    if (adjustedTileCount[agariTile]) {
        adjustedTileCount[agariTile] -= 1;
    }

    //除外後の手牌の枚数を確認
    const countM1 = adjustedTileCount['m1'] || 0;
    const countM9 = adjustedTileCount['m9'] || 0;
    const countM2toM8 = ['m2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8'].every(tile => (adjustedTileCount[tile] || 0) === 1);
    const isPure = countM1 === 3 && countM9 === 3 && countM2toM8;

    return isPure;
};