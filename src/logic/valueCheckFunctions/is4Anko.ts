export const is4Anko = (tileCount: { [key: string ]: number }, selectedOption1: boolean): boolean => {
    if (selectedOption1) return false;

    //刻子(暗カンによる槓子を含む)をカウントする
    let tripletCount = 0;
    let pairCount = 0;

    for (let tile in tileCount) {
        const count = tileCount[tile];
        if (count === 3 || count === 4) {
            tripletCount++;
        } else if (count === 2) {
            pairCount++;
        }
    }

    //刻子が4と雀頭1で四暗刻成立
    if (tripletCount === 4 && pairCount === 1) {
        return true;
    }

    return false;
};

export const is4AnkoTanki = (tileCount: { [key: string ]: number }, agariTile: string): boolean => {
    //(四暗刻成立を前提とし)あがり牌と雀頭が同種の場合、四暗刻単騎が成立
    if (tileCount[agariTile] === 2) return true;
    return false;
};