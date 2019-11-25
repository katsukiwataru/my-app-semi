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
      const records = postQuerySnapshot.docs.map((elem: any) => {
        return elem.data();
      });
      setPostData(records);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    const hoge = PostData.map((ele) => ele.id);
    console.log(hoge);
    // try {
    //   const postQuerySnapshot = await firestore.collection('user').get();
    //   const records = postQuerySnapshot.docs.map((elem: any) => {
    //     console.log(elem, elem);
    //     return elem.data();
    //   });
    //   console.log(hoge, records);
    // } catch (error) {
    //   console.log(error);
    // }
    // const datas: any = [];
    // try {
    //   const aaa = hoge.map((item) => {
    //     const data = QuerySnapshot.data();
    //     datas.push(data.name);
    //     return data.name;
    //   });
    //   console.log(aaa);
    // } catch (error) {
    //   console.log(error);
    // }
    // console.log(datas);
    // return user;
  };

  useEffect(() => {
    getPostData();
  }, []);

  useEffect(() => {
    getUser();
  }, [PostData]);

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
