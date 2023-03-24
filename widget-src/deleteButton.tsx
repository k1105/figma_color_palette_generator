const { widget } = figma;
const {AutoLayout, Frame, SVG} = widget;

type Props = {
    id: number;
    colInfo: {id: number, name: string, color: string}[];
    setColInfo: any;
    num: number;
    setNum: any;
}

export const DeleteButton = ({ id, colInfo, setColInfo, num, setNum }:Props) => {
    return (
    <AutoLayout
        name="DeleteButton"
        fill="#FFF"
        spacing={10}
        padding={{
          vertical: 17,
          horizontal: 31,
        }}
        height="fill-parent"
        onClick={()=>{
            const targetIndex = colInfo.findIndex(el=>el.id === id);
            colInfo.splice(targetIndex, 1);
            setColInfo(colInfo);
            setNum(num-1);
        }}
      >
        <Frame
          name="Group 3"
          strokeWidth={
            0
          }
          overflow="visible"
          width={17}
          height={17}
        >
          <SVG
            name="Vector 3_Vector 4"
            height={18}
            width={18}
            src="<svg width='19' height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <path d='M1 1L18 18' stroke='black'/>
  <path d='M1 18L18 1' stroke='black'/>
  </svg>
  "
          />
        </Frame>
      </AutoLayout>);
}