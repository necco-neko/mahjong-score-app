import React from 'react';
import '../App.css';
import { OptionButton1, OptionButton2} from './OptionButton';

interface OptionButtonContainerProps {
    selectedOption1: boolean;
    setSelectedOption1: (value: boolean) => void;
    selectedOption2: boolean;
    setSelectedOption2: (value: boolean) => void;
    selectedOption3: boolean;
    setSelectedOption3: (value: boolean) => void;
    ponCount: number;
    setPonCount: (value: number) => void;
    chiiCount: number;
    setChiiCount: (value: number) => void;
    kanCount: number;
    setKanCount: (value: number) => void;
}

const OptionButtonContainer: React.FC<OptionButtonContainerProps> = ({
    selectedOption1,
    setSelectedOption1,
    selectedOption2,
    setSelectedOption2,
    selectedOption3,
    setSelectedOption3,
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
          <OptionButton1 label="あり" selected={selectedOption1} onClick={() => setSelectedOption1(true)} />
          <OptionButton1 label="なし" selected={!selectedOption1} onClick={() => setSelectedOption1(false)} />
        </div>
        <OptionButton2
          values={[0, 1, 2, 3, 4]}
          selectedValue={ponCount}
          onClick={setPonCount}
          label='ポン'
        />
        <div className='naki-option-set1'>
          リーチ：
          <OptionButton1 label="あり" selected={selectedOption2} onClick={() => setSelectedOption2(true)} />
          <OptionButton1 label="なし" selected={!selectedOption2} onClick={() => setSelectedOption2(false)} />
        </div>
        <OptionButton2
          values={[0, 1, 2, 3, 4]}
          selectedValue={chiiCount}
          onClick={setChiiCount}
          label='チー'
        />
        <div className='naki-option-set1'>
          あがり方：
          <OptionButton1 label="ロン" selected={selectedOption3} onClick={() => setSelectedOption3(true)} />
          <OptionButton1 label="ツモ" selected={!selectedOption3} onClick={() => setSelectedOption3(false)} />
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
