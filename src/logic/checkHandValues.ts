import { isKokushiMusou, isKokushiMusou13Wait } from "./valueCheckFunctions/isKokushiMusou";
import { isChuurenPoutou, isJunseiChuurenPoutou } from "./valueCheckFunctions/isChuurenPoutou";
import { is4Anko, is4AnkoTanki } from "./valueCheckFunctions/is4Anko";
import isRyuiso from "./valueCheckFunctions/isRyuiso";
import isChinroutou from "./valueCheckFunctions/isChinroutou";
import isTsuiso from "./valueCheckFunctions/isTsuiso";
import isDaisangen from "./valueCheckFunctions/isDaisangen";
import { isDaisushi, isShosushi } from "./valueCheckFunctions/isSushiho";

const checkHandValues = (tileCount: { [key: string ]: number }, agariTile: string, kanCount: number, selectedOption1: boolean, selectedOption3: boolean): string[] => {
    //成立した役のリスト
    const yakuList: string[] = [];

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
    //メモ：通常役の確認にはcheckStandardHandでの面子分割が必須と思われる。





    
    return yakuList;
};

export default checkHandValues;