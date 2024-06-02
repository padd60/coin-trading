# 프로젝트 설명

## 프로젝트 실행 방법

1. 터미널에서 yarn install를 입력 후 프로젝트 사용 module을 설치합니다.
2. 터미널에서 yarn dev를 입력 후 dev server가 켜질때까지 대기합니다.
3. 터미널에 실행완료와 함께 url이 나오면 해당 url를 클릭하여 브라우저에서 확인합니다.

## 프로젝트 구조

vite + react18 + typescript + yarn을 사용한 프로젝트입니다.

아래와 같은 폴더 구조를 가집니다.

📦src
┣ 📂app
┃ ┣ 📂router
┃ ┃ ┣ 📜index.tsx
┃ ┃ ┗ 📜routes.tsx
┃ ┗ 📜App.tsx
┣ 📂entity
┃ ┣ 📂coin-detail
┃ ┃ ┣ 📂query
┃ ┃ ┣ 📜api.ts
┃ ┃ ┗ 📜model.ts
┃ ┗ 📂coin-list
┃ ┃ ┣ 📂query
┃ ┃ ┣ 📜api.ts
┃ ┃ ┗ 📜model.ts
┣ 📂feature
┃ ┣ 📂coin-detail
┃ ┃ ┗ 📂ui
┃ ┗ 📂coin-list
┃ ┃ ┣ 📂ui
┃ ┃ ┗ 📜model.ts
┣ 📂page
┃ ┣ 📂coin-bookmark
┃ ┃ ┗ 📂ui
┃ ┣ 📂coin-detail
┃ ┃ ┗ 📂ui
┃ ┗ 📂coin-list
┃ ┃ ┗ 📂ui
┣ 📂shared
┃ ┣ 📂assets
┃ ┣ 📂store
┃ ┣ 📂ui
┣ 📂widget
┃ ┣ 📂coin-detail
┃ ┃ ┣ 📂lib
┃ ┃ ┗ 📂ui
┃ ┗ 📂coin-list
┃ ┃ ┣ 📂lib
┃ ┃ ┗ 📂ui
┣ 📜main.css
┣ 📜main.tsx
┗ 📜vite-env.d.ts

각 폴더별 의미는 하단 개발 방법론 적용 부분의 FSD 패턴을 참고해주시길 바랍니다.

## 개발 방법론 적용

### FSD(Feature-Sliced Design)

FSD(Feature-Sliced Design) 방법론을 적용했습니다.

FSD의 목적은 높은 응집도와 낮은 결합도를 추구하여 끊임없이 변화하는 비즈니스 요구사항에 프로젝트를 더 이해하기 쉽고 체계적으로 만드는 것입니다.

layers → slices → segments로 구성됩니다.

관련 링크 https://feature-sliced.design/

#### layers

최하단에 존재하는 shared에서 app으로 이동할수록 점점더 구체화되는구조 → 상속, 추상화의미

- app
- page
- widget
- feature
- entity
- shared

각각의 설명을 적자면

shared는 어떤 레이어에서도 공통적으로 사용되는 것들을 정의하는 레이어로 다른 layer와는 달리, slices를 건너뛰어 바로 segments로 구성됩니다.

entity 도메인에 대한 데이터를 관리하는곳으로 주로 api, 데이터 모델 등이 해당됩니다.

feature 유저의 인터렉션과 관련되는 레이어로 사용자의 조작이 이루어지는 UI 등이 해당됩니다.

widget feature + entity를 통해 구성된 UI가 오는 레이저로 데이터를 불러와 리스팅하는 등의 UI가 해당됩니다.

page는 페이지 url로 구분되는 UI를 뜻합니다.

app은 shared영역과같이 slices영역이 없이 바로 segments영역으로 구분됩니다. 전체적인 어플리케이션을 고려한 코드가 위치합니다.

#### slices

제품, 비즈니스에 따라 코드를 그룹화하는 것으로 주로 도메인 별로 묶습니다.

서로 관련된 모듈을 가깝게 위치시킴으로써 탐색에 용이하게합니다.(높은 응집도)

특징으로는 같은 layer에 다른 slice에서 자원을 가져다 사용할 수 없습니다.(낮은 결합도)

#### segments

기술적 특성에따라 slice내의 코드를 그룹화하는것으로 보통 ui, model, api, lib 등이 생성됩니다.

위 4가지 segment 말고도 별도의 custom segment를 구성해도 괜찮습니다.

## 라이브러리 선택 및 사용 근거

### axios

request와 response에 json 처리시 JSON.parse와 JSON.stringify를 하지 않아도 되고
interceptor와 같은 편리한 기능이 있어 api 요청에 사용했습니다.

### tanstack query

server state와 client state를 분리해서 관리하기 위해 사용했습니다.
비동기 데이터를 효과적으로 제어하기 위해 사용했습니다.

### lukemorales/query-key-factory

tanstack query key를 효과적으로 type safe하게 관리하기 위해서 사용

공식문서에도 권장하는 부분이 있어 적용함.
https://tanstack.com/query/v4/docs/framework/react/community/lukemorales-query-key-factory

### zustand

페이지별로 공유되어야하는 프론트에서 관리하는 전역상태를 선언 및 조작하기 위해 사용했습니다.

### tailwind css

css in js의 단점인 js로 스타일링 연산을 하여 렌더링 성능에 악영향을 끼치는 부분을 덜어내기 위해 사용했습니다.

또한 반응형 디자인과 스타일링을 좀 더 편하게 하기 위해 사용했습니다.

### postcss, autoprefixer

tailwind css를 사용하기 위해 적용했습니다.

### nextui-org/react

tailwind css 기반의 UI 라이브러리로 빠르게 애니메이션과 부가 스타일링이이 구현된 컴포넌트를 구현하기위해 사용했습니다.

### framer-motion

nextui를 사용하기 위해 적용했습니다.

### react-hot-toast

사용자에게 UI상 알림을 편하게 주기 위해 사용했습니다.

## 커밋 컨벤션

구분타입: 내용

- 필요에 따라 상세 내용 작성

### 커밋 구분타입

- feat: 기능, UI 구현에 해당
- fix: 각종 수정에 해당
- design: css 등 스타일링에 해당
- refactor: 각종 최적화, 코드가독성 향상, 재사용성 증대 등의 조정에 해당
- chore: package.json, env파일등 환경설정 작업 등에 해당
- docs: md 파일과 같은 문서 관련 작업에 해당
- create: 패키지 생성에 해당
