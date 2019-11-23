import React, { useEffect, useState } from 'react';
import firebase, { firestore } from '../firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import useUserContext from '../context/userContext';
import styled from 'styled-components';

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
  }, []);

  return (
    <div>
      {!user && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />}
      <ItemsDiv>
        {PostData.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <ItemDiv>
                <p>{item.text}</p>
              </ItemDiv>
            </React.Fragment>
          );
        })}
      </ItemsDiv>
    </div>
  );
};

const ItemsDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const ItemDiv = styled.div`
  margin: 50px;
`;
export default Login;
