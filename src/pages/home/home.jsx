import { useState } from "react";
import Space from "../../components/space";
import "./home.css";

export default function Home() {
  const [selectedMainFile, setSelectedMainFile] = useState(null);
  const [selectedSideFiles, setSelectedSideFiles] = useState(null);

  const [loading, setLoading] = useState(false);

  const [unifiedFile, setUnifiedFile] = useState([]);

  const handleMainFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedMainFile(file);
  };

  const handleSideFilesChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to array
    setSelectedSideFiles(files);
  };

  const handleSetUnifierFile = async (file) => {
    setUnifiedFile(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const file = [];

    file.push(selectedMainFile);
    file.push(...selectedSideFiles);

    await handleSetUnifierFile(file);

    // console.log(unifiedFile);
    // alert("Yo");

    // Assuming your API endpoint is at 'http://localhost:3000/upload'
    const formData = new FormData();

    for (const file of unifiedFile) {
      formData.append("images", file); // Adjust field name if needed
    }

    try {
      // const url = `http://localhost:3005/api/v1/imageProcess/collage`;

      // const url = `https://twitter-image-collager.osc-fr1.scalingo.io/api/v1/imageProcess/collage`;

      const url = `https://twitter-image-collagend.onrender.com/api/v1/imageProcess/collage`;
      console.log(url);
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Files uploaded successfully!");

        const zipBlob = await response.blob();
        const downloadUrl = URL.createObjectURL(zipBlob);

        // Simulate a click on a hidden anchor tag to trigger download
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "collage.zip"; // Set a default filename
        link.style.display = "none"; // Hide the anchor tag
        document.body.appendChild(link);
        link.click();

        // Revoke the temporary URL after download (optional)
        setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
        // Handle successful upload (e.g., clear state, display message)
      } else {
        console.error("Error uploading files:", response.statusText);
        // Handle upload error
        const res = await response.json();
        if (res.body.message) {
          alert(`${res.body.message}`);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error during upload:", error);
      alert(`Please try again!`);
      setLoading(false);

      // Handle general error
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="ui container">
          <Space height="1rem" />

          <h1 className="header">Here from twitter?💀</h1>

          {loading && (
            <div className="ui segment">
              <div
                className="ui active dimmer"
                style={{ height: "100vh !important" }}
              >
                <div className="ui indeterminate text loader">
                  Processing Images, Please wait for 5 minutes
                </div>
              </div>
              <p></p>
            </div>
          )}

          <Space height="1rem" />

          <div className="ui info message">
            <div className="ui icon message">
              <i className="download icon"></i>
              <div className="content">
                <div className="header">Upload Main Image</div>
                <p>Please upload just one(1) main image.</p>
                <input
                  type="file"
                  accept="image/*"
                  required
                  id="files"
                  onChange={handleMainFileChange}
                ></input>
              </div>
            </div>

            <div className="ui icon message">
              <i className="download icon"></i>
              <div className="content">
                <div className="header">Upload Side Images</div>
                <p>Please upload exactly eight(8) side images.</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  required
                  id="files"
                  onChange={handleSideFilesChange}
                ></input>
              </div>
            </div>
            <div className="header">Acceptable File Types</div>
            <ul className="list">
              <li>JPEG</li>
              <li>PNG</li>
              <li>JPG</li>
              <li>BMP</li>
            </ul>
            <Space height="0.5rem" />
            <div>
              Omo abeg check image size before you upload (Limit: 5mb per image
              abeg)
            </div>
          </div>

          <button className="button-57" type="submit">
            <span className="text">Generate Image Collage</span>
            <span>Start Download</span>
          </button>

          <Space height="2rem" />

          <div className="ui warning message">
            <div className="header">Useful Tips!</div>
            <ul className="list">
              <li>
                Crop your main pic to fit the frame! It'll be the star of the
                show! ✨
              </li>
              <li>
                Unzip downloaded folder to get 4 appropriately sized images
              </li>
            </ul>
          </div>

          <Space height="2rem" />
        </div>
        <div className="ui segment ">
          {" "}
          <h5
            style={{ textAlign: "center", color: "gray", fontWeight: "normal" }}
          >
            Copyright &#169; TonyDevs 2024
          </h5>
        </div>
      </form>
    </>
  );
}
