const is3Anko = (structure: string[][], typeOfKan: boolean[], agariTile: string, selectedOption3: boolean) => {
    let tripletCount = 0;

    //手牌の暗刻の数をカウントする
    structure.forEach(group => {
        //刻子であることを確認
        if (group.length === 3 && group[0] === group[1]) {
            //ロンあがりかつあがり牌がgroupに含まれる場合、刻子としてはカウントしない
            if (selectedOption3 && group[0] === agariTile) {
                return;
            }
            tripletCount++;
        }
    });

    //暗カンも暗刻としてカウント
    const concealedKanCount = typeOfKan.filter(kan => !kan).length;

    //暗刻と暗カンの合計が3であれば三暗刻成立
    return tripletCount + concealedKanCount === 3;
};

export default is3Anko;