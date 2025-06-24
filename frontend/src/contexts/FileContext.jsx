import React, { createContext, useContext, useState, useEffect } from "react";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [fileInfo, setFileInfo] = useState(() => {
    const stored = localStorage.getItem("uploadedFileInfo");
    return stored ? JSON.parse(stored) : null;
  });
  const [preview, setPreview] = useState(() => {
    const stored = localStorage.getItem("uploadedFilePreview");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (fileInfo) {
      localStorage.setItem("uploadedFileInfo", JSON.stringify(fileInfo));
    } else {
      localStorage.removeItem("uploadedFileInfo");
    }
  }, [fileInfo]);

  useEffect(() => {
    if (preview) {
      localStorage.setItem("uploadedFilePreview", JSON.stringify(preview));
    } else {
      localStorage.removeItem("uploadedFilePreview");
    }
  }, [preview]);

  const clearFile = () => {
    setFileInfo(null);
    setPreview(null);
  };

  return (
    <FileContext.Provider value={{ fileInfo, setFileInfo, preview, setPreview, clearFile }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFile = () => useContext(FileContext); 