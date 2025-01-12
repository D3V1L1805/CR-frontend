import React, { useState } from "react";
import axios from "axios";
import "./style/UploadZone.css";
import { useStateContext } from "./StateContext";

const UploadZone = () => {
  const {setImages, setTables, setData} = useStateContext()
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select or drop a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setData(null)
    setImages([])
    setTables([])
    setIsProcessing(true);

    try {
      const response = await axios.post("https://cr-backend-qqf4.onrender.com/upload-pdf/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.extracted_text) {
        setData(response.data)
        alert("File uploaded and processed successfully!");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("File upload failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="card mx-auto mt-4"
      style={{
        maxWidth: "600px",
        padding: "2vh",
        justifyContent: "center",
        alignItems: "baseline",
        width: "100%",
      }}
    >
      <div
        className={`upload-zone ${dragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <h5 className="card-title">Upload Your PDF</h5>
        <p className="card-text">
          Drag and drop a PDF file here or select one to upload.
        </p>

        {file && (
          <p className="file-name">
            Selected File: <strong>{file.name}</strong>
          </p>
        )}

        <input
          type="file"
          accept="application/pdf"
          className="form-control mb-3"
          onChange={handleFileChange}
        />
        <button
          className="btn btn-primary w-100"
          onClick={handleUpload}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Upload and Process"}
        </button>

        {isProcessing && (
          <div className="progress-container mt-3">
            <div className="animated-loading-bar"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadZone;
