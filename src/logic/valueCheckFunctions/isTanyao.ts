const isTanyao = (tileCount: { [key: string]: number }): boolean => {
    //1,9,字牌は禁止
    const forbiddenTiles = ["m1", "m9", "p1", "p9", "s1", "s9", "east", "south", "west", "north", "haku", "hatsu", "chun"];
    //禁止牌がtileCountに含まれているかを確認
    for (const tile of forbiddenTiles) {
        if (tileCount[tile]) {
            return false; //含まれていれば不成立
        }
    }
    return true; //含まれていなければ成立
};

export default isTanyao;