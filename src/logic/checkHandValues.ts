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

const checkHandValues = (tileCount: { [key: string ]: number }, handStructures: true | { hand: string[][][], chiiTiles: string[][] }, agariTile: string, kanCount: number, selectedOption1: boolean, selectedOption3: boolean): string[] => {
    //成立した役のリスト
    let yakuList: string[] = [];

    //手牌から確認できる役満

    //国士無双
    if (isKokushiMusou(tileCount)) {
        //十三面待ちの確認
        if (isKokushiMusou13Wait(tileCount, agariTile)) {
            yakuList.push("国士無双十三面待ち");
        } else {
            yakuList.push("国士無双")
        }
        return yakuList;
    }

    //九蓮宝燈
    if (isChuurenPoutou(tileCount)) {
        //純正九連宝燈の確認
        if (isJunseiChuurenPoutou(tileCount, agariTile)) {
            yakuList.push("純正九連宝燈");
        } else {
            yakuList.push("九蓮宝燈");
        }
        return yakuList;
    }

    //四槓子
    if (kanCount === 4) {
        yakuList.push("四槓子");
    }

    //四暗刻
    if (is4Anko(tileCount, agariTile, selectedOption1, selectedOption3)) {
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
        return yakuList;
    }

    //清老頭
    if (isChinroutou(tileCount)) {
        yakuList.push("清老頭");
        return yakuList;
    }

    //字一色
    if (isTsuiso(tileCount)) {
        yakuList.push("字一色");
    }

    //大三元
    if (isDaisangen(tileCount)) {
        yakuList.push("大三元");
        return yakuList;
    }

    //大四喜
    if (isDaisushi(tileCount)) {
        yakuList.push("大四喜");
        return yakuList;
    }

    //小四喜
    if (isShosushi(tileCount)) {
        yakuList.push("小四喜");
        return yakuList;
    }

    //役満が一つでも含まれていたら通常役を確認する必要がない
    if (yakuList.length > 1) return yakuList;

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

        return yakuList;
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
    const jikaze = "東";
    const bakaze = "南";
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

    handStructures.hand.forEach((structure) => {
        //一時的なリスト
        let tempYakuList: string[] = [];

        //一盃口・二盃口
        const resultOfPeikou = checkIipeikouAndRyanpeikou(structure, selectedOption1);
        if (resultOfPeikou !== false) {
            tempYakuList.push(resultOfPeikou);
        }

        //平和
        if (isPinfu(structure, selectedOption1, agariTile)) {
            tempYakuList.push("平和");
        }

        //三色同順
        if (isSanshokuDoujun(structure)) {
            tempYakuList.push("三色同順");
        }

        //三色同刻
        if (isSanshokuDouko(structure)) {
            tempYakuList.push("三色同刻");
        }

        //一気通貫
        if (isIkkiTsukan(structure)) {
            tempYakuList.push("一気通貫");
        }

        //全帯・純全帯
        const resultOfChanta = checkChanta(structure);
        if (resultOfChanta !== false) {
            tempYakuList.push(resultOfChanta);
        }

        //対々和
        if (isToitoi(structure)) {
            tempYakuList.push("対々和");
        }

        //三暗刻：暗カンの判定が未実装のため実装不可

        //最も役の数が多い組をbestYakuListとする(最終的には翻数が多い組)
        if (tempYakuList.length > bestYakuList.length) {
            bestYakuList = tempYakuList;
        }
    });

    //最良の役をyakuListに追加
    yakuList = [...yakuList, ...bestYakuList];

    return yakuList;
};

export default checkHandValues;