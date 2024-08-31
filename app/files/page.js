"use client";

import { database } from "@/app/utils/firebaseConfig";
import FileUploader from "@/components/FileUploader";
import { getAuth } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoMdSearch, IoMdShare } from "react-icons/io";
import {
  IoCloudDownload,
  IoCloudUploadOutline,
  IoPause,
  IoPlay,
  IoTrash,
} from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { PiWaveformBold } from "react-icons/pi";
import { toast } from "sonner";

const UploadAudioPage = () => {
  const [expandedTranscriptId, setExpandedTranscriptId] = useState(null);
  const [transcriptions, setTranscriptions] = useState([]);
  const [filteredTranscriptions, setFilteredTranscriptions] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const mediaRef = useRef(null);

  const user = getAuth().currentUser;
  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleTranscript = (id) => {
    setExpandedTranscriptId((prevId) => (prevId === id ? null : id));
  };

  const playMedia = (url, id, fileType) => {
    if (typeof window === "undefined") return; // Guard against server-side execution

    if (currentlyPlaying === id) {
      mediaRef.current?.pause();
      setCurrentlyPlaying(null);
    } else {
      mediaRef.current?.pause();
      if (fileType.startsWith("video")) {
        mediaRef.current = document.getElementById(`video-${id}`);
      } else {
        mediaRef.current = new Audio(url);

      }
      mediaRef.current?.play();
      setCurrentlyPlaying(id);

      mediaRef.current.addEventListener("timeupdate", () => {
        console.log(mediaRef.current.currentTime);
        setCurrentTime(mediaRef.current.currentTime);
      });
    }
  };

  const shareAudio = async (url, text) => {
    const shareText = `Audio URL: ${url}\n\nTranscript: ${text}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Shared Audio and Transcript",
          text: shareText,
        });
      } catch (err) {
        console.error("Error sharing:", err);
        // toast.error("Error sharing");
      }
    } else {
      navigator.clipboard.writeText(shareText).then(
        () => {
          toast.success("Audio URL and transcript copied to clipboard");
        },
        () => {
          // toast.error("Failed to copy audio URL and transcript");
        }
      );
    }
  };

  // useEffect(() => {
  //   if (!user || Cookies.get("isAuth")) {
  //     router.push("/login");
  //   }
  // }, [user, router]);

  const downloadTranscript = (text, fileName) => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const collectionRef = collection(database, "transcriptions");
    const q = query(collectionRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(
      q,
      (data) => {
        const sortedTranscriptions = data.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => a.date.toDate() - b.date.toDate()); // Sort in ascending order

        setTranscriptions(sortedTranscriptions);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [user]);

  const deleteRecording = async (id) => {
    if (window.confirm("Are you sure you want to delete this recording?")) {
      try {
        await deleteDoc(doc(database, "transcriptions", id));
        toast.success("Recording deleted successfully");
      } catch (error) {
        console.error("Error deleting document: ", error);
        toast.error("Failed to delete recording");
      }
    }
  };

  const isSegmentActive = (transcriptionId, start, stop) => {
    if (currentlyPlaying !== transcriptionId) return false;
    return currentTime >= start && currentTime <= stop;
  };


  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = transcriptions.filter((t) =>
      t.text.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredTranscriptions(filtered);
  }, [searchQuery, transcriptions]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  return (
    <div className='max-w-screen-xl mx-auto p-8 min-h-[80vh]'>
      <div className='flex items-center justify-between mb-16'>
        <h2 className='text-xl font-semibold'>
          Recordings ({transcriptions.length})
        </h2>
        <div className="bg-gray-100 px-4 py-2 rounded-md relative">
          <input
            type="text"
            placeholder="Search Transcripts"
            value={searchQuery}
            onChange={handleSearchChange}
            className="outline-none border-none bg-transparent w-full"
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <IoMdSearch height={20} width={20} />
          </span>
        </div>


        <button className='btn btn-outline hover:text-white' onClick={openModal}>
          <IoCloudUploadOutline />
          Upload file
        </button>
      </div>
      {filteredTranscriptions.length === 0 && !loading && !error && (
        <div className='text-center'>
          <h2 className='text-xl font-semibold'>No recordings yet</h2>
          <p className='text-sm'>Upload an audio file to get started</p>
        </div>
      )}
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {filteredTranscriptions.map((t) => (
          <div className='w-full' key={t.id}>
            <div className='w-full mb-2 group transition-all aspect-video relative bg-gray-200 rounded-xl overflow-hidden'>
              {t.fileType.startsWith("video") ? (
                <video

                  id={`video-${t.id}`}
                  src={t.url}
                  className='w-full h-full object-cover'
                />
              ) : (
                <span className='absolute group-hover:opacity-0 duration-300 transition-all top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                  <PiWaveformBold className='size-16 text-blue-950' />
                </span>
              )}
              <div className='absolute inset-0 flex items-center  px-4 justify-center opacity-0 group-hover:opacity-100 gap-4 transition-all duration-300 bg-black bg-opacity-50 pointer-events-none *:pointer-events-auto'>
                <button
                  className='btn btn-outline text-white hover:text-white'
                  onClick={() => playMedia(t.url, t.id, t.fileType)}
                >
                  {currentlyPlaying === t.id ? <IoPause /> : <IoPlay />}
                  {currentlyPlaying === t.id ? "Pause" : "Play"}
                </button>
                <button
                  className='btn btn-primary text-white'
                  onClick={() => {
                    downloadTranscript(t.text, `transcript_${t.id}.txt`);
                    toast.success("Downloaded successfully");
                  }}
                >
                  <IoCloudDownload />
                  Download
                </button>
                <button
                  className='btn btn-error text-white'
                  onClick={() => deleteRecording(t.id)}
                >
                  <IoTrash />
                  Delete
                </button>
              </div>
            </div>
            <p className='font-semibold'>
              {t.fileType.startsWith("video") ? "Video" : "Audio"}
            </p>
            <p className='text-sm mb-1'>
              {expandedTranscriptId === t.id ? (<>
                {t?.segments ? JSON.parse(t.segments).map((s, i) => {
                  console.log(s)
                  return <span className={`${isSegmentActive(t.id, s.start, s.end)
                    ? "bg-green-500 text-white"
                    : ""
                    }`}>{s?.text}</span>
                }) : t.text}
              </>) : t.text.slice(0, 30)}...{" "}
              <span
                className='text-blue-500 cursor-pointer'
                onClick={() => toggleTranscript(t.id)}
              >
                {expandedTranscriptId === t.id
                  ? "show less"
                  : "view transcript"}
              </span>
            </p>
            <div
              className='flex items-center gap-2 text-xs text-gray-600 cursor-pointer'
              onClick={() => shareAudio(t.url, t.text)}
            >
              <IoMdShare />
              {new Date(t.date.toDate()).toDateString()}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300 ease-in-out'>
          <div className='bg-white p-8 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto transition-all duration-300 ease-in-out'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-bold'>Upload Audio File</h2>
              <button
                className='size-8 rounded-full bg-gray-300 flex items-center justify-center'
                onClick={closeModal}
              >
                <MdClose />
              </button>
            </div>
            <FileUploader />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadAudioPage;
