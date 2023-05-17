import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import {
  CenteredDiv,
  ContentWrapper,
  LoginSuccessWrapper,
} from "./LoginSuccess.styles";
import {
  RequestAccessTokenWithRefreshToken,
  getUserProfile,
} from "../../utils/api/login-http";
// import { getUserProfile } from "../../utils/api/login-http";
import { useDispatch } from "react-redux";
import { loginAccount } from "../../store/UserSlice";
import { useHistory } from "react-router-dom";
import { UserInfoDto } from "../../utils/api/login-http";

const LoginSuccess: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userInfoGet, setUserInfoGet] = useState<any>(null);

  const newUesrCheck = (userInfo: UserInfoDto) => {
    if (userInfo.profileImgUrl) {
      console.log("param userInfo input");
      console.log(userInfo);
      setTimeout(() => {
        history.push("/");
      }, 1500); // 3초(3000ms) 지연
    } else {
      alert("신규 회원이시군요! 캐릭터를 선택해주세요!");
      history.push("/selectPairchild");
    }
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      console.log("엑세스토큰 가져올거임.");
      const accessTokenResponse = await RequestAccessTokenWithRefreshToken();
      console.log("엑세스토큰받았나?");
      console.log(accessTokenResponse);
      const accessToken = accessTokenResponse.accessToken;
      localStorage.setItem("accessToken", accessToken);

      console.log("유저프로필 받아올게");
      const userInfo = await getUserProfile(accessToken);
      console.log("유저프로필 받았나?");
      console.log(userInfo);
      localStorage.setItem("userInfo", userInfo.nickname);
      console.log("1");
      setUserInfoGet(userInfo);
      dispatch(loginAccount(userInfo));

      // alarmSubscribe();

      // const alarmSubscribe = axiosInstanceWithAccessToken.get(
      //   `/user-service/alarms/subscribe`
      // );
      // console.log("알람 구독간다");
      // console.log(alarmSubscribe);

      console.log(
        "알람구독 res데이터 위에있고, 이제 신규유저인지 체크 들어간다."
      );
      newUesrCheck(userInfo);
      console.log("3");
    };

    fetchAccessToken();
  }, []);

  // 알람 구독
  useEffect(() => {
    let eventSource: any;
    console.log("useeffect로 들어오나?");
    if (userInfoGet) {
      console.log("userinfo 가져오기 성공");
      const alarmSubscribe = () => {
        eventSource = new EventSource(
          `https://mygemini.co.kr/user-service/alarms/subscribe?nickname=${userInfoGet.nickname}`
        );
        console.log("열리기 직전");
        console.log(eventSource);
        eventSource.onopen = () => {
          console.log("SSE 연결이 열렸습니다.");
        };

        eventSource.onmessage = (event: any) => {
          console.log("onmessege로 들어왔나?");
          const eventData = JSON.parse(event.data);
          console.log(eventData);
        };

        eventSource.onerror = (error: any) => {
          console.error("SSE 연결 중 오류가 발생했습니다.", error);
        };

        return () => {
          // 컴포넌트가 언마운트될 때 SSE 연결 종료

          if (eventSource) {
            eventSource.close();
          }
        };
      };
      alarmSubscribe();
      console.log("설마 나갔니?");
    }
  }, [userInfoGet]);

  return (
    <>
      <LoginSuccessWrapper>
        <CenteredDiv>
          <ContentWrapper>
            <p>Gemini로 확인되었습니다.</p>
            <p>메인페이지로 입장합니다.</p>
          </ContentWrapper>
        </CenteredDiv>
      </LoginSuccessWrapper>
    </>
  );
};

export default LoginSuccess;
