interface BestStructure {
    bestHand: string[][];
    chiiTiles: string[][];
    ponTiles: string[][];
    kanTiles: string[][];
}

const calculateFu = (
    bestStructure: BestStructure | null,
    hasCalled: boolean,
    isRon: boolean,
    bakaze: string,
    jikaze: string,
    agariTile: string,
    typeOfKan: boolean[],
    yakuList: string[],
): number => {
    //七対子の場合は25符固定(例外)
    if (yakuList.includes("七対子")) return 25;
    //ピンフツモの場合は20符固定(例外)
    if (yakuList.includes("平和") && !isRon) return 20;
    //役満(例外)
    if (bestStructure === null) return 0;

    //基本符(副底20符)
    let fu = 20;

    //あがり方の符計算
    if (!hasCalled && isRon) {
        fu += 10; //面前ロンの場合+10符
    } else if (!isRon) {
        fu += 2; //ツモの場合+2符
    }

    //手牌の構成による符計算
    bestStructure.bestHand.forEach((group) => {
        if (group.length === 3 && group[0] === group[1]) { //刻子
            const tileNum = parseInt(group[0][1]);
            if (tileNum >= 2 && tileNum <= 8) {
                fu += 4; //2〜8の暗刻は+4符
            } else {
                fu += 8; //1,9,字牌の暗刻は+8符
            }
        }
    });

    //ポン(明刻)の符計算
    bestStructure.ponTiles.forEach((group) => {
        const tileNum = parseInt(group[0][1]);
        if (tileNum >= 2 && tileNum <= 8) {
            fu += 2; //2〜8の明刻は+2符
        } else {
            fu += 4; //1,9,字牌の明刻は+4符
        }
    });

    //槓子の符計算
    bestStructure.kanTiles.forEach((group, index) => {
        const tileNum = parseInt(group[0][1]);
        const isAnkan = !typeOfKan[index];
        if (tileNum >= 2 && tileNum <= 8) {
            fu += isAnkan ? 16 : 8; //2〜8の暗槓は+16符,明槓は+8符
        } else {
            fu += isAnkan ? 32 : 16; //1,9,字牌の暗槓は+32符,明槓は+16符
        }
    });

    //雀頭の符計算
    const head = bestStructure.bestHand.find(group => group.length === 2);
    //風は日本語入力なので牌名(英語)に変換
    const windTranslate: { [key: string]: string } = {
        "東": "east",
        "南": "south",
        "西": "west",
        "北": "north"
    };
    const jikazeKey = windTranslate[jikaze];
    const bakazeKey = windTranslate[bakaze];
    //役牌のリスト
    const yakuTiles = [jikazeKey, bakazeKey, "haku", "hatsu", "chun"];
    //雀頭が役牌であれば+2符
    if (head && yakuTiles.includes(head[0][0])) fu += 2;

    //待ちの形による符計算
    //ペンチャン待ちの判定
    const isPenchanWait = (hand: string[][], agariTile: string): boolean => {
        return hand.some(group =>
            //順子である
            group.length === 3 && group[0] !== group[1] &&
            //順子が123or789であがり牌が3or7である
            ((group[0][1] === '1' && group[2] === agariTile) || (group[2][1] === '9' && group[0] === agariTile))
        );
    };
    //カンチャン待ちの判定
    const isKanchanWait = (hand: string[][], agariTile: string): boolean => {
        return hand.some(group =>
            //順子である
            group.length === 3 && group[0] !== group[1] &&
            //あがり牌が中心の牌である
            group[1] === agariTile
        );
    };
    //単騎待ちの判定
    const isTankiWait = (hand: string[][], agariTile: string): boolean => {
        return hand.some(group => 
            //あがり牌が雀頭に含まれる
            group.length === 2 && group.includes(agariTile)
        );
    };
    //以上の待ちの形であれば+2符
    if (isPenchanWait(bestStructure.bestHand, agariTile)) {
        fu += 2;
    } else if (isKanchanWait(bestStructure.bestHand, agariTile)) {
        fu += 2;
    } else if (isTankiWait(bestStructure.bestHand, agariTile)) {
        fu += 2;
    }

    //符の切り上げ処理
    fu = Math.ceil(fu / 10) * 10;
    //符は最低30符
    if (fu < 30) {
        fu = 30;
    }

    return fu;
};

export default calculateFu;