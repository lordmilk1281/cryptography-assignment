import React, { DragEvent, useRef } from "react";

type Props = {
  onInput: Function;
  accept?: string;
};

const UploadFile = ({ onInput, accept = "" }: Props) => {
  const fileInputField = useRef<HTMLInputElement>(null);

  const dragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const dragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const dragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      onInput(event.target.files[0]);
    }
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    if (files && files.length > 0) {
      onInput(files[0]);
    }
  };

  const defaultClick = () => {
    if (fileInputField.current) {
      fileInputField.current.click();
    }
  };

  return (
    <div
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={onDrop}
      onClick={defaultClick}
      className="bg-neutral-50 border border-dashed border-gray-300 py-10 rounded-lg cursor-pointer"
    >
      <input
        type="file"
        accept={accept}
        ref={fileInputField}
        onChange={onChange}
        className="hidden"
      />
      <label className="text-gray-500 w-full flex gap-x-1 text-xs font-medium justify-center">
        Drag & Drop or<span className="underline text-red-500">browse</span>
      </label>
    </div>
  );
};

export default UploadFile;
