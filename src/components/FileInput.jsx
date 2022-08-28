import React, { useRef, useState } from 'react';

const FileInput = () => {
  const wrapperRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  let dragCounter = 0;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };
  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter--;
    if (dragCounter > 0) return;
    setDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFile = e.dataTransfer.files[0];
      newFile.arrayBuffer().then((buf) => {
        const blob = new Blob([buf], { type: 'image/png' });
        setImage(URL.createObjectURL(blob));
      });
      setImageFile(newFile);
      e.dataTransfer.clearData();
      dragCounter = 0;
    }
  };

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      newFile.arrayBuffer().then((buf) => {
        const blob = new Blob([buf], { type: 'image/png' });
        setImage(URL.createObjectURL(blob));
      });
      setImageFile(newFile);
    }
  };

  const fileRemove = () => {
    setImage(null);
    setImageFile(null);
  };

  if (imageFile) {
    return (
      <div className="file-drop">
        <img className="file-drop__img" src={image} alt="laptop" />
        <div onClick={fileRemove} className="file-drop__overlay">
          წაშლა
        </div>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={dragging ? 'file-drop dragover' : 'file-drop'}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <p>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>
      <label htmlFor="file-input">
        ატვირთე
        <input id="file-input" type="file" value="" onChange={onFileDrop} />
      </label>
    </div>
  );
};

export default FileInput;
