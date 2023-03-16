import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
// Register one of the TF.js backends.
import "@tensorflow/tfjs-backend-webgl";
import { createCanvas, loadImage, Canvas, JPEGStream } from "canvas";
import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const Predict = () => {
  const imageElement = document.getElementById("cat") as HTMLImageElement;

  const predict = async () => {
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.PoseNet
    );
    const estimationConfig = {
      maxPoses: 5,
      flipHorizontal: false,
      scoreThreshold: 0.5,
      nmsRadius: 20,
    };
    const poses = await detector.estimatePoses(imageElement, estimationConfig);
    console.log(poses);
  };
  return (
    <>
      <div onClick={() => predict()}>Predict</div>
      <img
        id="cat"
        src="/images/maccho.jpeg"
        // width="312"
        // height="112"
        alt="画像の解説文です"
      />
    </>
  );
};

export default Predict;
