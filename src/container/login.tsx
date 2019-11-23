import React, { useEffect, useState } from 'react';
import firebase, { firestore } from '../firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import useUserContext from '../context/userContext';

const Login: React.FC = () => {
  const [PostData, setPostData] = useState<PostData[]>([]);
  const { user } = useUserContext();
  const uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.TwitterAuthProvider.PROVIDER_ID],
  };

  useEffect(() => {
    const getPostData = async () => {
      try {
        const querySnapshot: any = await firestore.collection('post').get();
        const records = querySnapshot.docs.map((elem: any) => elem.data());
        setPostData(records);
      } catch (error) {
        console.log(error);
      }
    };
    getPostData();
  });

  return (
    <div>
      <div>{!user && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />}</div>
      {PostData.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <p>{item.id}</p>
          </React.Fragment>
        );
      })}
      <div></div>
    </div>
  );
};

export default Login;
