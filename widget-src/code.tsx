// This widget will open an Iframe window with buttons to show a toast message and close the window.

import AddColorButton from "./AddColorButton"
import ColorEditor from "./ColorEditor"
import { HEXToRGB } from "../lib/HEXToRGB";
import { RGBToCMYK } from "../lib/RGBToCMYK";

const { widget } = figma
const { AutoLayout, useSyncedState, useEffect, Text, Frame, Rectangle } = widget

function createInlineText(name: string, char:string, color:{r: number, g: number, b: number}) {
  const text = figma.createText()
  text.name = name;
  text.characters = char;

  text.fontSize = 18
  text.fills = [{ type: 'SOLID', color: color }]
  return text;
}

function ColorManager() {
  const widgetId = widget.useWidgetId();
  const [num, setNum] = useSyncedState("num", 0);
  const [maxIndex, setMaxIndex] = useSyncedState("maxIndex", 0);
  const [colInfo, setColInfo] = useSyncedState<{id: number, name: string, color: string}[]>("col", []);
  useEffect(()=>{
    if(num > colInfo.length) {
      const id = maxIndex;
      const color = "#FF0000";
      const name = "ColorName"+String(id);
      colInfo.push({id: id, name: name, color: color});
      setMaxIndex(maxIndex+1);
      setColInfo(colInfo);
    }
    
  });
  return (

    <AutoLayout
      name="ColorPaletteGenerator"
      fill="#FFF"
      direction="vertical"
      spacing={30}
      padding={{
        vertical: 75,
        horizontal: 103,
      }}
      horizontalAlignItems="center"
    >
      <AutoLayout
        name="TableContainer"
        fill="#FFF"
        direction="vertical"
      >
        <AutoLayout
      name="HeaderContainer"
      fill="#FFF"
      direction="vertical"
      width={600}
    >
      <AutoLayout
        name="RowContent"
        fill="#FFF"
        height={30}
        verticalAlignItems="end"
      >
        <Frame
          name="Spacer"
          width={140}
          height="fill-parent"
        />
        <Rectangle
          name="Rectangle 18"
          fill="#000"
          width={1}
          height={10}
        />
        <AutoLayout
          name="HEXContainer"
          fill="#FFF"
          direction="vertical"
          spacing={10}
          padding={{
            vertical: 0,
            horizontal: 10,
          }}
          width={139}
          height="fill-parent"
          verticalAlignItems="center"
        >
          <Text
            name="HEX"
            fill="#000"
            lineHeight={30}
            fontFamily="Inter"
            fontSize={18}
          >
            HEX
          </Text>
        </AutoLayout>
        <Rectangle
          name="Rectangle 19"
          fill="#000"
          width={1}
          height={10}
        />
        <AutoLayout
          name="NameContainer"
          fill="#FFF"
          direction="vertical"
          spacing={10}
          padding={{
            vertical: 0,
            horizontal: 10,
          }}
          width={239}
          height="fill-parent"
          verticalAlignItems="center"
        >
          <Text
            name="Name"
            fill="#000"
            lineHeight={30}
            fontFamily="Inter"
            fontSize={18}
          >
            Name
          </Text>
        </AutoLayout>
      </AutoLayout>
      <Rectangle
        name="divisor"
        fill="#000"
        width="fill-parent"
        height={1}
      />
    </AutoLayout>
        {
          colInfo.map(info=> {
            return <ColorEditor key={info.id} info={info} colInfo={colInfo} setColInfo={setColInfo} num={num} setNum={setNum}/>;
          })
        }

      </AutoLayout>
      <AddColorButton  num={num} setNum={setNum}/>
      <AutoLayout
        name="CreateColorPaletteButton"
        fill="#FFF"
        stroke="#000"
        direction="vertical"
        spacing={10}
        padding={{
          vertical: 23,
          horizontal: 193,
        }}
        width={600}
        height={60}
        verticalAlignItems="center"
        horizontalAlignItems="center"
        onClick={async ()=>{
          const currentWidget = figma.getNodeById(widgetId) as WidgetNode; // 現在操作しているwidgetを取得
          colInfo.forEach(async (info, index) => {
            let txtCol = {r: 0, g: 0, b: 0}; //テキストの色
            const rgb = HEXToRGB(info.color);  //HEX  -> RGB変換
            const cmyk = RGBToCMYK(rgb.R, rgb.G, rgb.B); //RGB -> CMYK変換
            const frame = figma.createFrame(); //カラーパレットのもとになるフレームの作成
            const brightness = Math.max(rgb.R, rgb.G, rgb.B);
            if(brightness < 100) { //もし、R, G Bのうち最大の明度の値が100を下回っていたら（=R: 100,G: 100,B: 100よりも暗かったら）
              txtCol = {r: 1, g: 1, b: 1}; //テキストの色を白に
            }
            /**
             * オートレイアウト設定
             */
            frame.layoutMode = "VERTICAL";
            frame.itemSpacing = 5;
            frame.verticalPadding = 20;
            frame.horizontalPadding = 20;
            frame.x = currentWidget.x + (400 + 10) * index; //Widgetの位置を基準に
            frame.y = currentWidget.y + currentWidget.height + 100;
            frame.fills = [{ type: 'SOLID', color: { r: rgb.R / 255, g: rgb.G / 255, b: rgb.B / 255 } }]
            frame.resize(400, 400);

            await figma.loadFontAsync({ family: "Inter", style: "Regular" }) //フォントの読み込み
            
            /**
             * テキストをフレームに挿入
             */

            frame.appendChild(createInlineText("Name", info.name, txtCol));
            frame.appendChild(createInlineText("CMYK", `C: ${cmyk.C} M: ${cmyk.M} Y: ${cmyk.Y} K: ${cmyk.K}`, txtCol));
            frame.appendChild(createInlineText("RGB", `R: ${rgb.R} G: ${rgb.G} B: ${rgb.B}`, txtCol));
            frame.appendChild(createInlineText("HEX", `HEX: ${info.color.slice(1, 7)}`, txtCol));
            frame.appendChild(createInlineText("Pantone", "Pantone: ", txtCol));
            frame.appendChild(createInlineText("DIC", "DIC: ", txtCol));
            
            figma.currentPage.appendChild(frame);
          })
        }}
      >
        <Text
          name="Create Color Palette"
          fill="#000"
          lineHeight={30}
          fontFamily="Inter"
          fontSize={18}
        >
          Create Color Palette
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(ColorManager)
