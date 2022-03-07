import React, { useState } from 'react';
import './App.css';
import { generateAllPalettes } from './lib';

const Block:React.FC<any> = (color) => {
  console.log(color.color)
  return (
   <div
      style={{
        backgroundColor: color.color
      }}
      className="block"
    >
  </div>
  )
}

function App() {
  const [color, setColor] = useState('');
  const [palettes, setPalettes] = useState<any>(null);

  console.log(generateAllPalettes('red'))

  const handleChange = (e:any) => {
    const { value } = e.target;
    console.log(value)
    setColor(value);
    console.log(e)

    if(e.key == 'Enter') {
      console.log('enter')
      setPalettes(generateAllPalettes(color));
    }
  }

  console.log(palettes)

  return (
    <div className="App">
      <div className="root">
        <div className="input_section">
          <input id="input" onKeyUp={handleChange} />
        </div>
        <div className="color_palettes">
          {[palettes].map((p:any) => {
            console.log(p)
          })}
          <h6>Mono</h6>
          <div id="mono" className='row'>
            {palettes !== null && console.log(palettes.monoChrome)}
            {palettes !== null && palettes.monoChrome.map((c:any, i:any) => (
              <Block key={`${c}-${i}`} color={`hsl(${c.h}, ${c.s*100}%, ${c.l*100}%)`} />
            ))}
          </div>
          <h6>Comp</h6>
          <div className='col'>
            <div id="Comp" className='row'>
              {palettes !== null && palettes.complimentary.color2.map((c:any, i:any) => (
                <Block key={`${c}-${i}`} color={`hsl(${c.h}, ${c.s*100}%, ${c.l*100}%)`} />
              ))}
            </div>
          </div>
          <h6>Split</h6>
          <div className='col'>
            <div id="Split" className='row'>
              {palettes !== null && palettes.splitComplimentary.color2.map((c:any, i:any) => (
                <Block key={`${c}-${i}`} color={`hsl(${c.h}, ${c.s*100}%, ${c.l*100}%)`} />
              ))}
            </div>
            <div id="Split" className='row'>
              {palettes !== null && palettes.splitComplimentary.color3.map((c:any, i:any) => (
                <Block key={`${c}-${i}`} color={`hsl(${c.h}, ${c.s*100}%, ${c.l*100}%)`} />
              ))}
            </div>
          </div>
          <h6>Triadic</h6>
          <div className='col'>
            <div id="Tri" className='row'>
              {palettes !== null && palettes.triadic.color2.map((c:any, i:any) => (
                <Block key={`${c}-${i}`} color={`hsl(${c.h}, ${c.s*100}%, ${c.l*100}%)`} />
              ))}
            </div>
            <div id="Tri" className='row'>
            {palettes !== null && palettes.triadic.color3.map((c:any, i:any) => (
              <Block key={`${c}-${i}`} color={`hsl(${c.h}, ${c.s*100}%, ${c.l*100}%)`} />
            ))}
          </div>
          </div>
          
          <h6>Tetradic</h6>
          <div className='col'>
            <div id="Tet" className='row'>
              {palettes !== null && palettes.tetradic.color2.map((c:any, i:any) => (
                <Block key={`${c}-${i}`} color={`hsl(${c.h}, ${c.s*100}%, ${c.l*100}%)`} />
              ))}
            </div>
            <div id="Tet" className='row'>
              {palettes !== null && palettes.tetradic.color3.map((c:any, i:any) => (
                <Block key={`${c}-${i}`} color={`hsl(${c.h}, ${c.s*100}%, ${c.l*100}%)`} />
              ))}
            </div>
            <div id="Tet" className='row'>
              {palettes !== null && palettes.tetradic.color4.map((c:any, i:any) => (
                <Block key={`${c}-${i}`} color={`hsl(${c.h}, ${c.s*100}%, ${c.l*100}%)`} />
              ))}
            </div>
          </div>
          <h6>Anologous</h6>
          <div className='col'>
            <div id="Ana" className='row'>
              {palettes !== null && palettes.analogous.color2.map((c:any, i:any) => (
                <Block key={`${c}-${i}`} color={`hsl(${c.h}, ${c.s*100}%, ${c.l*100}%)`} />
              ))}
            </div>
            <div id="Ana" className='row'>
              {palettes !== null && palettes.analogous.color3.map((c:any, i:any) => (
                <Block key={`${c}-${i}`} color={`hsl(${c.h}, ${c.s*100}%, ${c.l*100}%)`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
