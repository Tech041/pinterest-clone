import React, { useState } from "react";
import useEditorStore from "../../utils/editorStore";
import { HexColorPicker } from "react-colorful";
import { portraitSizes, landscapeSizes } from "../../data/Data";

const Options = ({ previewImg }) => {
  const {
    selectedLayer,
    textOptions,
    setTextOptions,
    canvasOptions,
    setCanvasOptions,
  } = useEditorStore();
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const originalOrientation =
    previewImg.width < previewImg.height ? "portrait" : "landscape";

  const handleSizeClick = (size) => {
    let newHeight;

    if (size === "original") {
      if (
        // FIXED: SHORTEN
        // (originalOrientation === "portrait" &&
        //   canvasOptions.orientation === "portrait") ||
        // (originalOrientation === "landscape" &&
        //   canvasOptions.orientation === "landscape")
        originalOrientation === canvasOptions.orientation
      ) {
        newHeight = (375 * previewImg.height) / previewImg.width;
      } else {
        newHeight = (375 * previewImg.width) / previewImg.height;
      }
    } else {
      newHeight = (375 * size.height) / size.width;
    }

    setCanvasOptions({
      ...canvasOptions,
      size: size === "original" ? "original" : size.name,
      height: newHeight,
    });
  };

  
  
  const handleOrientationClick = (orientation) => {
    let newHeight;

    if (
      // FIXED: SHORTEN
      // (originalOrientation === "portrait" && orientation === "portrait") ||
      // (originalOrientation === "landscape" && orientation === "landscape")
      originalOrientation === orientation
    ) {
      newHeight = (375 * previewImg.height) / previewImg.width;
    } else {
      newHeight = (375 * previewImg.width) / previewImg.height;
    }

    setCanvasOptions({
      ...canvasOptions,
      orientation,
      size: "original",
      height: newHeight,
    });
  };

  return (
    <div className="options">
      {selectedLayer === "text" ? (
        <div className="">
          <div className="editingOption">
            <span className="">Font Size</span>
            <input
              type="number"
              value={textOptions.fontSize}
              onChange={(e) =>
                setTextOptions({ ...textOptions, fontSize: e.target.value })
              }
            />
          </div>
          <div className="editingOption">
            <span>Color</span>
            <div className="textColor">
              <div
                className="colorPreview"
                style={{ backgroundColor: textOptions.color }}
                onClick={() => setIsColorPickerOpen((prev) => !prev)}
              />

              {isColorPickerOpen && (
                <div className="colorPicker">
                  <HexColorPicker
                    color={textOptions.color}
                    onChange={(color) =>
                      setTextOptions({ ...textOptions, color })
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="editingOption">
            <span>Orientation</span>
            <div className="orientations">
              <div
                className={`orientation ${
                  canvasOptions.orientation === "portrait" ? "selected" : ""
                }`}
                onClick={() => handleOrientationClick("portrait")}
              >
                P
              </div>
              <div
                className={`orientation ${
                  canvasOptions.orientation === "landscape" ? "selected" : ""
                }`}
                onClick={() => handleOrientationClick("landscape")}
              >
                L
              </div>
            </div>
          </div>
          <div className="editOption">
            <span>Sizes</span>
            <div className="sizes">
              <div
                className={`size ${
                  canvasOptions.size === "original" ? "selected" : ""
                }`}
                onClick={() => handleSizeClick("original")}
              >
                Original
              </div>
              {canvasOptions.orientation === "portrait" ? (
                <>
                  {portraitSizes.map((size) => (
                    <div
                      key={size.name}
                      className={`size ${
                        canvasOptions.size === size.name ? "selected" : ""
                      }`}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size.name}
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {landscapeSizes.map((size) => (
                    <div
                      key={size.name}
                      className={`size ${
                        canvasOptions.size === size.name ? "selected" : ""
                      }`}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size.name}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="editingOption">
            <span>Background Color</span>
            <div className="bgColor">
              <div
                className="colorPreview"
                style={{ backgroundColor: canvasOptions.backgroundColor }}
                onClick={() => setIsColorPickerOpen((prev) => !prev)}
              />

              {isColorPickerOpen && (
                <div className="colorPicker">
                  <HexColorPicker
                    color={canvasOptions.backgroundColor}
                    onChange={(color) =>
                      setCanvasOptions({
                        ...canvasOptions,
                        backgroundColor: color,
                      })
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Options;
