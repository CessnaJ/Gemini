import React, { FC, useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Desc,
  EditButton,
  EditPenButton,
  FollowingAndPayWrappter,
  FollowingTextWrapper,
  MyBgImg,
  MyInfoContentWrapper,
  MyInfoSpace,
  MyInfoWrapper,
  MyProfileContentBodyWrapper,
  MyProfileContentTitle,
  MyProfileContentTitleWrapper,
  MyProfileContentWrapper,
  MyProfileImg,
  MyProfileTextWrapper,
  MyProfileWrapper,
  Nickname,
  NumText,
} from "./UserProfile.styles";
import PayButton from "../../components/profile/pay/modal/PayModal";
import FollowButton from "../../components/profile/userprofile/FollowButton";
import MyProfileContentBody from "../../components/profile/myprofile/MyProfileContentBody";
import axios from "axios";
import axiosInstanceWithAccessToken from "../../utils/AxiosInstanceWithAccessToken";
import { async } from "q";
import UserGeminiDetail from "../../components/geminiDetail/UserGeminiDetail";

type UserProfileParams = {
  nickname: string;
};

export const getInfScrollImgLength = (imagesLength: number) => {
  const quotient = Math.floor(imagesLength / 4);
  return Math.max(quotient - 1, 0);
};

const UserProfile: FC = () => {
  const { nickname } = useParams<UserProfileParams>();
  const history = useHistory();

  // const [nickname, setNickname] = useState<string>("닉네임");
  const [desc, setDesc] = useState<string>(
    "자기소개 부분: 내가 좋아하는 세계관, 캐릭터 등등을 적어보자 자  최대 몇글자로 하는게 좋을까? 넘기면 ...으로 만들까?"
  );
  const [followerNum, setFollowerNum] = useState<number>(0);
  const [followingNum, setFollowingNum] = useState<number>(0);
  const [totalGallery, setTotalGallery] = useState<number>(10);

  const fetchUserInfo = async () => {
    const res = await axiosInstanceWithAccessToken.get(
      `/user-service/profile/${nickname}`
    ); // 주소 수정 필요 😀
    console.log("가져온 다른 유저의 데이터");
    console.log(res.data);
    setFollowerNum(res.data.follower);
    setFollowingNum(res.data.following);
    setTotalGallery(res.data.geminis.length);
    setDesc(res.data.description);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // for infinite scroll 😀

  const dummyImgs = [
    { url: "http://placeimg.com/150/200/tech", pk: 1 },
    { url: "http://placeimg.com/150/200/tech", pk: 2 },
    { url: "http://placeimg.com/150/200/tech", pk: 3 },
    { url: "http://placeimg.com/150/200/tech", pk: 4 },
    { url: "http://placeimg.com/150/200/tech", pk: 5 },
    // ...
  ];
  interface ImageData {
    url: string;
    pk: number;
  }

  const [images, setImages] = useState<ImageData[]>([...dummyImgs]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const infScrollImgLength = getInfScrollImgLength(images.length);
  const minHeight = `${39.2 + infScrollImgLength * 20}vh`;

  const loadMoreImages = useCallback(async () => {
    try {
      const response = await axios.get("/api/your_endpoint", {
        params: {
          page: page,
          size: 16,
        },
      });

      if (response.status === 200) {
        const newImages = response.data.galleryPage.content.map(
          (item: any) => item.imageUrl
        );
        setImages((prevImages) => [...prevImages, ...newImages]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(newImages.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
      setHasMore(false);
    }
  }, [page]);

  useEffect(() => {
    loadMoreImages();
  }, [loadMoreImages]);
  // for infinite scroll 😀

  // for model component 😉
  const [selectedImagePk, setSelectedImagePk] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (pk: number) => {
    setSelectedImagePk(pk);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // for model component 😉

  return (
    <>
      <MyProfileWrapper minHeight={minHeight}>
        <MyInfoWrapper>
          <MyBgImg></MyBgImg>
          <MyInfoSpace></MyInfoSpace>
          <MyInfoContentWrapper>
            <MyProfileImg></MyProfileImg>
            <MyProfileTextWrapper>
              <Nickname>{nickname}</Nickname>
              <Desc>{desc}</Desc>
              {/* <EditButton>수정하기</EditButton> */}
            </MyProfileTextWrapper>
            <FollowingAndPayWrappter>
              <FollowingTextWrapper>
                <NumText>
                  {followerNum}
                  <br />
                  팔로워
                </NumText>
                <NumText>
                  {followingNum}
                  <br />
                  팔로잉
                </NumText>
                <NumText>
                  {totalGallery}
                  <br />
                  갤러리
                </NumText>
              </FollowingTextWrapper>
              <FollowButton />
            </FollowingAndPayWrappter>
          </MyInfoContentWrapper>
        </MyInfoWrapper>
        <MyProfileContentWrapper minHeight={minHeight}>
          <MyProfileContentTitleWrapper>
            <MyProfileContentTitle>닉네임님의 Gemini</MyProfileContentTitle>
            <MyProfileContentTitle>
              닉네임님의 TRPG 추억로그
            </MyProfileContentTitle>
          </MyProfileContentTitleWrapper>
          <MyProfileContentBodyWrapper minHeight={minHeight}>
            <MyProfileContentBody
              images={images}
              hasMore={hasMore}
              loadMoreImages={loadMoreImages}
              onImageClick={handleImageClick} // 이 부분을 추가하세요.
            />
          </MyProfileContentBodyWrapper>
        </MyProfileContentWrapper>
      </MyProfileWrapper>
      {isModalOpen && (
        <UserGeminiDetail
          closeModal={closeModal}
          selectedImagePk={selectedImagePk}
        />
      )}
    </>
  );
};

export default UserProfile;
