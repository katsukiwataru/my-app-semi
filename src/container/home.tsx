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
    signInOptions: [firebase.auth.TwitterAuthProvider.PROVIDER_ID],
  };

  const getPostData = async () => {
    try {
      const postQuerySnapshot: any = await firestore.collection('post').get();
      const records = postQuerySnapshot.docs.map((elem: any) => elem.data());
      setPostData(records);
      // let hoge: any = [];
      // records.map((ele: any) => {
      //   const func = async () => {
      //     try {
      //       const QuerySnapshot = await firestore.collection('user').doc(`${ele.id}`);
      //       const records = await QuerySnapshot.get();
      //       const resUser: any = records.data();
      //       hoge.push(resUser.name);
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   };
      //   func();
      // });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <div>
      {!user && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />}
      {user && (
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
      )}
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
