import React, { useContext, useEffect, useState } from 'react';
import { Layout } from '../../layouts/signinLayout';
import { FirstSection } from './firstSection';
import { SecondSection } from './secondSection';
import { ThirdSection } from './thirdSection';

import { Content } from './style';
import { Button, Flex } from '../../Components/styles/Container.styles';

import { UserContext } from '../../Components/contexts/usercontext';
import { useHistory } from 'react-router-dom';
import { authentication } from '../../Components/contexts/usecontext';
import { ImageContext } from '../../Components/contexts/imageContext';

import { updateUser, getUserImages, getUser } from './tools';

const user_id = localStorage.getItem('userId');
const url = `/user/${user_id}`;
const urledit = `/user/edit/${user_id}`;

export const EditProfile = (props) => {
  let history = useHistory();
  const { auth } = useContext(authentication);
  const [disable, setDisable] = useState(true);
  const [userdetails, setUserDetails] = useContext(UserContext);
  const [imageDetails ,setImageDetails] = useContext(ImageContext);
  const urlImages = `/picture/${auth.userId}`;

  useEffect(() => {
    getUser(url, setUserDetails);
  }, [auth?.userId]);

  useEffect(() => {
    getUserImages(urlImages, setImageDetails);
  }, [auth?.userId]);

  const submit = (e) => {
    console.log('urledit, userdetails');
    e.preventDefault();
    updateUser(urledit, userdetails);
    history.push('/profile');
  };

  const handelChange = (e) => {
    setDisable(false);
    const newData = { ...userdetails };
    newData[e.target.id] = e.target.value;
    setUserDetails(newData);
    console.log(newData);
  };
  return (
    <Layout login={true}>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Content onSubmit={(e) => submit(e)}>
          <div
            style={{
              display: 'block',
              justifyContent: 'center',
              paddingBottom: '9rem',
            }}
          >
            <Content
              style={{
                display: 'flex',
              }}
            >
              <FirstSection photoProfile={userdetails?.photoProfile} />
              <SecondSection handelChange={handelChange} />
              <ThirdSection handelChange={handelChange} />
            </Content>
            <Button
              // type="submit"
              disabled={disable}
              style={{ width: '15rem', margin: 'auto' }}
              onClick={() => {
                console.log("go to backe end edit profale test gender preference",userdetails);
                updateUser(urledit, userdetails);
                history.push('/profile');
              }}
            >
              Edit
            </Button>
          </div>
        </Content>
      </Flex>
    </Layout>
  );
};
