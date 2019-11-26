import React, { useEffect, useState } from 'react';
import firebase, { firestore } from '../firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import useUserContext from '../context/userContext';
import styled from 'styled-components';

const Login: React.FC = () => {
  const [PostData, setPostData] = useState<PostData[]>([]);
  const [nameCache, setNameCache] = useState<Record<string, string>>({});
  const { user } = useUserContext();
  const uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [firebase.auth.TwitterAuthProvider.PROVIDER_ID],
  };

  const getPostData = async () => {
    try {
      const postQuerySnapshot: any = await firestore.collection('post').get();
      const records = postQuerySnapshot.docs.map((elem: any) => {
        return elem.data();
      });
      setPostData(records);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    const userIds = PostData.map((ele) => ele.id);
    try {
      const cache = await Promise.all(
        userIds.flatMap(async (id) => {
          const QuerySnapshot = await firestore
            .collection('user')
            .doc(id)
            .get();
          const { name } = QuerySnapshot.data() as { name: string };
          return [id, name] as const;
        }),
      );
      setNameCache(Object.fromEntries(cache));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  useEffect(() => {
    getUser();
  }, [PostData]);

  return (
    <div>
      <div>
        {!user && (
          <div>
            <div></div>
            <FirebaseLogin>
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </FirebaseLogin>
          </div>
        )}
        {user && (
          <ItemsDiv>
            {PostData.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <ItemDiv>
                    <p>{item.text}</p>
                    <span>{nameCache[item.id]}</span>
                  </ItemDiv>
                </React.Fragment>
              );
            })}
          </ItemsDiv>
        )}
      </div>
    </div>
  );
};

const ItemsDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const FirebaseLogin = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ItemDiv = styled.div`
  margin: 50px;
`;
export default Login;
