# myFavoriteQuotes

<div align="center"><img width=700 src="https://user-images.githubusercontent.com/72868495/192459761-80ee064b-828d-488c-a3b4-4a1dcc9df166.png"></div>

<div align=center><a href="https://myfavoritequotes.netlify.app">myFavoriteQuotes Link</a></div><br>
<br>
명언을 좋아하고 저장하고 싶은 분들을 위해 만든 사이드 프로젝트입니다.

# 기술스택

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" /> <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />

<img src="https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black" /> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=black" /> <img src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white" />

## 기능

- 로그인 기능 (소셜 로그인 - 구글, 페이스북, 깃허브)

- 즐겨찾기 기능 (비 로그인시 데이터는 세션에만 저장)

- 히스토리 기능

- 다운로드 기능

## 특징

- **Webpack을 이용해 CRA를 사용하지 않고 리액트 환경 구축**<br><br>
  > 기존 프로젝트에서는 모두 CRA를 이용해 리액트 환경을 구성해왔지만<br> **과거 CRA환경에서 PostCSS를 적용하던 중 일부 플러그인 버전 충돌 및 비호환 문제,**<br> **일부 설정을 변경하려면 eject를 실행하거나 별도 라이브러리를 설치해야하는 불편함으로 인해 CRA 없는 환경을 직접 구축**하였습니다.<br><br> 이를 통해 리액트 환경에 대한 이해도를 높일 수 있었고 TS, React, Webpack 간 환경 설정에 대한 지식을 익힐 수 있게 되었습니다.

<br>

- **HTML2CANVAS 라이브러리를 사용한 이유**<br><br>
  > 기획 단계에서 canvas 요소를 사용해 별도의 라이브러리 설치없이 다운로드 기능을 구현하려 하였으나<br> 구현 중 **canvas 내부에서 여러 줄의 텍스트를 다루기 위해서는 디스플레이 되는 텍스트가 바뀔때마다**<br> **카드의 현재 크기와 폰트의 크기를 바탕으로 각 라인에 배치될 문자열의 개수, 문자열의 라인 개수 등을 계산해야하는 불편함**이 있다는것을 알게 되었습니다.<br><br> 이는 **별도의 로직을 작성해야 하는 불편함과 함께 텍스트가 교체될 때마다 이를 계산하는 로직이 계속 실행되어야 하므로 이는 성능에 좋지 않아** HTML 태그를 그대로 사용하면서 다운로드가 필요할때만 canvas로 변환해줄 수 있는 HTML2CANVAS 라이브러리를 도입하게 되었습니다.

<br>

- **즐겨찾기 기능 구현**<br><br>
  > 즐겨찾기 기능을 통해 유저가 보고싶어하는 명언의 목록을 관리할 수 있습니다.<br> 비로그인시 사용자의 즐겨찾기 목록은 세션스토리지에 저장되며 로그인 시에는 파이어베이스의 실시간 데이터베이스에 저장됩니다.<br> 따라서 사용자의 로그인 여부에 따라 사용자의 데이터를 읽고 저장하는 로직을 분할하였습니다.<br>

<br>

- **기획 단계에서 Figma를 도입하여 퍼블리싱에 소요되는 불필요한 시간 단축**<br><br>
  > Figma를 활용하여 퍼블리싱 과정에서 적용할 레이아웃, 색상, 사이즈등에 대해 먼저 전체적인 청사진을 그리고<br> 이를 바탕으로 퍼블리싱을 진행하여 불필요한 작업에 소요되는 시간을 줄이고 효율성을 높일 수 있었습니다.<br><br> [Figma Link](https://www.figma.com/file/kY7HhZebiHr6R8bv6P7gwG/myfavquotes?node-id=0%3A1)

<br>

- **Styled components 적용**<br><br>
  > 기존 프로젝트들에서는 SCSS와 CSS만 사용해왔지만 **컴포넌트 환경에서 가변적으로 CSS속성을 적용하기 쉽고 클래스이름에 대한 중복 및 경량화 효과를 볼 수 있는 styled-components를 적용**했으며 스타일 컴포넌트의 재사용을 중점으로 두고 적용하였습니다.

<br>

- **type과 interface 별도 분리**<br><br>
  > 원활한 유지보수를 위해 재사용되는 type과 interface를 별도 폴더로 분리하였으며<br> **타입 명시를 위해 확장이 용이한 interface를 위주로 적용하고 변수의 union type이 필요할 때만 type을 적용**하였습니다.

<br>

- **카드 이벤트에 디바운스 적용**<br><br>
  > 과도한 클릭으로 인한 무분별한 API 호출을 방지하기 위해 디바운스 로직을 작성해 utils폴더에 위치시켜 재사용이 용이하도록 하였습니다.

## 에러 핸들링

- **iOS 환경에서 흰 화면만 표시되는 에러 해결**<br><br>
  > 배포 후 다양한 환경에서 테스트를 진행해보았는데 유일하게 iOS환경에서만 브라우저 종류에 상관없이 흰 화면만 표시되는 에러가 발생했습니다.<br> 원인을 찾기 위해 다양한 방법을 시도하였으나 **윈도우 환경에서 iOS의 개발자 도구를 열 수 있는 방법이 많지 않았고 inspect라는 툴을 우연히 발견해 에러의 원인이 정규표현식의 lookbehind기능이 사파리 환경에서 지원하지 않아 발생하는 오류임을 파악**하여 수정 후 재배포를 진행하였습니다.
