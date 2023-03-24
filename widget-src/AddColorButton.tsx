const { widget } = figma
const { Text, AutoLayout } = widget

function AddColorButton({num, setNum}: {num: number, setNum: (newValue: number | ((currValue: number) => number)) => void}) {
    return (
        <AutoLayout
        name="AddNewColorButton"
        fill="#FFF"
        spacing={10}
        padding={{
        vertical: 0,
        horizontal: 185,
        }}
        width={600}
        horizontalAlignItems="center"
        verticalAlignItems="center"
        onClick={()=>{
            setNum(num+1);
        }}
        >
        <Text
        name="+ Add New Color"
        fill="#000"
        lineHeight={30}
        fontFamily="Inter"
        fontSize={18}
        >
        + Add New Color
        </Text>
        </AutoLayout>
    );
}

export default AddColorButton;