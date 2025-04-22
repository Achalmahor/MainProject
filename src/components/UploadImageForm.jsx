import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { supabaseClient } from "@/lib/supabaseClient";

const UploadImageForm = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const { getToken } = useAuth();

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const token = await getToken({ template: "supabase" });
    const supabase = supabaseClient(token);

    const { data, error } = await supabase.storage
      .from("company-logos") // your Supabase storage bucket
      .upload(`logos/${file.name}`, file);

    if (error) {
      setMessage("Upload failed: " + error.message);
    } else {
      setMessage("Upload successful!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Company Logo</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadImageForm;
