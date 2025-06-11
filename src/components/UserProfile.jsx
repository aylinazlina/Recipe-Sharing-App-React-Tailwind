import React from "react";
import { MdCloudUpload } from "react-icons/md";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, update,off } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const UserProfile = () => {
  const auth = getAuth();
  const db = getDatabase();
 
  const [profilePic, setProfilePic] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      }
    });
    return () => unsubscribe(); // Clean up listener
  }, [auth]);

  useEffect(() => {
    //todo: checking if cloudinary script is already loaded
    // todo:If cludinary script is not loaded,load it

    if (!window.cloudinary) {
      const script = document.createElement("script");
      script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
      script.async = true;
      script.onload = () => {
        console.log("cloudinary script loaded");
      };
      document.body.appendChild(script);
    }
  }, []);

 //todo:Fetch user profile picture from Firebase Realtime Database
useEffect(() => {
  if (user) {
    const userRef = ref(db, `users/${user.uid}`);
    const listener = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.profilePic) {
        setProfilePic(data.profilePic);
      }
    });

    return () => {
      off(userRef); // Clean up on unmount or user change
    };
  }
}, [user]);

  const uploadImage = () => {
    //todo:checking
    // alert("hi mern!")

    if (window.cloudinary) {
      window.cloudinary.openUploadWidget(
        {
          cloudName: "dfh0f2pmu",
          uploadPreset: "recipe_sharing_app", //google cloudinary
          sources: [
            "local",
            "url",
            "image_search",
            "camera",
            "google_drive",
            "unsplash",
          ],
          googleApiKey: "AIzaSyCL2JoyT5emcSaqWp3X0Iq7eyk7bL6G-jo", //google cloud console
          searchBySites: ["all", "cloudinary.com"],
          searchByRights: true,
        },
        (error, result) => {
          if (error) {
            console.error("Upload error:", error);
          } else if (result && result.event === "success") {
            console.log("Upload successful:", result.info.secure_url);

            const newUrl = result.info.secure_url;
            console.log("Upload successful:", newUrl);

            //update profile pic
            // Update in database
            update(ref(db, `users/${user.uid}`), {
              profilePic: newUrl,
            })
              .then(() => {
                setProfilePic(newUrl); // Update local state
              })
              .catch((err) => {
                console.error("Database update failed:", err);
              });
          }
        }
      );
    } else {
      console.log("upload widget not ready! Please wait ...");
    }
  };

  return (
    <div>
      <div className="w-[50px] h-[50px] bg-green-500 rounded-full mt-5 ml-[92%] relative cursor-pointer group">
        <img
          src={
            profilePic ||
            "https://images.pexels.com/photos/32168086/pexels-photo-32168086/free-photo-of-scenic-mediterranean-village-with-sea-view.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          }
          className="w-full h-full object-fit-cover rounded-full "
        />
        <span
          onClick={uploadImage}
          className="hidden group-hover:block text-[32px] text-white absolute bottom-4 left-2"
        >
          <MdCloudUpload />
        </span>
      </div>
    </div>
  );
};

export default UserProfile;
