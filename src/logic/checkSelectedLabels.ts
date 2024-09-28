const splitSelectedLabels = (selectedLabels: (string | null)[], ponCount: number, chiiCount: number, kanCount: number) => {
    //手牌の数
    const handLength = 13 - (ponCount + chiiCount + kanCount) * 3;

    //分割処理
    const handTiles = selectedLabels.slice(0, handLength);
    const ponTiles = [];
    const chiiTiles = [];
    const kanTiles = [];
    let index = handLength;

    //ポン
    for (let i = 0; i < ponCount; i++) {
        ponTiles.push(selectedLabels.slice(index, index + 3));
        index += 3;
    };

    //チー
    for (let i = 0; i < chiiCount; i++) {
        chiiTiles.push(selectedLabels.slice(index, index + 3));
        index += 3;
    };

    //カン
    for (let i = 0; i < kanCount; i++) {
        kanTiles.push(selectedLabels.slice(index, index + 4));
        index += 4;
    };

    const agariTile = selectedLabels[selectedLabels.length - 1];

    return { handTiles, ponTiles, chiiTiles, kanTiles, agariTile };
};

//通常の面子＋雀頭の形になっていることを確認する関数
const checkStandardHand = (tileCount: { [key: string]: number }) => {
    //面子を作るための再帰的な処理
    const canFormHand = (remainingTiles: string[], hasPair: boolean ): boolean => {
        if (remainingTiles.length === 0) return true;

        const tile = remainingTiles[0];
        const count = tileCount[tile];

        //雀頭を作る
        if (!hasPair && count >= 2) {
            const newTileCount = { ...tileCount };
            newTileCount[tile] -= 2;
            const remainingAfterPair = remainingTiles.filter(t => newTileCount[t] > 0);
            if (canFormHand(remainingAfterPair, true)) return true;
        }

        //刻子を作る
        if (count >= 3) {
            const newTileCount = { ...tileCount };
            newTileCount[tile]-= 3;
            const remainingAfterPair = remainingTiles.filter(t => newTileCount[t] > 0);
            if (canFormHand(remainingAfterPair, hasPair)) return true;
        }

        //順子を作る
        if (tile[0] === 'm' || tile[0] === 'p' || tile[0] === 's') {
            const next1 = tile[0] + (parseInt(tile[1]) + 1);
            const next2 = tile[0] + (parseInt(tile[1]) + 2);
            if (tileCount[next1] > 0 && tileCount[next2] > 0) {
                const newTileCount = { ...tileCount };
                newTileCount[tile]--;
                newTileCount[next1]--;
                newTileCount[next2]--;
                const remainingAfterPair = remainingTiles.filter(t => newTileCount[t] > 0);
                if (canFormHand(remainingAfterPair, hasPair)) return true;
            }
        }

        return false;
    };

    //残り牌を配列にしてチェック
    const remainingTiles = Object.entries(tileCount).flatMap(([tile, count]) => Array(count).fill(tile));
    return canFormHand(remainingTiles, false);
};

//特殊形(七対子・国士無双)を確認する関数
const checkSpecialHand = (tileCount: { [key: string]: number }): boolean => {
    //七対子のチェック
    const isSevenPairs = Object.values(tileCount).filter(count => count === 2).length === 7;
    if (isSevenPairs) return true;

    //国士無双のチェック
    const tilesOfKokushiMusou = ["m1", "m9", "p1", "p9", "s1", "s9", "east", "south", "west", "north", "haku", "hatsu", "chun"];

    //国士無双の牌がすべて含まれているかを確認
    let countOfKokushiMusou = 0;
    let pairTile = false;

    for (const tile of tilesOfKokushiMusou) {
        const count = tileCount[tile] || 0;

        if (count > 0) {
            countOfKokushiMusou++;
        }

        if (count === 2) {
            pairTile = true;
        }
    }

    //13種の国士牌が揃っており、かつ、その中に対子が一つ含まれている
    const isKokushiMusou = countOfKokushiMusou === 13 && pairTile;
    if (isKokushiMusou) return true;

    return false;
};


const checkSelecetedTiles = (selectedLabels: (string | null)[], ponCount: number, chiiCount: number, kanCount: number) => {
    //nullチェック
    if (selectedLabels.includes(null)) {
        console.log("入力されていない牌があります")
        return false;
    }

    //手牌・ポン・チー・カン・あがり牌に分割
    const { handTiles, ponTiles, chiiTiles, kanTiles, agariTile } = splitSelectedLabels(selectedLabels, ponCount, chiiCount, kanCount);

    //重複チェック
    const allTiles = [...selectedLabels];
    const allTilesCount = allTiles.reduce((countMap, tile) => {
        countMap[tile!] = (countMap[tile!] || 0) + 1;
        return countMap;
    }, {} as { [key: string]: number});

    for (const count of Object.values(allTilesCount)) {
        if (count > 4) {
            console.log("同じ牌は4つ以内である必要があります")
            return false;
        }
    };

    //ポンの正当性を確認
    for (const pon of ponTiles) {
        if (new Set(pon).size !== 1) {
            console.log("ポンが不正です")
            return false;
        }
    };

    //チーの正当性を確認
    for (const chii of chiiTiles) {
        const isValidChii =
            (chii[0]![0] === chii[1]![0] && chii[1]![0] === chii[2]![0]) && // 同じ種類
            (parseInt(chii[0]![1]) + 1 === parseInt(chii[1]![1]) && parseInt(chii[1]![1]) + 1 === parseInt(chii[2]![1])); // 連番

        if (!isValidChii) {
            console.log("チーは同じ種類かつ連番である必要があります")
            return false;
        }
    };

    //カンの正当性を確認
    for (const kan of kanTiles) {
        if (new Set(kan).size !== 1) {
            console.log("カンが不正です")
            return false;
        }
    };

    //手牌とあがり牌をまとめる
    const handAndLastTiles = [...handTiles, agariTile].filter(Boolean) as string[];

    //tileCountを作成
    const tileCount = handAndLastTiles.reduce((countMap, tile) => {
        countMap[tile] = (countMap[tile] || 0) + 1;
        return countMap;
    }, {} as { [key: string]: number });

    //枚数チェック：3n + 2
    if (handAndLastTiles.length % 3 !== 2) {
        console.log("枚数バグ");
        return false;
    }

    //通常形の確認
    if (checkStandardHand(tileCount)) {
        console.log("正当な手牌(通常形)")
        return true;
    }

    //特殊形の確認
    if (handAndLastTiles.length === 14 && checkSpecialHand(tileCount)) {
        console.log("正当な手牌(七対子or国士無双)")
        return true;
    }

    console.log("あがれません(不正な手牌)");
    return false;
};

export default checkSelecetedTiles;