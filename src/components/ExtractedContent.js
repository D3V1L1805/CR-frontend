import React from "react";
import {useStateContext} from "./StateContext"

const ExtractedContent = () => {
  
  const {images, setImages, tables, setTables, data} = useStateContext()
  const fetchImages = async () => {
    try {
      const response = await fetch("https://cr-backend-hun7.onrender.com/images/"); // Replace with your API endpoint
      const res_data = await response.json();
      const fetchedImages = res_data.images.map((base64, index) => ({
        url: `data:image/jpeg;base64,${base64}`,
        id: index,
      }));
      setImages(fetchedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const fetchTables = async () => {
    try {
      const response = await fetch("https://cr-backend-hun7.onrender.com/tables/"); // Replace with your API endpoint
      const res_data = await response.json();
      const fetchedTables = res_data.tables.map((table) => ({
        url: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${table.content}`,
        filename: table.filename,
      }));
      setTables(fetchedTables);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  return (
    <div className="extracted-content" style={{ display: "flex", gap: "1rem" }}>
      <div
        className="content-section"
        style={{
          flex: 1,
          overflowY: "auto",
          maxHeight: "400px",
          border: "1px solid #ddd",
          padding: "1rem",
        }}
      >
        <h3>Extracted Text</h3>
        {data?.extracted_text ? (
          <pre>{data.extracted_text}</pre>
        ) : (
          <p>No text extracted. Please check the uploaded file.</p>
        )}
      </div>

      <div
        className="content-section"
        style={{
          flex: 1,
          overflowY: "auto",
          maxHeight: "400px",
          border: "1px solid #ddd",
          padding: "1rem",
        }}
      >
        <h3>Extracted Images</h3>
        <button
          onClick={fetchImages}
          style={{
            marginBottom: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "0.375rem",
            cursor: "pointer",
          }}
        >
          Fetch Images
        </button>
        {images.length > 0 ? (
          images.map((img) => (
            <div key={img.id} style={{ marginBottom: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img
                src={img.url}
                alt={`Extracted ${img.id}`}
                style={{ width: "100%", borderRadius: "0.375rem" }}
              />
              <a
                href={img.url}
                download={img.filename}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "0.375rem",
                  marginTop: "1rem",
                }}
              >
                Download
              </a>
            </div>
          ))
        ) : (
          <p>No images fetched yet.</p>
        )}

      </div>

      <div
        className="content-section"
        style={{
          flex: 1,
          overflowY: "auto",
          maxHeight: "400px",
          border: "1px solid #ddd",
          padding: "1rem",
        }}
      >
        <h3>Extracted Tables</h3>
        <button
          onClick={fetchTables}
          style={{
            marginBottom: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "0.375rem",
            cursor: "pointer",
          }}
        >
          Fetch Tables
        </button>
        {tables.length > 0 ? (
          <div
            className="table-container"
            style={{
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            }}
          >
            {tables.map((table, index) => (
              <div
                key={index}
                className="table-card"
                style={{
                  border: "1px solid #ddd",
                  padding: "1rem",
                  borderRadius: "0.375rem",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                }}
              >
                <h4
                  style={{
                    fontSize: "1rem",
                    marginBottom: "0.5rem",
                    color: "#374151",
                  }}
                >
                  Table {index + 1}
                </h4>
                <p
                  style={{
                    fontSize: "0.875rem",
                    marginBottom: "0.5rem",
                    color: "#6b7280",
                  }}
                >
                  {table.filename}
                </p>
                <a
                  href={table.url}
                  download={table.filename}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "0.375rem",
                  }}
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>No tables fetched yet.</p>
        )}
      </div>
    </div>
  );
};

export default ExtractedContent;
