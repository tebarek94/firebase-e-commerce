import React, { useState } from "react";
import { storage } from "../config/firebaseConfig";
import { ref, uploadBytesResumable } from "firebase/storage";

function AddProductImage() {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const storageRef = ref(storage, `product-images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress function
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        // Error function
        console.error("Upload error:", error);
        alert("Failed to upload file.");
      },
      () => {
        // Complete function
        alert("File uploaded successfully!");
        console.log("Upload complete");
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default AddProductImage;
