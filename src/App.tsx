import React, { useState, useEffect } from 'react';
import './App.css';
import tilesImages from './tilesImages';
import { OptionButton1, OptionButton2} from './components/OptionButton';
import { SelectedTilesRow } from './components/SelectedTilesRow';


const App: React.FC = () => {
  //選択オプション
  const [selectedOption1, setSelectedOption1] = useState<boolean>(false);
  const [selectedOption2, setSelectedOption2] = useState<boolean>(false);
  const [selectedOption3, setSelectedOption3] = useState<boolean>(false);
  const [ponCount, setPonCount] = useState<number>(0);
  const [chiiCount, setChiiCount] = useState<number>(0);
  const [kanCount, setKanCount] = useState<number>(0);

  //選択された牌の記録
  const [selectedTiles, setSelectedTiles] = useState<(string | null)[]>(Array(14).fill(null));

  //麻雀牌クリックによる牌ロットへの追加処理
  const handleTilesClick = (tile: string) => {
    //ロットに空欄があることを確認(あれば最初のインデックスを返し、なければ-1を返す)
    const index = selectedTiles.findIndex(tile => tile === null);
    if (index !== -1) {
      const newTiles = [...selectedTiles];
      newTiles[index] = tile;
      setSelectedTiles(newTiles);
    }
  };

  //選択されたカンの回数に応じて更新
  useEffect(() => {
    setSelectedTiles(Array(14 + kanCount).fill(null));
  }, [kanCount]);

  //一つ戻るボタンの処理
  const backTiles = () => {
    const newTiles = [...selectedTiles];
    for (let i = newTiles.length - 1; i >= 0; i--) {
      if (newTiles[i] !== null) {
        newTiles[i] = null;
        break;
      }
    }
    setSelectedTiles(newTiles);
  };

  //牌リセットボタンの処理
  const resetTiles = () => {
    setSelectedTiles(Array(14 + kanCount).fill(null))
  };

  //全リセットボタンの処理
  const resetAll = () => {
    setSelectedOption1(false);
    setSelectedOption2(false);
    setSelectedOption3(false);
    setPonCount(0);
    setChiiCount(0);
    setKanCount(0);
    setSelectedTiles(Array(14).fill(null));
  };

  return (
    <div className='container'>
      {/*タイトル*/}
      <h1 className='title'>麻雀点数計算</h1>
      {/*オプションボタン*/}
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
      {/*麻雀牌の選択肢*/}
      <div className="tiles-row">
        {tilesImages.map((src, index) => (
          <img key={index} src={src} alt={`Tiles ${index + 1}`} onClick={() => handleTilesClick(src)} className="tiles" />
        ))}
      </div>
      {/*選択された麻雀牌を表示*/}
      <SelectedTilesRow 
        ponCount={ponCount} 
        chiiCount={chiiCount} 
        kanCount={kanCount} 
        selectedOption1={selectedOption1} 
        selectedTiles={selectedTiles} 
      />
      {/*リセットボタン各種*/}
      <div className='button-container'>
        <button onClick={backTiles}>一つ戻る</button>
        <button onClick={resetTiles}>牌リセット</button>
        <button onClick={resetAll}>全リセット</button>
      </div>
    </div>
  )
}

export default App;
