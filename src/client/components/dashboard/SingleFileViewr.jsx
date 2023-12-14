import React, { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout/lib";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";

function SingleFileViewr() {
  const workerUrl = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;
  const plugin = defaultLayoutPlugin();

  const { fileId } = useSelector((state) => state.files);
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchFileContent = async () => {
    const url = "http://localhost:3000/user/get-file/" + fileId;
    try {
      setLoading(true);
      const data = await fetch(url);
      const response = await data.json();
      if (response.success) {
        setFileName("fileName.pdf");
        setFileContent(response.url);
      } else {
      }
    } catch (error) {
      setError("there was an error please try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const lastPage = localStorage.getItem(fileName + "_" + fileId);
    if (lastPage) {
      setPageNumber(parseInt(lastPage.pageNumber, 10));
    }
    fetchFileContent();
  }, []);

  const onNavigate = (page) => {
    const data = {
      itemId: fileId,
      pageNumber: page.currentPage,
    };
    const jsonString = JSON.stringify(data);
    localStorage.setItem(fileName + "_" + fileId, jsonString);
  };
  return loading ? (
    <div className='w-full min-h-[80vh] flex justify-center items-center bg-inherit'>
      <SyncLoader color='#48ccbc' size={16} />
    </div>
  ) : (
    <Worker workerUrl={workerUrl}>
      <Viewer
        fileUrl={fileContent}
        renderError={(error) => console.log(error)}
        plugins={[plugin]}
        initialPage={pageNumber}
        onPageChange={onNavigate}
      />
    </Worker>
  );
}

export default SingleFileViewr;
