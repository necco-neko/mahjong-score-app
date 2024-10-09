import tileCount from "../utils/tileCount";

const splitSelectedLabels = (selectedLabels: (string | null)[], selectedOption1: boolean, ponCount: number, chiiCount: number, kanCount: number) => {
    //分割処理
    const ponTiles = [] as ((string | null)[])[];
    const chiiTiles = [] as ((string | null)[])[];
    const kanTiles = [] as ((string | null)[])[];

    if (!selectedOption1) {//鳴きなしの場合はポン・チーの分割は行わない
        const handLength = 13 - kanCount * 3;
        const handTiles = selectedLabels.slice(0, handLength);
        let index = handLength;
        //カン
        for (let i = 0; i < kanCount; i++) {
            kanTiles.push(selectedLabels.slice(index, index + 4));
            index += 4;
        };
        const agariTile = selectedLabels[selectedLabels.length - 1];
        return { handTiles, ponTiles, chiiTiles, kanTiles, agariTile };
    } else {//鳴きありの場合
        const handLength = 13 - (ponCount + chiiCount + kanCount) * 3;
        const handTiles = selectedLabels.slice(0, handLength);
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
    }
};

//通常の面子＋雀頭の形になっていることを確認する関数
const checkStandardHand = (tileCount: { [key: string]: number }) => {
    //雀頭候補を取得する関数
    const getPairs = (tileCount: { [key: string]: number }): string[] => {
        return Object.keys(tileCount).filter(key => tileCount[key] >= 2);
    };
    //刻子候補を取得する関数
    const getTriplets = (tileCount: { [key: string]: number }): string[] => {
        return Object.keys(tileCount).filter(key => tileCount[key] >= 3);
    };
    //刻子候補の組み合わせを取得する関数
    const getTripletsCombinations = (triplets: string[]):string[][] => {
        const combinations: string[][] = [[]];
        for (const triple of triplets) {
            const currentLength = combinations.length;

            for (let i = 0; i < currentLength; i++) {
                combinations.push([...combinations[i], triple]);
            }
        }

        return combinations;
    };
    //順子を削除する関数
    const removeSequences = (tileCount: { [key: string]: number }, sequences: string[][]): boolean => {
        const suits = ['m', 'p', 's'];
        for (const suit of suits) {
            for (let i = 0; i <= 7; i++) { //順子は１〜７で始まる
                const tile1 = `${suit}${i}`;
                const tile2 = `${suit}${i + 1}`;
                const tile3 = `${suit}${i + 2}`;

                while (tileCount[tile1] > 0 && tileCount[tile2] > 0 && tileCount[tile3] > 0) {
                    tileCount[tile1]--;
                    tileCount[tile2]--;
                    tileCount[tile3]--;
                    sequences.push([tile1, tile2, tile3]);
                }
            }
        }
        //全ての牌の枚数が0ならtrue、残っていればfalse
        return Object.values(tileCount).every(count => count === 0);
    };
    //刻子の組み合わせを試す関数
    const checkTripletCombinations = (tileCount: { [key: string]: number }): string[][][] | null => {
        //刻子の候補とその組み合わせを取得
        const triplets = getTriplets(tileCount);
        const tripletsCombinations = getTripletsCombinations(triplets);

        const validCombinations: string[][][] = [];

        //刻子の組み合わせを試す
        for (const triplets of tripletsCombinations) {
            const newTileCount = { ...tileCount };
            const tripletList: string[][] = [];

            for (const triplet of triplets) {
                newTileCount[triplet] -= 3; //刻子を除外
                tripletList.push([triplet, triplet, triplet]);
            }

            const sequenceList: string[][] = [];
            //刻子を削除して残りの牌が0枚か確認する
            if (removeSequences(newTileCount, sequenceList)) {
                validCombinations.push([...tripletList, ...sequenceList]);
            }
        }
        return validCombinations.length > 0 ? validCombinations : null;
    }

    //雀頭を選んでその後の処理を行う
    const pairs = getPairs(tileCount);
    const validHands: string[][][] = [];

    for (const pair of pairs) {
        const newTileCount = { ...tileCount };
        newTileCount[pair] -= 2; //雀頭を除外する

        //刻子の組み合わせを試す
        const tripletResults = checkTripletCombinations(newTileCount);
        if (tripletResults) {
            for (const result of tripletResults) {
                validHands.push([[pair, pair], ...result]); //雀頭と刻子・順子のリストを追加
            }
        }
    }

    return validHands.length > 0 ? validHands : false;
};

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


const checkSelectedTiles = (selectedLabels: (string | null)[], selectedOption1: boolean, ponCount: number, chiiCount: number, kanCount: number) => {
    //nullチェック
    if (selectedLabels.includes(null)) {
        console.log("入力されていない牌があります")
        return false;
    }

    //手牌・ポン・チー・カン・あがり牌に分割
    const { handTiles, ponTiles, chiiTiles, kanTiles, agariTile } = splitSelectedLabels(selectedLabels, selectedOption1, ponCount, chiiCount, kanCount);

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
        //ソートして連番かどうかを確認
        const sortedChii = chii.slice().sort((a, b) => parseInt(a![1]) - parseInt(b![1]));

        const isValidChii =
            (sortedChii[0]![0] === sortedChii[1]![0] && sortedChii[1]![0] === sortedChii[2]![0]) && // 同じ種類
            (parseInt(sortedChii[0]![1]) + 1 === parseInt(sortedChii[1]![1]) && parseInt(sortedChii[1]![1]) + 1 === parseInt(sortedChii[2]![1])); // 連番

        if (!isValidChii) {
            console.log("チーは同じ種類かつ連番である必要があります");
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
    const tileCountOfHandAndLast = tileCount(handAndLastTiles);
    
    //枚数チェック：3n + 2
    if (handAndLastTiles.length % 3 !== 2) {
        console.log("枚数バグ");
        return false;
    }

    //通常形の確認
    if (checkStandardHand(tileCountOfHandAndLast)) {
        console.log("正当な手牌(通常形)")
        return true;
    }

    //特殊形の確認
    if (handAndLastTiles.length === 14 && checkSpecialHand(tileCountOfHandAndLast)) {
        console.log("正当な手牌(七対子or国士無双)")
        return true;
    }

    console.log("あがれません(不正な手牌)");
    return false;
};

export default checkSelectedTiles;