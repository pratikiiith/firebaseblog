import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Home({ isAuth }) {
  
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "post");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  });

  const deletePost = async (id) => {
    const postDoc = doc(db, "post", id);
    await deleteDoc(postDoc);
  };

   return (
    <div className="homePage">
      {postLists.map((postt) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {postt.title}</h1>
              </div>
               <div className="deletePost">
                {isAuth && postt.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(postt.id);
                    }}
                  >
                    {" "}
                    &#128465;
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer"> {postt.postText} </div>
            <h3>@{postt.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
}


export default Home;