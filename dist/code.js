"use strict";
(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // widget-src/AddColorButton.tsx
  var { widget } = figma;
  var { Text, AutoLayout } = widget;
  function AddColorButton({ num, setNum }) {
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout,
      {
        name: "AddNewColorButton",
        fill: "#FFF",
        spacing: 10,
        padding: {
          vertical: 0,
          horizontal: 185
        },
        width: 600,
        horizontalAlignItems: "center",
        verticalAlignItems: "center",
        onClick: () => {
          setNum(num + 1);
        }
      },
      /* @__PURE__ */ figma.widget.h(
        Text,
        {
          name: "+ Add New Color",
          fill: "#000",
          lineHeight: 30,
          fontFamily: "Inter",
          fontSize: 18
        },
        "+ Add New Color"
      )
    );
  }
  var AddColorButton_default = AddColorButton;

  // widget-src/deleteButton.tsx
  var { widget: widget2 } = figma;
  var { AutoLayout: AutoLayout2, Frame, SVG } = widget2;
  var DeleteButton = ({ id, colInfo, setColInfo, num, setNum }) => {
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout2,
      {
        name: "DeleteButton",
        fill: "#FFF",
        spacing: 10,
        padding: {
          vertical: 17,
          horizontal: 31
        },
        height: "fill-parent",
        onClick: () => {
          const targetIndex = colInfo.findIndex((el) => el.id === id);
          colInfo.splice(targetIndex, 1);
          setColInfo(colInfo);
          setNum(num - 1);
        }
      },
      /* @__PURE__ */ figma.widget.h(
        Frame,
        {
          name: "Group 3",
          strokeWidth: 0,
          overflow: "visible",
          width: 17,
          height: 17
        },
        /* @__PURE__ */ figma.widget.h(
          SVG,
          {
            name: "Vector 3_Vector 4",
            height: 18,
            width: 18,
            src: "<svg width='19' height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'>\n  <path d='M1 1L18 18' stroke='black'/>\n  <path d='M1 18L18 1' stroke='black'/>\n  </svg>\n  "
          }
        )
      )
    );
  };

  // lib/formatHEX.ts
  var formatHEX = (hex) => {
    if (hex[0] !== "#") {
      hex = "#" + hex;
    }
    if (hex.length < 4) {
      hex = hex + 0 * (4 - hex.length);
    }
    if (hex.length == 4) {
      return ("#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]).toUpperCase();
    }
    if (hex.length < 7) {
      hex += 0 * (7 - hex.length);
    }
    return hex.slice(0, 7).toUpperCase();
  };

  // widget-src/ColorEditor.tsx
  var { widget: widget3 } = figma;
  var { AutoLayout: AutoLayout3, Input, Rectangle, Frame: Frame2 } = widget3;
  function ColorEditor({
    info,
    colInfo,
    setColInfo,
    num,
    setNum
  }) {
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout3,
      {
        name: "RowContainer",
        fill: "#FFF",
        direction: "vertical",
        width: 600
      },
      /* @__PURE__ */ figma.widget.h(
        AutoLayout3,
        {
          name: "RowContent",
          fill: "#FFF",
          height: 55
        },
        /* @__PURE__ */ figma.widget.h(
          Frame2,
          {
            name: "ColorSample",
            fill: info.color,
            width: 140,
            height: "fill-parent"
          }
        ),
        /* @__PURE__ */ figma.widget.h(
          AutoLayout3,
          {
            name: "HEXContainer",
            fill: "#FFF",
            direction: "vertical",
            spacing: 10,
            padding: {
              vertical: 0,
              horizontal: 10
            },
            width: 140,
            height: "fill-parent",
            verticalAlignItems: "center"
          },
          /* @__PURE__ */ figma.widget.h(
            Input,
            {
              name: "HexInput",
              fill: "#000",
              value: info.color,
              placeholder: "HEX",
              onTextEditEnd: (e) => {
                info.color = formatHEX(e.characters);
                const targetIndex = colInfo.findIndex((el) => el.id === info.id);
                colInfo[targetIndex] = info;
                setColInfo(colInfo);
              },
              width: "fill-parent",
              height: "fill-parent",
              inputBehavior: "wrap",
              fontFamily: "Inter",
              fontSize: 18,
              verticalAlignText: "center"
            }
          )
        ),
        /* @__PURE__ */ figma.widget.h(
          AutoLayout3,
          {
            name: "NameContainer",
            fill: "#FFF",
            direction: "vertical",
            spacing: 10,
            padding: {
              vertical: 0,
              horizontal: 10
            },
            width: 240,
            height: "fill-parent",
            verticalAlignItems: "center"
          },
          /* @__PURE__ */ figma.widget.h(
            Input,
            {
              name: "NameInput",
              fill: "#000",
              value: info.name,
              placeholder: "Color Name",
              onTextEditEnd: (e) => {
                info.name = e.characters;
                const targetIndex = colInfo.findIndex((el) => el.id === info.id);
                colInfo[targetIndex] = info;
                setColInfo(colInfo);
              },
              width: "fill-parent",
              height: "fill-parent",
              inputBehavior: "wrap",
              fontFamily: "Inter",
              fontSize: 18,
              verticalAlignText: "center"
            }
          )
        ),
        /* @__PURE__ */ figma.widget.h(DeleteButton, { id: info.id, colInfo, setColInfo, num, setNum })
      ),
      /* @__PURE__ */ figma.widget.h(
        Rectangle,
        {
          name: "divisor",
          fill: "#000",
          width: "fill-parent",
          height: 1
        }
      )
    );
  }
  var ColorEditor_default = ColorEditor;

  // lib/HEXToRGB.ts
  var HEXToRGB = (hex) => {
    if (hex.length !== 7) {
      return { R: 0, G: 0, B: 0 };
    } else {
      const R = parseInt(hex[1] + hex[2], 16);
      const G = parseInt(hex[3] + hex[4], 16);
      const B = parseInt(hex[5] + hex[6], 16);
      return { R, G, B };
    }
  };

  // lib/RGBToCMYK.ts
  var RGBToCMYK = (r, g, b) => {
    r = r / 255 * 100;
    g = g / 255 * 100;
    b = b / 255 * 100;
    let K = 100 - Math.max(r, g, b);
    const C = K == 100 ? 0 : Math.floor((100 - r - K) / (100 - K) * 100);
    const M = K == 100 ? 0 : Math.floor((100 - g - K) / (100 - K) * 100);
    const Y = K == 100 ? 0 : Math.floor((100 - b - K) / (100 - K) * 100);
    K = Math.floor(K);
    return { C, M, Y, K };
  };

  // widget-src/code.tsx
  var { widget: widget4 } = figma;
  var { AutoLayout: AutoLayout4, useSyncedState, useEffect, Text: Text2, Frame: Frame3, Rectangle: Rectangle2 } = widget4;
  function createInlineText(name, char, color) {
    const text = figma.createText();
    text.name = name;
    text.characters = char;
    text.fontSize = 18;
    text.fills = [{ type: "SOLID", color }];
    return text;
  }
  function ColorManager() {
    const widgetId = widget4.useWidgetId();
    const [num, setNum] = useSyncedState("num", 0);
    const [maxIndex, setMaxIndex] = useSyncedState("maxIndex", 0);
    const [colInfo, setColInfo] = useSyncedState("col", []);
    useEffect(() => {
      if (num > colInfo.length) {
        const id = maxIndex;
        const color = "#FF0000";
        const name = "ColorName" + String(id);
        colInfo.push({ id, name, color });
        setMaxIndex(maxIndex + 1);
        setColInfo(colInfo);
      }
    });
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout4,
      {
        name: "ColorPaletteGenerator",
        fill: "#FFF",
        direction: "vertical",
        spacing: 30,
        padding: {
          vertical: 75,
          horizontal: 103
        },
        horizontalAlignItems: "center"
      },
      /* @__PURE__ */ figma.widget.h(
        AutoLayout4,
        {
          name: "TableContainer",
          fill: "#FFF",
          direction: "vertical"
        },
        /* @__PURE__ */ figma.widget.h(
          AutoLayout4,
          {
            name: "HeaderContainer",
            fill: "#FFF",
            direction: "vertical",
            width: 600
          },
          /* @__PURE__ */ figma.widget.h(
            AutoLayout4,
            {
              name: "RowContent",
              fill: "#FFF",
              height: 30,
              verticalAlignItems: "end"
            },
            /* @__PURE__ */ figma.widget.h(
              Frame3,
              {
                name: "Spacer",
                width: 140,
                height: "fill-parent"
              }
            ),
            /* @__PURE__ */ figma.widget.h(
              Rectangle2,
              {
                name: "Rectangle 18",
                fill: "#000",
                width: 1,
                height: 10
              }
            ),
            /* @__PURE__ */ figma.widget.h(
              AutoLayout4,
              {
                name: "HEXContainer",
                fill: "#FFF",
                direction: "vertical",
                spacing: 10,
                padding: {
                  vertical: 0,
                  horizontal: 10
                },
                width: 139,
                height: "fill-parent",
                verticalAlignItems: "center"
              },
              /* @__PURE__ */ figma.widget.h(
                Text2,
                {
                  name: "HEX",
                  fill: "#000",
                  lineHeight: 30,
                  fontFamily: "Inter",
                  fontSize: 18
                },
                "HEX"
              )
            ),
            /* @__PURE__ */ figma.widget.h(
              Rectangle2,
              {
                name: "Rectangle 19",
                fill: "#000",
                width: 1,
                height: 10
              }
            ),
            /* @__PURE__ */ figma.widget.h(
              AutoLayout4,
              {
                name: "NameContainer",
                fill: "#FFF",
                direction: "vertical",
                spacing: 10,
                padding: {
                  vertical: 0,
                  horizontal: 10
                },
                width: 239,
                height: "fill-parent",
                verticalAlignItems: "center"
              },
              /* @__PURE__ */ figma.widget.h(
                Text2,
                {
                  name: "Name",
                  fill: "#000",
                  lineHeight: 30,
                  fontFamily: "Inter",
                  fontSize: 18
                },
                "Name"
              )
            )
          ),
          /* @__PURE__ */ figma.widget.h(
            Rectangle2,
            {
              name: "divisor",
              fill: "#000",
              width: "fill-parent",
              height: 1
            }
          )
        ),
        colInfo.map((info) => {
          return /* @__PURE__ */ figma.widget.h(ColorEditor_default, { key: info.id, info, colInfo, setColInfo, num, setNum });
        })
      ),
      /* @__PURE__ */ figma.widget.h(AddColorButton_default, { num, setNum }),
      /* @__PURE__ */ figma.widget.h(
        AutoLayout4,
        {
          name: "CreateColorPaletteButton",
          fill: "#FFF",
          stroke: "#000",
          direction: "vertical",
          spacing: 10,
          padding: {
            vertical: 23,
            horizontal: 193
          },
          width: 600,
          height: 60,
          verticalAlignItems: "center",
          horizontalAlignItems: "center",
          onClick: () => __async(this, null, function* () {
            const currentWidget = figma.getNodeById(widgetId);
            colInfo.forEach((info, index) => __async(this, null, function* () {
              let txtCol = { r: 0, g: 0, b: 0 };
              const rgb = HEXToRGB(info.color);
              const cmyk = RGBToCMYK(rgb.R, rgb.G, rgb.B);
              const frame = figma.createFrame();
              const brightness = Math.max(rgb.R, rgb.G, rgb.B);
              if (brightness < 100) {
                txtCol = { r: 1, g: 1, b: 1 };
              }
              frame.layoutMode = "VERTICAL";
              frame.itemSpacing = 5;
              frame.verticalPadding = 20;
              frame.horizontalPadding = 20;
              frame.x = currentWidget.x + (400 + 10) * index;
              frame.y = currentWidget.y + currentWidget.height + 100;
              frame.fills = [{ type: "SOLID", color: { r: rgb.R / 255, g: rgb.G / 255, b: rgb.B / 255 } }];
              frame.resize(400, 400);
              yield figma.loadFontAsync({ family: "Inter", style: "Regular" });
              frame.appendChild(createInlineText("Name", info.name, txtCol));
              frame.appendChild(createInlineText("CMYK", `C: ${cmyk.C} M: ${cmyk.M} Y: ${cmyk.Y} K: ${cmyk.K}`, txtCol));
              frame.appendChild(createInlineText("RGB", `R: ${rgb.R} G: ${rgb.G} B: ${rgb.B}`, txtCol));
              frame.appendChild(createInlineText("HEX", `HEX: ${info.color.slice(1, 7)}`, txtCol));
              frame.appendChild(createInlineText("Pantone", "Pantone: ", txtCol));
              frame.appendChild(createInlineText("DIC", "DIC: ", txtCol));
              figma.currentPage.appendChild(frame);
            }));
          })
        },
        /* @__PURE__ */ figma.widget.h(
          Text2,
          {
            name: "Create Color Palette",
            fill: "#000",
            lineHeight: 30,
            fontFamily: "Inter",
            fontSize: 18
          },
          "Create Color Palette"
        )
      )
    );
  }
  widget4.register(ColorManager);
})();
