# myFavoriteQuotes

<div align="center"><img width=700 src="https://user-images.githubusercontent.com/72868495/192459761-80ee064b-828d-488c-a3b4-4a1dcc9df166.png"></div>

<div align=center><a href="https://myfavoritequotes.netlify.app">myFavoriteQuotes Link</a></div><br>

<div align='center'>
개인적으로 명언을 좋아하여 명언을 좋아하는 분들이
다양한 명언을 보고<br>
저장 및 관리할 수 있도록 제작한 프로젝트입니다.
</div>

<br>

## 사용 기술
<div align='center'>
  <img src="https://img.shields.io/badge/Jest-^29.5.0-C21325?logo=jest" />
  <img src="https://img.shields.io/badge/React_Testing_Library-^14.0.0-E33332?logo=testinglibrary&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-^4.9.4-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-^18.2.0-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/Zustand-^4.3.2-FFFFFF" />
  <img src="https://img.shields.io/badge/Styled_Components-^5.3.6-DB7093?logo=styledcomponents&logoColor=white" />
</div>
<div align='center'>
  <img src="https://img.shields.io/badge/Webpack-^5.74.0-8DD6F9?logo=webpack&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-^5.74.0-FFCA28?logo=firebase&logoColor=white" />
</div>

## 미리보기

|영역|미리보기|
|---|---|
|- 메인 카드 영역|<img width=500 src="https://user-images.githubusercontent.com/72868495/218380446-4a40ff8a-c908-4f18-93f8-cc51bf45b2ac.gif" />|
|- 로그인 기능|<img width=500 src="https://user-images.githubusercontent.com/72868495/218380506-f8c541e9-270f-4adb-bb4a-8becfd88cbff.gif" />|
|- 히스토리 및 즐겨찾기 기능|<img width=500 src="https://user-images.githubusercontent.com/72868495/218380318-7bd2ca60-6cf7-4869-8cd7-1f3c492225d6.gif" />|

## 기능

- 로그인 기능
```
Firebase의 Auth를 이용하여 로그인 기능을 구현하였으며 구글, 페이스북, 깃허브를 통한 소셜 로그인을 지원하고 있습니다.

로그인한 유저의 데이터는 Firebase의 realtimeDB에 저장되며 비로그인 유저의 데이터는 세션스토리지에 보관됩니다.
```

- 즐겨찾기 기능 
```
카드와 히스토리 영역의 하트 버튼을 클릭하여 사용자가 저장하고 싶은 명언 목록을 별도로 관리할 수 있습니다.

또한, 즐겨찾기 영역에서 삭제하고 싶은 경우 카드와 히스토리영역 뿐만 아니라 즐겨찾기 리스트에서도 하트 버튼을 클릭해 삭제할 수 있습니다.
```

- 히스토리 기능
```
사용자가 화살표를 클릭 해 새로운 명언을 보는 경우 이는 자동으로 히스토리 목록에 저장되며 최근 히스토리는 10개까지 저장할 수 있습니다.
```

- 다운로드 기능
```
카드의 하트 옆 다운로드 버튼을 사용해 명언과 배경을 보여지는 그대로 사용자가 저장할 수 있습니다.
```
