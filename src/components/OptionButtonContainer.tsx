import React from 'react';
import '../App.css';
import { OptionButton1, OptionButton2} from './OptionButton';

interface OptionButtonContainerProps {
    hasCalled: boolean;
    setHasCalled: (value: boolean) => void;
    isRiichi: boolean;
    setIsRiichi: (value: boolean) => void;
    isRon: boolean;
    setIsRon: (value: boolean) => void;
    ponCount: number;
    setPonCount: (value: number) => void;
    chiiCount: number;
    setChiiCount: (value: number) => void;
    kanCount: number;
    setKanCount: (value: number) => void;
}

const OptionButtonContainer: React.FC<OptionButtonContainerProps> = ({
    hasCalled,
    setHasCalled,
    isRiichi,
    setIsRiichi,
    isRon,
    setIsRon,
    ponCount,
    setPonCount,
    chiiCount,
    setChiiCount,
    kanCount,
    setKanCount,
}) => {
  return (
    <div className='option-container'>
        <div className='naki-option-set'>
          <label>鳴き：</label>
          <OptionButton1 label="あり" selected={hasCalled} onClick={() => setHasCalled(true)} />
          <OptionButton1 label="なし" selected={!hasCalled} onClick={() => setHasCalled(false)} />
        </div>

        {/* 鳴きありの場合にポン/チーの回数を表示 */}
        {hasCalled && (
          <>
            <OptionButton2
              values={[0, 1, 2, 3, 4]}
              selectedValue={ponCount}
              onClick={setPonCount}
              label='ポン'
            />
            <OptionButton2
              values={[0, 1, 2, 3, 4]}
              selectedValue={chiiCount}
              onClick={setChiiCount}
              label='チー'
            />
          </>
        )}

        {/* 鳴きなしの場合にリーチの選択を表示 */}
        {!hasCalled && (
          <div className='naki-option-set'>
            <label>リーチ：</label>
            <OptionButton1 label="あり" selected={isRiichi} onClick={() => setIsRiichi(true)} />
            <OptionButton1 label="なし" selected={!isRiichi} onClick={() => setIsRiichi(false)} />
          </div>
        )}

        {/* カンの回数 */}
        <OptionButton2
          values={[0, 1, 2, 3, 4]}
          selectedValue={kanCount}
          onClick={setKanCount}
          label='カン'
        />

        {/* あがり方 */}
        <div className='naki-option-set'>
          <label>あがり方：</label>
          <OptionButton1 label="ロン" selected={isRon} onClick={() => setIsRon(true)} />
          <OptionButton1 label="ツモ" selected={!isRon} onClick={() => setIsRon(false)} />
        </div>
    </div>
  );
};

export default OptionButtonContainer;
