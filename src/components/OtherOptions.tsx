import React, { useEffect, useState } from "react";
import '../App.css';

interface OtherOptionsProps {
    hasCalled: boolean;
    isRiichi: boolean;
    isRon: boolean;
    isKan: boolean;
    isIppatsu: boolean;
    setIsIppatsu: (value: boolean) => void;
    isDoubleriichi: boolean;
    setIsDoubleriichi: (value: boolean) => void;
    isRinshankaiho: boolean;
    setIsRinshankaiho: (value: boolean) => void;
    isChankan: boolean;
    setIsChankan: (value: boolean) => void;
    isHaitei: boolean;
    setIsHaitei: (value: boolean) => void;
    isHotei: boolean;
    setIsHotei: (value: boolean) => void;
    isTenho: boolean;
    setIsTenho: (value: boolean) => void;
    isChiho: boolean;
    setIsChiho: (value: boolean) => void;
}

const OtherOptions: React.FC<OtherOptionsProps> = ({
    hasCalled,
    isRiichi,
    isRon,
    isKan,
    isIppatsu,
    setIsIppatsu,
    isDoubleriichi,
    setIsDoubleriichi,
    isRinshankaiho,
    setIsRinshankaiho,
    isChankan,
    setIsChankan,
    isHaitei,
    setIsHaitei,
    isHotei,
    setIsHotei,
    isTenho,
    setIsTenho,
    isChiho,
    setIsChiho,
}) => {
    const [showOptions, setShowOptions] = useState(false);

    //オプションが失効した場合、falseに戻す
    useEffect(() => {
        if (!isRiichi) {
            setIsIppatsu(false);
            setIsDoubleriichi(false);
        }
        if (!isKan) {
            setIsRinshankaiho(false);
        }
        if (isRon) {
            setIsHaitei(false);
        } else {
            setIsChankan(false);
            setIsHotei(false);
        }
        if (hasCalled || isRiichi || isKan || isRon) {
            setIsTenho(false);
            setIsChiho(false);
        }
    }, [hasCalled, isRiichi, isRon, isKan, setIsIppatsu, setIsDoubleriichi, setIsRinshankaiho, setIsHaitei, setIsChankan, setIsHotei, setIsTenho, setIsChiho]);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <div className="other-options-container">
            <button className="dropdown-button" onClick={toggleOptions}>
                その他
            </button>
            {showOptions && (
                <div className="checkbox-container">
                    <label>
                        <input
                            type="checkbox"
                            checked={isIppatsu}
                            onChange={() => setIsIppatsu(!isIppatsu)}
                            disabled={hasCalled || !isRiichi} //鳴きありorリーチなしのときは失効
                        />
                        <span>一発</span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={isDoubleriichi}
                            onChange={() => setIsDoubleriichi(!isDoubleriichi)}
                            disabled={hasCalled || !isRiichi} //鳴きありorリーチなしのときは失効
                        />
                        <span>ダブルリーチ</span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={isRinshankaiho}
                            onChange={() => setIsRinshankaiho(!isRinshankaiho)}
                            disabled={isRon || !isKan} //ロンorカンなしのときは失効
                        />
                        <span>嶺上開花(リンシャンカイホウ)</span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={isChankan}
                            onChange={() => setIsChankan(!isChankan)}
                            disabled={!isRon} //ツモのときは失効
                        />
                        <span>槍槓(チャンカン)</span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={isHaitei}
                            onChange={() => setIsHaitei(!isHaitei)}
                            disabled={isRon} //ロンのときは失効
                        />
                        <span>海底撈月(ハイテイ)</span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={isHotei}
                            onChange={() => setIsHotei(!isHotei)}
                            disabled={!isRon} //ツモのときは失効
                        />
                        <span>河底撈魚(ホウテイ)</span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={isTenho}
                            onChange={() => setIsTenho(!isTenho)}
                            disabled={hasCalled || isRiichi || isKan || isRon} //他の条件があるときは失効
                        />
                        <span>天和</span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={isChiho}
                            onChange={() => setIsChiho(!isChiho)}
                            disabled={hasCalled || isRiichi || isKan || isRon} //他の条件があるときは失効
                        />
                        <span>地和</span>
                    </label>
                </div>
            )}
        </div>
    );
};

export default OtherOptions;