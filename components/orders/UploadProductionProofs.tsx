"use client";

import React, { useRef, useState } from "react";
import {
  UploadCloud,
  Image as ImageIcon,
  Check,
  X,
  Send,
} from "lucide-react";

interface FileItem {
  file: File;
  status: "uploaded" | "error";
}

const UploadProductionProofs = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<FileItem[]>([]);

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const allowed = Array.from(selectedFiles).filter(
      (file) =>
        ["image/png", "image/jpeg", "image/jpg"].includes(file.type) &&
        file.size <= 10 * 1024 * 1024
    );

    const mapped = allowed.map((file) => ({
      file,
      status: "uploaded",
    }));

    
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-[#171a23]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl shadow-black/30w-full  outline outline-1 outline-neutral-50/10 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="p-6 border-b border-neutral-50/10">
        <div className="flex items-center gap-3 mb-2">
          <UploadCloud className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-bold text-white font-hk">
            Upload Production Proofs
          </h2>
        </div>

        <p className="text-sm text-neutral-400 font-hk max-w-2xl">
          Client requires photo proof of the first printed unit before proceeding
          with remaining installation.
        </p>
      </div>

      {/* Upload Area */}
      <div className="p-6">
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}
          className="w-full border-2 border-dashed border-neutral-600 hover:border-purple-500 transition-all rounded-xl py-12 px-6 flex flex-col items-center justify-center text-center cursor-pointer bg-[#1e2230]"
        >
          <UploadCloud className="w-10 h-10 text-neutral-400 mb-4" />

          <p className="text-white font-semibold">
            Click to upload photos or drag and drop
          </p>

          <p className="text-sm text-neutral-400 mt-1">
            PNG, JPG up to 10MB (Required: Front, Back, Both Sides)
          </p>

          <input
            ref={inputRef}
            type="file"
            multiple
            hidden
            accept="image/png,image/jpeg"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      </div>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="px-6 pb-6 flex flex-col gap-3">
          {files.map((item, index) => (
            <div
              key={index}
              className="w-full p-4 rounded-lg bg-neutral-900/60 border border-neutral-700 flex items-center justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-neutral-700 rounded-md">
                  <ImageIcon className="w-4 h-4 text-white" />
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-white truncate max-w-xs sm:max-w-sm md:max-w-md">
                    {item.file.name}
                  </span>

                  {item.status === "uploaded" ? (
                    <span className="text-xs text-green-500 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Upload Complete
                    </span>
                  ) : (
                    <span className="text-xs text-red-500">
                      Upload Failed
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleRemove(index)}
                className="p-2 hover:bg-neutral-700 rounded-md transition"
              >
                <X className="w-4 h-4 text-neutral-400 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Footer Button */}
      <div className="p-6 pt-0 flex justify-end">
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 transition rounded-lg text-white font-semibold shadow-md">
          <Send className="w-4 h-4" />
          Submit for Approval
        </button>
      </div>
    </div>
  );
};

export default UploadProductionProofs;