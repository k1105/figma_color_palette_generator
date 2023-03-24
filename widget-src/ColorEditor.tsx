import { DeleteButton } from "./deleteButton";
import { formatHEX } from "../lib/formatHEX";

const { widget } = figma
const { AutoLayout, Input, Rectangle, Frame } = widget

type Props = {
  info:  {id: number, name: string, color: string};
  colInfo: {id: number, name: string, color: string}[];
  setColInfo: any;
  num: number;
  setNum: any;
}

function ColorEditor({
info,
colInfo,
setColInfo,
num,
setNum
}:Props
) {
    return (
      <AutoLayout
      name="RowContainer"
      fill="#FFF"
      direction="vertical"
      width={600}
    >
      <AutoLayout
        name="RowContent"
        fill="#FFF"
        height={55}
      >
        <Frame
          name="ColorSample"
          fill={info.color}
          width={140}
          height="fill-parent"
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
          width={140}
          height="fill-parent"
          verticalAlignItems="center"
        >
        <Input
          name="HexInput"
          fill="#000"
          value={info.color}
          placeholder="HEX"
          onTextEditEnd={(e) => {
            info.color = formatHEX(e.characters);
            const targetIndex = colInfo.findIndex(el=>el.id === info.id);
            colInfo[targetIndex] = info;
            setColInfo(colInfo);
          }}
          width="fill-parent"
          height="fill-parent"
          
          inputBehavior="wrap"
          fontFamily="Inter"
          fontSize={18}
          verticalAlignText="center"
        />
        </AutoLayout>
        <AutoLayout
          name="NameContainer"
          fill="#FFF"
          direction="vertical"
          spacing={10}
          padding={{
            vertical: 0,
            horizontal: 10,
          }}
          width={240}
          height="fill-parent"
          verticalAlignItems="center"
        >
        <Input
          name="NameInput"
          fill="#000"
          value={info.name}
          placeholder="Color Name"
          onTextEditEnd={(e) => {
            info.name = e.characters;
            const targetIndex = colInfo.findIndex(el=>el.id === info.id);
            colInfo[targetIndex] = info;
            setColInfo(colInfo);
          }}
          width="fill-parent"
          height="fill-parent"
          
          inputBehavior="wrap"
          fontFamily="Inter"
          fontSize={18}
          verticalAlignText="center"
        />
        </AutoLayout>
        <DeleteButton id={info.id} colInfo={colInfo} setColInfo={setColInfo} num={num} setNum={setNum}/>
      </AutoLayout>
      <Rectangle
        name="divisor"
        fill="#000"
        width="fill-parent"
        height={1}
      />
    </AutoLayout>
    );
  }

  export default ColorEditor;

