const isToitoi = (structure: string[][], chiiTiles: string[][]): boolean => {
    //チーが一つでも含まれていれば不成立
    if (chiiTiles.length !== 0) return false;

    for (const group of structure) {
        //グループの1つ目と2つ目が異なる場合、順子であることが確定し、対々和が成立しない
        if (group[0] !== group[1]) {
            return false;
        }
    }
    return true;
};

export default isToitoi;