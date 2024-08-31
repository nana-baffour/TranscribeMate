"use client";
import { database, storage } from "@/app/utils/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import OpenAI from "openai";
import { useRef, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { CirclesWithBar } from 'react-loader-spinner'


import { toast } from "sonner";

import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import DownloadTextFile from "./DownloadTextFile";

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const fileInputRef = useRef(null);

  const user = getAuth().currentUser;
  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e?.target?.files[0];
    if (file && file.size > 25 * 1024 * 1024) { // 25 MB size limit
      toast.error("File size exceeds the 25MB limit.");
      fileInputRef.current.value = null;
      e.target.value = null;
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
    toast.success("File selected successfully");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.size > 25 * 1024 * 1024) { // 25 MB size limit
      toast.error("File size exceeds the 25MB limit.");
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
    console.log("File dropped:", file.name);
    toast.success("File dropped successfully");
    if (fileInputRef.current) {
      fileInputRef.current.files = e.dataTransfer.files;
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      console.log("No file selected");
      toast.error("No file selected");
      return;
    }
    if (!user) {
      toast.error("Please log in to upload and transcribe files");
      router.push("/login");

      return;
    }

    try {
      // Uploads the file to Firebase Storage
      const storageRef = ref(storage, `files/${selectedFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload error:", error);
        },
        async () => {
          // This part generates the download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);

          // This part handles the AI transcription
          const openai = new OpenAI({
            apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true,
          });


          setIsTranscribing(true);
          const translation = await openai.audio.translations.create({
            file: selectedFile,
            model: "whisper-1",
            response_format: "verbose_json",
            timestamp_granularities: ["word"],
          });


          await addDoc(collection(database, "transcriptions"), {
            userId: user.uid,
            name: selectedFile.name,
            url: downloadURL,
            size: (selectedFile.size / 1024).toFixed(2),
            date: new Date(),
            segments: JSON.stringify(translation.segments),
            fileType: selectedFile.type,
            text: translation.text,
          });
          setTranscription(translation.text);
          setIsTranscribing(false);
          toast.success("Transcription successful!");
          setSelectedFile(null);

        }
      );
    } catch (err) {
      console.error("Error during submission:", err);
      toast.error("Error during submission");
      setIsTranscribing(false);
    }
  };

  const downloadTranscription = () => {
    if (transcription) {
      const blob = new Blob([transcription], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "transcription.txt";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className='px-4 md:px-8 lg:px-16'>
      <div
        className='border-dashed border-2 border-gray-400 mx-auto p-4 md:p-5 text-white mt-6 lg:px-20 rounded-md'
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <form onSubmit={handleSubmit} className='flex flex-col items-center'>
          {!isTranscribing && <>

            <p className='text-gray-600 text-lg mb-4 flex flex-col items-center'>
              <MdCloudUpload className='text-6xl md:text-9xl text-blue-950 mb-2' />
              Drag and drop your file here or click to select
            </p>

            <p className='text-black mt-1 opacity-50'>OR</p>

            <input
              type='file'
              max={25 * 1024 * 1024}
              onChange={handleFileChange}
              accept='audio/*,video/*'
              name='file'
              ref={fileInputRef}
              className='bg-blue-950 text-white font-bold rounded md:px-2 md:py-1 sm:text-sm mt-2 px-4 py-2 text-center'
            />
            <p className='text-black mt-2 opacity-50'>OR</p>
            {/* <input
              type='search'
              name=''
              placeholder='Enter URL to import audio'
              id='search'
              className='border text-xs w-[60%] py-2 pl-1'
              onChange={()=>{}}
            /> */}

            <div className='w-full text-center mt-6'>
              <button
                type='submit'
                className='border text-sm py-2 px-6 ml-1 text-black opacity-80 hover:bg-teal-300 hover:border-blue-950 hover:text-blue-950 hover:font-bold rounded'
              >
                Transcribe
              </button>
            </div>
          </>}


          {selectedFile && (
            <div className='mt-4 text-center text-gray-500'>
              <p className='font-bold mb-2'>Selected File:</p>
              <p>{selectedFile.name}</p>
            </div>
          )}

          {!isTranscribing && uploadProgress > 0 && (
            <div className='mt-4 text-center'>
              <p className='text-black'>
                Upload Progress: {Math.round(uploadProgress)}%
              </p>
            </div>
          )}
          {isTranscribing &&
            <>
              <p className="text-blue-950 mb-4">Transcribing... Please wait</p>
              <CirclesWithBar
                height="50"
                width="50"
                color="#5eead4"
                outerCircleColor="#172554"
                innerCircleColor="#5eead4"
                barColor="#5eead4"
                ariaLabel="circles-with-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </>

          }
          {transcription && (
            <div className='mt-4 text-center'>
              <p className='font-bold mb-2 text-black'>Transcription:</p>
              <p className='text-black'>{transcription}</p>
            </div>
          )}
        </form>
        {!isTranscribing && <p className='text-black text-center mt-3 text-xs opacity-50'>
          Support file formats: .mp3, .mov, .wmv, .mp4, .wav, .wa4,
        </p>
        }
      </div>
      <DownloadTextFile transcription={transcription} />
    </div>
  );
};

export default FileUploader;
