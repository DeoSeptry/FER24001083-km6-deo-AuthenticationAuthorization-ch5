import axios from "axios";
import Navbar from "./komponen/navbar";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlay, FaPauseCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getQuranDetail, getTerjemahan } from "./redux/action/dataAction";
import {
  setDetail,
  setSurahId,
  setBahasa,
  setArti,
} from "./redux/reducer/dataReducer";

export default function QuranDetail() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const surah = useSelector((state) => state.data.surah);
  const id = useSelector((state) => state.data.surahId);
  const arti = useSelector((state) => state.data.arti);
  console.log("id", id);
  const [audioStates, setAudioStates] = useState({});

  const detail = useSelector((state) => state.data.detail);

  console.log("titit", detail);

  useEffect(() => {
    dispatch(getQuranDetail());
    dispatch(getTerjemahan());
  }, []);

  const stopAudio = (audioUrl) => {
    audioStates[audioUrl].pause();
  };

  useEffect(() => {
    return () => {
      if (Object.keys(audioStates).length !== 0) {
        stopAudio(Object.keys(audioStates)?.[0]);
      }
    };
  }, []);

  const toggleAudio = (audioUrl) => {
    if (isLoggedIn()) {
      console.log("det", audioStates);

      const audio = new Audio(audioUrl);
      const isPlaying = !!audioStates[audioUrl];
      //kondisi untuk pause jika audio play dan tidak pause
      if (isPlaying && !audioStates[audioUrl].paused) {
        audioStates[audioUrl].pause();
      }
      //jika audio tidak beruputar
      else {
        // Stop semua audio
        Object.values(audioStates).forEach((audio) => audio.pause());
        //play audio
        audio.play();
        audioStates[audioUrl] = audio;
      }

      setAudioStates({ ...audioStates });
    } else {
      alert("Anda harus login terlebih dahulu");
      navigate("/login");
    }
  };

  const cekToken = useSelector((state) => state.login.token);
  const isLoggedIn = () => {
    // return localStorage.getItem("token") !== null;
    return cekToken !== null;
  };

  const handleLanguage = (event) => {
    const selectedLanguage = event.target.value;
    dispatch(setBahasa(selectedLanguage)); // Pass the selected language as payload
    window.location.reload();
    console.log("languageState", selectedLanguage);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.reload();
  };
  return (
    <div className=" bg-[#0C121F]">
      <Navbar />

      <div className="mx-96 mb-20 mt-10 text-gray-200 mt">
        {/* pilih bahasa terjemahan */}
        <div className="flex justify-between items-center">
          <form>
            <select
              onChange={handleLanguage}
              value={""}
              className="select-cst bg-gray-800 rounded-xl"
            >
              <option value="" disabled hidden>
                Language
              </option>
              <option value="en.sarwar">English</option>
              <option value="id.indonesian">Indonesian</option>
            </select>
            {/* <button type="submit">submit</button> */}
          </form>
          <div className="flex flex-col items-center gap-2">
            {/* <div className="font-semibold text-2xl">{detail?.name}</div> */}
            <div className="text-xl font-semibold">{detail?.englishName}</div>
            <div className="text-l">{detail?.englishNameTranslation}</div>
          </div>
          <div className="text-xl">{detail?.name}</div>
        </div>
        <div className=" flex justify-center">
          <p className="  text-3xl font-semibold py-6 px-10 bg-blue-500 mt-7 rounded-2xl w-96">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
        </div>
        <div className="flex justify-between gap-3 mt-10 ">
          <div className="flex flex-col gap-4 bg-gray-800 rounded-xl w-[80%]">
            {detail?.ayahs?.map((surat, index) => {
              console.log("auuuu", Object.keys(surat?.audio)[0]);
              return (
                <div
                  key={surat?.number}
                  className="border-b-2 border-gray-500 px-4 py-3  "
                >
                  <div className="flex justify-between py-4">
                    <div className="font-semibold text-xl">
                      {surat?.numberInSurah}
                    </div>
                    <div className="flex flex-col">
                      <div className="text-right text-2xl">{surat?.text}</div>
                    </div>
                  </div>
                  <div className="flex justify-between gap-5 mt-5">
                    <div className="text-justify text-l text-gray-400">
                      {arti?.ayahs[index]?.text}
                    </div>
                    <button
                      onClick={() => toggleAudio(surat?.audio)}
                      // disabled={!isLoggedIn()}
                      className=""
                    >
                      {isLoggedIn() &&
                      audioStates[surat.audio] &&
                      !audioStates[surat.audio].paused ? (
                        <FaPauseCircle />
                      ) : (
                        <FaPlay />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className=" flex flex-col  gap-1  overflow-y-auto w-[20%]  h-screen rounded-2xl ">
            {surah.map((e) => (
              <div
                className="  py-2 px-2 flex justify-between items-center bg-gray-800 hover:bg-gray-600"
                key={e?.number}
                onClick={() => {
                  dispatch(setSurahId(e?.number)), dispatch(getTerjemahan());
                  window.location.reload();
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-xl w-5 text-center font-semibold">
                    {e?.number}
                  </div>
                  <div>
                    <div className="font-semibold">{e?.englishName}</div>
                    <div className="text-sm text-gray-400">
                      {e?.revelationType} . {e?.numberOfAyahs} ayat
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
