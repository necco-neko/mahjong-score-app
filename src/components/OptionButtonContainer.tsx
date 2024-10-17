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
        <div className='naki-option-set1'>
          鳴き：
          <OptionButton1 label="あり" selected={hasCalled} onClick={() => setHasCalled(true)} />
          <OptionButton1 label="なし" selected={!hasCalled} onClick={() => setHasCalled(false)} />
        </div>
        <OptionButton2
          values={[0, 1, 2, 3, 4]}
          selectedValue={ponCount}
          onClick={setPonCount}
          label='ポン'
        />
        <div className='naki-option-set1'>
          リーチ：
          <OptionButton1 label="あり" selected={isRiichi} onClick={() => setIsRiichi(true)} />
          <OptionButton1 label="なし" selected={!isRiichi} onClick={() => setIsRiichi(false)} />
        </div>
        <OptionButton2
          values={[0, 1, 2, 3, 4]}
          selectedValue={chiiCount}
          onClick={setChiiCount}
          label='チー'
        />
        <div className='naki-option-set1'>
          あがり方：
          <OptionButton1 label="ロン" selected={isRon} onClick={() => setIsRon(true)} />
          <OptionButton1 label="ツモ" selected={!isRon} onClick={() => setIsRon(false)} />
        </div>
        <OptionButton2
          values={[0, 1, 2, 3, 4]}
          selectedValue={kanCount}
          onClick={setKanCount}
          label='カン'
        />
    </div>
  )
}

export default OptionButtonContainer;
