const checkSangenpai = (tileCount: { [key: string]: number }): string[] => {
    //三元牌
    const yakuList: string[] = [];
    let tripletCount = 0;
    let pairCount = 0;

    const sangenpaiTiles = {
        haku: "三元牌(白)",
        hatsu: "三元牌(發)",
        chun: "三元牌(中)"
    };

    (["haku", "hatsu", "chun"] as const).forEach(tile => {
        const count = tileCount[tile] || 0;
        if (count >= 3) {
          tripletCount++;
          yakuList.push(sangenpaiTiles[tile]); //刻子が成立した牌を役リストに追加
        } else if (count === 2) {
          pairCount++;
        }
    });

    //小三元の判定
    const isShosangen = (tripletCount === 2 && pairCount === 1);
    if (isShosangen) {
        yakuList.push("小三元");
    }

    return yakuList;
};

export default checkSangenpai;