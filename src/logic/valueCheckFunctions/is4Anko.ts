export const is4Anko = (tileCount: { [key: string ]: number }, agariTile: string, selectedOption1: boolean, selectedOption3: boolean): boolean => {
    if (selectedOption1) return false;

    // あがり牌を除いた手牌を確認
    const adjustedTileCount = { ...tileCount };
    if (adjustedTileCount[agariTile]) {
        adjustedTileCount[agariTile] -= 1;
    }

    //刻子(暗カンによる槓子を含む)をカウントする
    let tripletCount = 0;
    let pairCount = 0;

    for (let tile in adjustedTileCount) {
        const count = adjustedTileCount[tile];
        if (count === 3 || count === 4) {
            tripletCount++;
        } else if (count === 2) {
            pairCount++;
        }
    }

    //刻子が3・対子2の状態でロンあがりの時は不成立
    if (tripletCount === 3 && pairCount === 2 && selectedOption3) {
        return false;
    }

    //あがり牌を含む手牌を確認
    //刻子(暗カンによる槓子を含む)のカウントをリセット
    tripletCount = 0;
    pairCount = 0;

    for (let tile in tileCount) {
        const count = tileCount[tile];
        if (count === 3 || count === 4) {
            tripletCount++;
        } else if (count === 2) {
            pairCount++;
        }
    }

    // 刻子が4つと雀頭1つで四暗刻成立
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