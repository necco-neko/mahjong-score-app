const checkChinitsuAndHonitsu = (tileCount: { [key: string]: number }): false | string => {
    const jihaiList = ["east", "south", "west", "north", "haku", "hatsu", "chun"];
    const suits = ['m', 'p', 's'];

    let hasJihai = false; //字牌を含むか否かのフラグ
    let usedSuit: string[] = []; //使用されている種類(m,p,s)を保持するリスト
    Object.keys(tileCount).forEach(tile => {
        const suit = tile[0];
        if (jihaiList.includes(tile)) {
            hasJihai = true;
        } else if (suits.includes(suit) && !usedSuit.includes(suit)) {
            usedSuit.push(suit);
        }
    });

    //usedSuitが1種類のみで構成されていれば混一色or清一色
    if (usedSuit.length === 1) {
        if (hasJihai) {
            return "混一色";
        } else {
            return "清一色";
        }
    }

    return false;
};

export default checkChinitsuAndHonitsu;