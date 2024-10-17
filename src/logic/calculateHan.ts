import { commonYakuData, kuisagariYakuData } from "../data/yakuData";

const calculateHan = (yakuList: string[], hasCalled: boolean): number => {
    let totalHan = 0;

    yakuList.forEach((yaku) => {
        let han = commonYakuData[yaku] || 0;

        if (hasCalled && kuisagariYakuData.includes(yaku)) han -= 1;

        totalHan += han;
    });

    return totalHan;
};

export default calculateHan;