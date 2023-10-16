import { useState } from "react";

export function ImageInput(props : {onSelect : (img : File) => void}) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const displayImg = (e : React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      props.onSelect(e.target.files[0]);
    }
  };

  return (
    <div>
      <label>
        📸 Upload Img
        <input type="file" onChange={displayImg} accept="image/*" />
      </label>
      {selectedImage && <img src={URL.createObjectURL(selectedImage)} />}
    </div>
  )
}