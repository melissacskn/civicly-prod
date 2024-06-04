import React from 'react';
import styled from 'styled-components/native';

// Define your styled components
const PostContainer = styled.View`
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px; /* Corrected shadow-offset */
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;

const Name = styled.Text`
font-size: 14px;
color: #666;
`;

const Status = styled.Text`
  font-size: 14px;
  color: #666;
`;
const Assettype = styled.Text`
 

  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const PostImage = styled.Image`
  width: 100%;
  height: 30px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const Container = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start; /* Align to the left */
  margin-bottom: 20px;
`;


const Post = ({ image, name,assetType, status, postImage }) => {
  return (
    <PostContainer>
      <HeaderContainer>
        <ProfileImage source={{ uri: image }} />
        <Container>
        <Assettype>{assetType}</Assettype>
        <Name>{name}</Name>
        </Container>

        
      </HeaderContainer>
      <PostImage source={{ uri: postImage }} />
      <Status>{status}</Status>
    </PostContainer>
  );
};

export default Post;
