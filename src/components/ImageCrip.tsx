import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCrip = () => {
  const [crop, setCrop] = useState<any>({});
  const onCrop = async () => {
    const imageRef = document.getElementById("rawImage") as HTMLImageElement;
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(imageRef, crop);
      console.log("切り抜かれた画像のbase64データ: ", croppedImageUrl);
    }
  };
  const getCroppedImg = (
    image: HTMLImageElement,
    crop: { x: any; y: any; width: any; height: any }
  ) => {
    const canvas = document.createElement("canvas");
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx!.imageSmoothingQuality = "high";
    ctx!.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return canvas.toDataURL("image/jpeg", 1.0);
  };

  return (
    <>
      <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
        <img src="/images/maccho.jpeg" id="rawImage" alt="" />
      </ReactCrop>
      <button onClick={onCrop}>選択範囲で切り抜く</button>
    </>
  );
};
export default ImageCrip;
