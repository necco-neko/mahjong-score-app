import { commonYakuData, kuisagariYakuData } from "../data/yakuData";

const calculateHan = (yakuList: string[], selectedOption1: boolean): number => {
    let totalHan = 0;

    yakuList.forEach((yaku) => {
        let han = commonYakuData[yaku] || 0;

        if (selectedOption1 && kuisagariYakuData.includes(yaku)) han -= 1;

        totalHan += han;
    });

    return totalHan;
};

export default calculateHan;