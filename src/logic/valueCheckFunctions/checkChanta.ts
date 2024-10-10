const checkChanta = (structure: string[][], chiiTiles: string[][], ponTiles: string[][]): false | string => {
    const jihaiList = ["east", "south", "west", "north", "haku", "hatsu", "chun"];
    let hasJihai = false;

    //グループが1,9,字牌を含むか確認する関数
    const isChanta = (group: string[]): boolean => {
        return group.some(tile => {
            const number = parseInt(tile[1]);
            const isJihai = jihaiList.includes(tile);

            if (isJihai) {
                hasJihai = true;
            }

            return isJihai || number === 1 || number === 9;
        });
    };

    let chanta = true; //全帯の成立か確認するフラグ

    structure.forEach(group => {
        if (!isChanta(group)) {
            chanta = false; //1,9,字牌を含まないグループがあれば全帯不成立
        }
    });

    //チーに対してもチェックを行う
    chiiTiles.forEach(chii => {
        if (!isChanta(chii)) {
            chanta = false; //1,9,字牌を含まないグループがあれば全帯不成立
        }
    });

    //ポンに対してもチェックを行う
    ponTiles.forEach(pon => {
        if (!isChanta(pon)) {
            chanta = false; //1,9,字牌を含まないグループがあれば全帯不成立
        }
    });


    //全帯が成立しない場合
    if (!chanta) {
        return false;
    }

    //全帯が成立かつ字牌が含まれなければ純全帯が成立
    if (!hasJihai) {
        return "純全帯";
    }

    return "全帯";
};

export default checkChanta;