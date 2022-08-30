import React, { useState } from 'react';
import { triggerOnEnter } from '../../utils';
import imgMissing from '../../images/imgMissing.svg';

const FileInput = ({ value, setValue, alert, setAlert, name }) => {
  const [dragging, setDragging] = useState(false);
  const [image, setImage] = useState(value ? URL.createObjectURL(value) : null);

  const wrapperClasses = () => {
    let initialClass = 'file-drop';
    if (dragging) {
      initialClass += ' dragover';
    }
    if (alert) {
      initialClass += ' alert';
    }
    return initialClass;
  };

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
        setValue(blob);
        setImage(URL.createObjectURL(blob));
      });
      e.dataTransfer.clearData();
      dragCounter = 0;
      setAlert(false);
    }
  };

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      newFile.arrayBuffer().then((buf) => {
        const blob = new Blob([buf], { type: 'image/png' });
        setValue(blob);
        setImage(URL.createObjectURL(blob));
      });
      setAlert(false);
    }
  };

  const fileRemove = () => {
    setImage(null);
    setValue(null);
  };

  if (value) {
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
      className={wrapperClasses()}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <img className="imgInputAlert" src={imgMissing} alt="" />
      <p>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>
      <label htmlFor={name} tabIndex="0" onKeyPress={triggerOnEnter}>
        ატვირთე
        <input
          id={name}
          type="file"
          value=""
          onChange={onFileDrop}
          name={name}
          tabIndex="-1"
        />
      </label>
    </div>
  );
};

export default FileInput;
