"use client";
import Image from "next/image";
import Link from "next/link";
import { FcMindMap } from "react-icons/fc";

import { motion } from "framer-motion";
import {
  MdDoneAll,
  MdFileCopy,
  MdLanguage,
  MdPrivacyTip,
  MdWebAsset,
} from "react-icons/md";
import AudioToTextImg from "./AudioToText.png";
import AudioTrial from "./AudioTrial.png";
import downloadImg from "./download.png";
import heroImg from "./hero.webp";
import uploadImg from "./importImg.png";
import LangImg from "./LangImg.png";

const HomePage = () => {
  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4 z-999'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-center md:text-left'
            >
              <h1 className='text-4xl md:text-6xl font-bold text-blue-950 mb-6'>
                AI Audio Transcriber
              </h1>

              <p className='text-lg md:text-xl text-gray-700 mb-8'>
                Transcribe audio and videos to text with 99% accuracy.
                <br className='hidden md:inline' />
                Available in 100+ languages and free of charge.
              </p>
              <Link
                href='/login'
                className='bg-blue-950 hover:opacity-90 py-3 md:py-4 px-8 md:px-12 capitalize rounded font-bold text-sm md:text-md my-8 md:my-12 text-white'
              >
                Get Started
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='mt-8 md:mt-0'
            >
              <div className='relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-2xl '>
                <Image
                  src={heroImg}
                  alt='AI Audio Transcriber'
                  layout='fill'
                  objectFit='cover'
                  className='rounded-lg '
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Technique */}
      <div className='max-w-full md:max-w-[80%] mx-auto min-h-screen text-center px-4'>
        <h1 className='font-extrabold text-2xl md:text-4xl py-8 md:py-16'>
          Convert audio and video to text in 3 steps
        </h1>

        {/* steps */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-14'>
          {/* first step */}
          <div className='flex flex-col items-center'>
            <Image
              src={uploadImg}
              className='w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded'
              alt='import img'
            />
            <h1 className='font-bold text-md sm:text-lg md:text-xl py-4 md:py-6'>
              1. Upload a file
            </h1>
            <p className='text-xs sm:text-sm md:text-base'>
              Click the ‘choose file’ to browse or drag and drop your file.
            </p>
          </div>

          {/* second step */}
          <div className='flex flex-col items-center'>
            <Image
              src={AudioToTextImg}
              className='w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded'
              alt='audio to text img'
            />
            <h1 className='font-bold text-md sm:text-lg md:text-xl py-4 md:py-6'>
              2. Convert audio or video to text
            </h1>
            <p className='text-xs sm:text-sm md:text-base'>
              Click 'transcribe' to convert audio or video to text.
            </p>
          </div>

          {/* third step */}
          <div className='flex flex-col items-center'>
            <Image
              src={downloadImg}
              className='w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded'
              alt='download img'
            />
            <h1 className='font-bold text-md sm:text-lg md:text-xl py-4 md:py-6'>
              3. Download your transcript
            </h1>
            <p className='text-xs sm:text-sm md:text-base'>
              Once the transcription is done, your transcript can be downloaded
              and shared to your desired destination.
            </p>
          </div>
        </div>

        <Link
          href='/login'
          className='bg-blue-950 hover:opacity-90 py-3 md:py-4 px-8 md:px-12 capitalize rounded font-bold text-sm md:text-md my-8 md:my-12 text-white'
        >
          Transcribe For Free
        </Link>
      </div>

      {/* Key features */}
      <div className='bg-teal-400 pb-12'>
        <h1 className='capitalize text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center pt-8 md:pt-12 text-white'>
          Why use our audio transcriber?
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-[90%] md:max-w-[80%]  '>
          {/* Multiple Languages */}
          <div className='px-4 py-8 mx-4 my-4 border border-blue-950 shadow-lg rounded-lg'>
            <MdLanguage className='text-3xl md:text-4xl mb-2 text-blue-950' />
            <h1 className='capitalize font-bold text-lg md:text-xl my-2'>
              Multiple Languages
            </h1>
            <p className='text-sm md:text-base'>
              Our app supports up to 58 transcription languages, including
              English, German, Spanish, French, Hindi, and much more!
            </p>
          </div>

          {/* Security and Privacy */}
          <div className='px-4 py-8 mx-4 my-4 border border-blue-950 shadow-lg rounded-lg'>
            <MdPrivacyTip className='text-3xl md:text-4xl mb-2 text-blue-950' />
            <h1 className='capitalize font-bold text-lg md:text-xl my-2 text-blue-950'>
              Security and Privacy
            </h1>
            <p className='text-sm md:text-base'>
              We store any files or data you submit here. Also, This website is
              secured with SSL certificates to protect your privacy.
            </p>
          </div>

          {/* Multiple Formats */}
          <div className='px-4 py-8 mx-4 my-4 border border-blue-950 shadow-lg rounded-lg'>
            <MdFileCopy className='text-3xl md:text-4xl mb-2 text-blue-950' />
            <h1 className='capitalize font-bold text-lg md:text-xl my-2 text-blue-950'>
              Multiple Formats
            </h1>
            <p className='text-sm md:text-base'>
              Our app is compatible with many audio and video file formats such
              as WAV, MP3, MP4, MOV, WMV etc.
            </p>
          </div>

          {/* Multiple Platforms */}
          <div className='px-4 py-8 mx-4 my-4 border border-blue-950 shadow-lg rounded-lg'>
            <MdWebAsset className='text-3xl md:text-4xl mb-2 text-blue-950' />
            <h1 className='capitalize font-bold text-lg md:text-xl my-2 text-blue-950'>
              Multiple Platforms
            </h1>
            <p className='text-sm md:text-base'>
              Visit our online audio to text converter from any web browser such
              as Chrome, Safari, Edge, Firefox.
            </p>
          </div>

          {/* High Accuracy */}
          <div className='px-4 py-8 mx-4 my-4 border border-blue-950 shadow-lg rounded-lg'>
            <MdDoneAll className='text-3xl md:text-4xl mb-2 text-blue-950' />
            <h1 className='capitalize font-bold text-lg md:text-xl my-2 text-blue-950'>
              High Accuracy
            </h1>
            <p className='text-sm md:text-base'>
              The accuracy of our voice recognition is constantly improving. For
              high-quality audio, we can deliver a transcription with up to 99%
              accuracy.
            </p>
          </div>

          {/* AI Summary */}
          <div className='px-4 py-8 mx-4 my-4 border border-blue-950 shadow-lg rounded-lg'>
            <FcMindMap className='text-3xl md:text-4xl mb-2 text-blue-950' />
            <h1 className='capitalize font-bold text-lg md:text-xl my-2 text-blue-950'>
              AI Summary
            </h1>
            <p className='text-sm md:text-base'>
              Our transcription tool can analyze and summarize your
              transcription text, providing an automatic AI summary of the
              transcribed conversation.
            </p>
          </div>
        </div>
      </div>

      {/* Try it out information */}
      <div className='max-w-full px-4'>
        <h2 className='text-2xl md:text-4xl font-bold mb-4 text-center pt-12 text-blue-950'>
          We give you our word
        </h2>
        <p className='text-center w-full md:w-[60%] lg:w-[40%] mx-auto mb-6 text-base md:text-xl px-2'>
          Use our AI transcriber as much as you want, to upload directly and
          have your transcriptions done automatically.
        </p>
      </div>

      {/* Try it out information ends */}

      {/* Writes on the mark */}
      <div className='bg-gray-100 py-8 md:py-12'>
        <div className='flex flex-col md:flex-row justify-center md:justify-between items-center px-5 md:px-16 mx-auto w-full md:w-[80%]'>
          <div className='mb-8 md:mb-0 md:mr-8 flex-1'>
            <h1 className='text-blue-950 capitalize font-bold text-xl md:text-3xl mb-4'>
              Writes on the mark.
            </h1>
            <p className='text-base md:text-lg text-gray-700'>
              This robust system ensures unparalleled accuracy and efficiency,
              making it an indispensable tool for professionals and individuals
              alike.
            </p>
          </div>
          <div className='flex justify-center md:justify-end flex-1'>
            <Image
              src={AudioTrial}
              width={450}
              height={500}
              className='rounded-lg shadow-lg'
              alt='Language Img'
            />
          </div>
        </div>
      </div>

      {/* Writes on the mark ends here*/}

      <article className='flex flex-col-reverse md:flex-row justify-around px-5 items-center my-12 md:my-24 mx-auto w-full md:w-[80%]'>
        <Image
          src={LangImg}
          width={450}
          height={250}
          className='rounded mb-4 md:mb-0'
          alt='Language Img'
        />
        <div className='md:pl-10 md:pr-60'>
          <h1 className='text-blue-950 capitalize font-bold text-2xl md:text-3xl mb-2'>
            Native in 100+ languages.
          </h1>
          <p className='text-base md:text-lg'>
            Automatic transcriptions in 100 different languages and idioms,
            multiplied by any accent or regional particulars you throw at it.
          </p>
        </div>
      </article>

      {/* Second Container */}

      <div className='flex flex-col md:flex-row items-center px-5 md:px-10 my-12 md:my-24 mx-auto w-full md:w-[80%]'>
        <div className='text-center md:text-left mb-8 md:mb-0 md:mr-8'>
          <h1 className='text-blue-950 capitalize font-bold text-2xl md:text-3xl mb-4'>
            Swift & free
          </h1>
          <p className='text-base md:text-lg text-gray-700'>
            Starts transcribing as soon as you’re done uploading, so no need to
            wait long.
          </p>
        </div>
        <div className='flex-shrink-0'>
          <Image
            src={LangImg}
            width={450}
            height={250}
            className='rounded-lg shadow-md'
            alt='Language Img'
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
