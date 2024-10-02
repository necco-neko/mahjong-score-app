import { yakumanData } from "../data/yakuData";

const countYakuman = (yakuList: string[]) => {
    let yakumanCount = 0;
    yakuList.forEach(yaku => {
      if (yakumanData[yaku]) {
        yakumanCount += yakumanData[yaku];
      }
    });
    switch(yakumanCount) {
        case 1:
            console.log("役満");
            break;
        case 2:
            console.log("ダブル役満");
            break;
        case 3:
            console.log("トリプル役満");
            break;
        default:
            if (yakumanCount >= 4) {
                console.log(`${yakumanCount}倍役満`);
            } else {
                console.log("役満なし");
            }
            break;
    }
}

export default countYakuman;