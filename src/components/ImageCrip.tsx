import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";

const ImageCrip = () => {
  const [src, setSrc] = useState("");
  const [crop, setCrop] = useState<any>({});
  const [detector, setDetector] = useState<poseDetection.PoseDetector>();

  // 非同意処理はuseMemoが使えないためuseEffectを使用
  useEffect(() => {
    console.log("モデル作成");
    (async () => {
      const detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.PoseNet
      );
      setDetector(detector);
    })();
  }, []);

  const imageRef = document.getElementById("rawImage") as HTMLImageElement;

  const onCrop = async () => {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(imageRef, crop);
      console.log("切り抜かれた画像のbase64データ: ", croppedImageUrl);
    }
  };
  const getCroppedImg = (
    image: HTMLImageElement,
    crop: { x: any; y: any; width: any; height: any; unit: "px" }
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
    const url = canvas.toDataURL("image/jpeg", 1.0);
    setSrc(url);
    return url;
  };

  const predict = async () => {
    const imageRef = document.getElementById("rawImage") as HTMLImageElement;
    // const detector = await poseDetection.createDetector(
    //   poseDetection.SupportedModels.PoseNet
    // );
    if (!detector) return;

    const estimationConfig = {
      maxPoses: 5,
      flipHorizontal: false,
      scoreThreshold: 0.5,
      nmsRadius: 20,
    };
    console.log(imageRef);
    const poses = await detector.estimatePoses(imageRef, estimationConfig);
    console.log(poses);

    if (!poses.length) return;
    const left_shoulder = poses[0].keypoints[5];
    const right_shoulder = poses[0].keypoints[6];
    const left_hip = poses[0].keypoints[11];
    const right_hip = poses[0].keypoints[12];
    const left_elbow = poses[0].keypoints[7];
    const right_elbow = poses[0].keypoints[8];

    const crop = {
      x: right_elbow.x,
      y: right_shoulder.y,
      width: left_elbow.x - right_elbow.x,
      height: right_hip.y - right_shoulder.y,
      unit: "px",
    };
    setCrop(crop);
    console.log(poses);
  };
  console.log(crop);

  return (
    <>
      <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
        <img src="/images/maccho3.jpeg" id="rawImage" alt="" />
      </ReactCrop>

      <button onClick={onCrop}>選択範囲で切り抜く</button>
      <div onClick={() => predict()}>Predict</div>
      <img src={src} alt="" />
    </>
  );
};
export default ImageCrip;
