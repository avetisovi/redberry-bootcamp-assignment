import React, { useState } from 'react';
import { triggerOnEnter } from '../../utils';
import imgMissing from '../../images/imgMissing.svg';
import imgUpload from '../../images/imgUpload.svg';
import tickIcon from '../../images/tick.svg';

const FileInput = ({
  value,
  setValue,
  alert,
  setAlert,
  name,
  imgName,
  setImgName,
  imgSize,
  setImgSize
}) => {
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

  // handling image dropping
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
    // if dragging file
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFile = e.dataTransfer.files[0];
      // settting image size
      if (newFile.size / 1000000 > 1) {
        setImgSize(`${Math.round(newFile.size / 1000000)} mb`);
      } else if (newFile.size / 1000000 < 1) {
        setImgSize(`${Math.round(newFile.size / 1000)} kb`);
      }

      // setting image name
      setImgName(newFile.name);

      // setting image
      newFile.arrayBuffer().then((buf) => {
        const blob = new Blob([buf], { type: 'image/png' });
        setValue(blob);
        setImage(URL.createObjectURL(blob));
      });

      // clearing cache
      e.dataTransfer.clearData();
      dragCounter = 0;
      setAlert(false);
    }
  };

  // uploading image from input
  const onFileDrop = (e) => {
    fileRemove();
    const newFile = e.target.files[0];
    if (newFile) {
      // setting image size
      if (newFile.size / 1000000 > 1) {
        setImgSize(`${Math.round(newFile.size / 1000000)} mb`);
      } else if (newFile.size / 1000000 < 1) {
        setImgSize(`${Math.round(newFile.size / 1000)} kb`);
      }

      // setting image name
      setImgName(newFile.name);

      // setting image
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

  // if image is uploaded
  if (value) {
    return (
      <div className="file-drop__uploaded">
        <div
          className="file-drop"
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <img className="file-drop__img" src={image} alt="laptop" />
        </div>
        <div className="file-drop__img-options">
          <div className="file-drop__img-stats">
            <img src={tickIcon} alt="uploaded" />
            <h3 className="file-drop__img-name">{imgName},</h3>
            <p className="file-drop__img-size">{imgSize}</p>
          </div>
          <label htmlFor={name} tabIndex="0" onKeyPress={triggerOnEnter}>
            ????????????????????? ????????????????????????
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
      </div>
    );
  }

  // if image is not uploaded
  return (
    <div
      className={wrapperClasses()}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="bigScreen">
        <img className="imgInputAlert" src={imgMissing} alt="" />
        <p>?????????????????? ?????? ????????????????????? ???????????????????????? ????????????</p>
        <label htmlFor={name} tabIndex="0" onKeyPress={triggerOnEnter}>
          ?????????????????????
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
      <div className="smallScreen">
        <label htmlFor={name} tabIndex="0" onKeyPress={triggerOnEnter}>
          <img src={imgUpload} alt="" />
          <p>???????????????????????? ??????????????? ????????????????????????</p>
          <input
            id={name}
            type="file"
            value=""
            onChange={onFileDrop}
            name={name}
            tabIndex="-1"
          />
          <img className="imgInputAlert" src={imgMissing} alt="" />
        </label>
      </div>
    </div>
  );
};

export default FileInput;
