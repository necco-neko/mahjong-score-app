import { isKokushiMusou, isKokushiMusou13Wait } from "./valueCheckFunctions/isKokushiMusou";
import { isChuurenPoutou, isJunseiChuurenPoutou } from "./valueCheckFunctions/isChuurenPoutou";
import { is4Anko, is4AnkoTanki } from "./valueCheckFunctions/is4Anko";
import isRyuiso from "./valueCheckFunctions/isRyuiso";
import isChinroutou from "./valueCheckFunctions/isChinroutou";
import isTsuiso from "./valueCheckFunctions/isTsuiso";
import isDaisangen from "./valueCheckFunctions/isDaisangen";
import { isDaisushi, isShosushi } from "./valueCheckFunctions/isSushiho";
import isTanyao from "./valueCheckFunctions/isTanyao";
import checkSangenpai from "./valueCheckFunctions/checkSangenpai";
import checkWind from "./valueCheckFunctions/checkWind";
import isSanshokuDoujun from "./valueCheckFunctions/isSanshokuDoujun";
import isSanshokuDouko from "./valueCheckFunctions/isSanshokuDouko";
import isIkkiTsukan from "./valueCheckFunctions/isIkkiTsukan";
import checkChanta from "./valueCheckFunctions/checkChanta";
import checkChinitsuAndHonitsu from "./valueCheckFunctions/checkChinitsuAndHonitsu";
import isToitoi from "./valueCheckFunctions/isToitoi";
import isHonroutou from "./valueCheckFunctions/isHonroutou";
import checkIipeikouAndRyanpeikou from "./valueCheckFunctions/checkIipeokouAndRyanpeikou";
import isPinfu from "./valueCheckFunctions/isPinfu";
import is3Anko from "./valueCheckFunctions/is3Anko";
import calculateHan from "./calculateHan";

interface HandStructure {
    hand: string[][][];
    chiiTiles: string[][];
    ponTiles: string[][];
    kanTiles: string[][];
}

interface BestStructure {
    bestHand: string[][];
    chiiTiles: string[][];
    ponTiles: string[][];
    kanTiles: string[][];
}

const checkHandValues = (
    tileCount: { [key: string ]: number },
    handStructures: true | HandStructure,
    agariTile: string,
    kanCount: number,
    typeOfKan: boolean[],
    hasCalled: boolean,
    isRon: boolean,
    bakaze: string,
    jikaze: string,
    otherOptions: boolean[]
): { yakuList: string[], bestStructure: BestStructure | null } => {
    //成立した役のリスト
    let yakuList: string[] = [];

    //天和・地和
    if (otherOptions[7]) yakuList.push("天和");
    if (otherOptions[8]) yakuList.push("地和");

    //手牌から確認できる役満

    //国士無双
    if (isKokushiMusou(tileCount)) {
        //十三面待ちの確認
        if (isKokushiMusou13Wait(tileCount, agariTile)) {
            yakuList.push("国士無双十三面待ち");
        } else {
            yakuList.push("国士無双")
        }
        return { yakuList, bestStructure: null };
    }

    //九蓮宝燈
    if (isChuurenPoutou(tileCount)) {
        //純正九連宝燈の確認
        if (isJunseiChuurenPoutou(tileCount, agariTile)) {
            yakuList.push("純正九連宝燈");
        } else {
            yakuList.push("九蓮宝燈");
        }
        return { yakuList, bestStructure: null };
    }

    //四槓子
    if (kanCount === 4) {
        yakuList.push("四槓子");
    }

    //四暗刻
    if (is4Anko(tileCount, agariTile, hasCalled, isRon)) {
        //四暗刻単騎の確認
        if (is4AnkoTanki(tileCount, agariTile)) {
            yakuList.push("四暗刻単騎");
        } else {
            yakuList.push("四暗刻");
        }
    }

    //緑一色
    if (isRyuiso(tileCount)) {
        yakuList.push("緑一色");
        return { yakuList, bestStructure: null };
    }

    //清老頭
    if (isChinroutou(tileCount)) {
        yakuList.push("清老頭");
        return { yakuList, bestStructure: null };
    }

    //字一色
    if (isTsuiso(tileCount)) {
        yakuList.push("字一色");
    }

    //大三元
    if (isDaisangen(tileCount)) {
        yakuList.push("大三元");
        return { yakuList, bestStructure: null };
    }

    //大四喜
    if (isDaisushi(tileCount)) {
        yakuList.push("大四喜");
        return { yakuList, bestStructure: null };
    }

    //小四喜
    if (isShosushi(tileCount)) {
        yakuList.push("小四喜");
        return { yakuList, bestStructure: null };
    }

    //役満が一つでも含まれていたら通常役を確認する必要がない
    if (yakuList.length > 0) return { yakuList, bestStructure: null };

    //通常役の確認

    //七対子
    //handStructuresがtrueのとき、七対子か国士無双であるが、
    //事前に役満のパターンは排除してあるため、七対子が確定する
    if (handStructures === true) {
        yakuList.push("七対子");
        // 七対子と同時に成立し得る役は断么・混一色・清一色・混老頭のみ

        //断么
        if (isTanyao(tileCount)) {
            yakuList.push("断么");
        }

        //混一色・清一色
        const resultOfChinitsuAndHonitsu = checkChinitsuAndHonitsu(tileCount);
        if (resultOfChinitsuAndHonitsu !== false) {
            yakuList.push(resultOfChinitsuAndHonitsu);
        }

        //混老頭
        if (isHonroutou(tileCount)) {
            yakuList.push("混老頭");
        }

        //七対子と同時に成立するオプション役
        if (otherOptions[0]) yakuList.push("リーチ");
        if (otherOptions[1]) yakuList.push("一発");
        if (otherOptions[2]) yakuList.push("ダブルリーチ");
        if (otherOptions[4]) yakuList.push("槍槓");
        if (otherOptions[5]) yakuList.push("海底撈月");
        if (otherOptions[6]) yakuList.push("河底撈魚");

        return { yakuList, bestStructure: null };
    }

    //以下、通常形

    //雀頭・面子の組み合わせに依存しない役の確認

    //断么
    if (isTanyao(tileCount)) {
        yakuList.push("断么");
    }

    //三元牌・小三元
    const sangenpaiYakuList = checkSangenpai(tileCount);
    yakuList = [...yakuList, ...sangenpaiYakuList];

    //門風牌・荘風牌
    const windYakuList = checkWind(jikaze, bakaze, tileCount);
    yakuList = [...yakuList, ...windYakuList];

    //混一色・清一色
    const resultOfChinitsuAndHonitsu = checkChinitsuAndHonitsu(tileCount);
    if (resultOfChinitsuAndHonitsu !== false) {
        yakuList.push(resultOfChinitsuAndHonitsu);
    }

    //三槓子
    if (kanCount === 3) {
        yakuList.push("三槓子");
    }

    //混老頭
    if (isHonroutou(tileCount)) {
        yakuList.push("混老頭");
    }

    //雀頭・面子の組み合わせに依存する役の確認

    //handStructuresの各パターンに対して役を確認し、最大の役リストを返す
    let bestYakuList: string[] = [];
    let bestStructure: BestStructure | null = {
        bestHand: handStructures.hand[0],
        chiiTiles: handStructures.chiiTiles,
        ponTiles: handStructures.ponTiles,
        kanTiles: handStructures.kanTiles
    }; //手牌構成が1通りの場合があるため、bestStructureの初期値はnullではなく、1つ目のパターンとする

    handStructures.hand.forEach((structure) => {
        //一時的なリスト
        let tempYakuList: string[] = [];

        //一盃口・二盃口
        const resultOfPeikou = checkIipeikouAndRyanpeikou(structure, hasCalled);
        if (resultOfPeikou !== false) {
            tempYakuList.push(resultOfPeikou);
        }

        //平和
        if (isPinfu(structure, hasCalled, agariTile)) {
            tempYakuList.push("平和");
        }

        //三色同順
        if (isSanshokuDoujun(structure, handStructures.chiiTiles)) {
            tempYakuList.push("三色同順");
        }

        //三色同刻
        if (isSanshokuDouko(structure, handStructures.ponTiles, handStructures.kanTiles)) {
            tempYakuList.push("三色同刻");
        }

        //一気通貫
        if (isIkkiTsukan(structure, handStructures.chiiTiles)) {
            tempYakuList.push("一気通貫");
        }

        //全帯・純全帯
        const resultOfChanta = checkChanta(structure, handStructures.chiiTiles, handStructures.ponTiles, handStructures.kanTiles);
        if (resultOfChanta !== false && !yakuList.includes("混老頭")) {
            tempYakuList.push(resultOfChanta);
        }

        //対々和
        if (isToitoi(structure, handStructures.chiiTiles)) {
            tempYakuList.push("対々和");
        }

        //三暗刻
        if (is3Anko(structure, typeOfKan, agariTile, isRon)) {
            tempYakuList.push("三暗刻");
        }

        //翻数が最も多い組をbestYakuListとする
        if (calculateHan(tempYakuList, hasCalled) > calculateHan(bestYakuList, hasCalled)) {
            bestYakuList = tempYakuList;
            bestStructure = {
                bestHand: structure,
                chiiTiles: handStructures.chiiTiles,
                ponTiles: handStructures.ponTiles,
                kanTiles: handStructures.kanTiles
            };
        }
    });

    //最良の役をyakuListに追加
    yakuList = [...yakuList, ...bestYakuList];

    //オプションにより選択された通常役を追加
    if (!isRon && !hasCalled) yakuList.push("門前清自摸和(ツモ)");
    if (otherOptions[0]) yakuList.push("リーチ");
    if (otherOptions[1]) yakuList.push("一発");
    if (otherOptions[2]) yakuList.push("ダブルリーチ");
    if (otherOptions[3]) yakuList.push("嶺上開花");
    if (otherOptions[4]) yakuList.push("槍槓");
    if (otherOptions[5]) yakuList.push("海底撈月");
    if (otherOptions[6]) yakuList.push("河底撈魚");

    return { yakuList, bestStructure };
};

export default checkHandValues;