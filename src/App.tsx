import React, { useState } from 'react';
import './App.css';
import tilesImages from './tilesImages';
import { OptionButton1, OptionButton2} from './components/OptionButton';


const App: React.FC = () => {
  //選択オプション
  const [selectedOption1, setSelectedOption1] = useState<boolean>(false);
  const [selectedOption2, setSelectedOption2] = useState<boolean>(false);
  const [selectedOption3, setSelectedOption3] = useState<boolean>(false);
  const [ponCount, setPonCount] = useState<number>(0);
  const [chiiCount, setChiiCount] = useState<number>(0);
  const [kanCount, setKanCount] = useState<number>(0);

  return (
    <div className='container'>
      <h1 className='title'>麻雀点数計算</h1>
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
    </div>
  )
}

export default App;
