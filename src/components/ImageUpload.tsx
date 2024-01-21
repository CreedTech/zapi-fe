import React, { ChangeEvent, DragEvent, SetStateAction, useState } from "react";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import { FiTrash } from "react-icons/fi";

interface IUploadProps {
  setImageFile: (file: File | ArrayBuffer | string) => SetStateAction<any>;
}

const ImageUpload: React.FC<IUploadProps> = ({ setImageFile }) => {
  const [previewURL, setPreviewURL] = useState<string | ArrayBuffer | null>(
    null
  );
  const [dragActive, setDragActive] = useState<boolean>(false);
  const classes = useStyles();

  const handleFile = (file: File) => {
    if (!file) return;
    const { type } = file;
    if (type === "image/png" || type === "image/jpg" || type === "image/jpeg") {
      const fileReader = new FileReader();
      fileReader.onload = () => setPreviewURL(fileReader.result);
      fileReader.readAsDataURL(file);
    } else return toast.error("Wrong file type");
    setImageFile(file);
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (!e.dataTransfer?.files) return;
    let pickedFile = e.dataTransfer.files[0];
    handleFile(pickedFile);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return;
    let pickedFile = e.currentTarget.files[0];
    handleFile(pickedFile);
  };

  return (
    <div className={classes.container}>
      {previewURL === null ? (
        <label className={classes.label}>
          <p>Drag & drop or click to upload file</p>
          <i>.png, .jpg, .jpeg, .svg & .gif only.</i>
          {dragActive && <p>Drop files here</p>}
          <input
            type="file"
            draggable
            onChange={handleChange}
            onDragEnter={handleDrag}
            onDragLeave={handleDrop}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          />
        </label>
      ) : (
        <div className={classes.wrapper}>
          <img src={`${previewURL}`} alt="" />
          <button onClick={() => setPreviewURL(null)}>
            <FiTrash />
          </button>
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    background: "#ccc",
  },
  label: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    position: "relative",
    fontSize: "0.75rem",
    "& p": {
      width: "70%",
      textAlign: "center",
    },
    "& input": {
      width: "100%",
      height: "120%",
      display: "hidden",
      position: "absolute",
      top: -35,
      left: 0,
      cursor: "pointer",
    },
  },
  wrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    "& button": {
      width: "1.5rem",
      height: "1.5rem",
      display: "grid",
      placeItems: "center",
      borderRadius: "50%",
      border: "none",
      position: "absolute",
      top: 5,
      left: 5,
      background: "#FFF",
      color: "#081F4A",
      fontSize: "0.75rem",
      cursor: "pointer",
    },
  },
});

export default ImageUpload;
