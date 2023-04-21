import "./index.css";
import React, { useEffect, useState } from "react";
//import chrome from 'chrome';
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";
import { firebaseConfig } from "./config/firebase";
import { tab } from "@testing-library/user-event/dist/tab";
import docLogo from "./Ansa-white-logo.png";

function App() {
  const [user, setUser] = useState(undefined);
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);

  async function getCurrentTab() {
    return new Promise((resolve, reject) => {
      //eslint-disable-next-line no-undef
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0) {
          resolve(tabs[0]);
        } else {
          reject(new Error("No active tab found."));
        }
      });
    });
  }

  async function loadUrl() {
    const tab = await getCurrentTab();
    const url = tab.url;
    localStorage.setItem("url", url);
    //eslint-disable-next-line no-undef
    chrome.runtime.sendMessage({ url: url });
    console.log(url);
  }

  useEffect(() => {
    loadUrl();
  }, []);

  
 

  const signIn = (e) => {
    e.preventDefault();
    //eslint-disable-next-line no-undef
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      //eslint-disable-next-line no-undef
      if (chrome.runtime.lastError || !token) {
        //eslint-disable-next-line no-undef
        alert(
          //eslint-disable-next-line no-undef
          `SSO ended with an error: ${JSON.stringify(chrome.runtime.lastError)}`
        );
        return;
      }
      signInWithCredential(auth, GoogleAuthProvider.credential(null, token))
        .then((res) => {
          console.log("signed in!");
        })
        .catch((err) => {
          alert(`SSO ended with an error: ${err}`);
        });
    });
    console.log("signing in..." + user + window.location.href);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user && user.uid ? user : null);
    });
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, do something with the user object
        setUser(user);
      } else {
        // User is not signed in, sign them in automatically
        //eslint-disable-next-line no-undef
        chrome.identity.getAuthToken({ interactive: true }, (token) => {
          //eslint-disable-next-line no-undef
          if (chrome.runtime.lastError || !token) {
            //eslint-disable-next-line no-undef
            alert(
              `SSO ended with an error: ${JSON.stringify(
                //eslint-disable-next-line no-undef
                chrome.runtime.lastError
              )}`
            );
            return;
          }
          signInWithCredential(auth, GoogleAuthProvider.credential(null, token))
            .then((res) => {
              console.log("signed in!");
            })
            .catch((err) => {
              alert(`SSO ended with an error: ${err}`);
            });
        });
      }
    });
  }, []);

  if (undefined === user) return <h1>Loading...</h1>;
  if (user != null)
    return (
      <div>
        <div className="text-and-logo">
          <img src={docLogo} alt="logo" />
          <h1>Ansa</h1>
        </div>
        <hr />
        <button
          id="button1"
          onClick={() => {
            //eslint-disable-next-line no-undef
            chrome.windows.create({
              url: "popup.html",
              width: 250,
              height: 500,
              //eslint-disable-next-line
              left: screen.width / 2 - 300 / 2,
              //eslint-disable-next-line
              top: 0,
            });
          }}
        >
          Add to Sequence
        </button>
        <button
          id="button2"
          onClick={() =>
            //eslint-disable-next-line no-undef
            chrome.runtime.sendMessage({ event: "print" })
          }
        >
          DocSend to PDF
        </button>
        <button id="button3">--- TBD ----</button>
      </div>
    );
}

export default App;
