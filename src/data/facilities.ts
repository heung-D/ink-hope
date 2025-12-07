// 시설 유형
export const facilityTypeValues = ["교도소", "구치소", "소년원/소년교도소", "군부대/훈련소", "일반 주소"] as const;
export type FacilityType = typeof facilityTypeValues[number];

// 지역
export const regions = [
  "서울", "경기", "인천", "강원", "충북", "충남", "대전", "세종", 
  "전북", "전남", "광주", "경북", "경남", "대구", "울산", "부산", "제주"
] as const;

export type Region = typeof regions[number];

// 관계 유형
export const relationTypes = [
  "조부모", "어머니", "아버지", "형제/자매", "자녀", 
  "배우자", "연인", "친구", "선배/후배", "지인", "법률대리인"
] as const;

export type RelationType = typeof relationTypes[number];

// 시설 정보
export interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  region: Region;
  address: string;
}

// 한국 교정시설 목록
export const facilities: Facility[] = [
  // 교도소 - 서울
  { id: "1", name: "서울남부교도소", type: "교도소", region: "서울", address: "서울특별시 금천구 시흥대로 143" },
  { id: "2", name: "서울동부구치소", type: "구치소", region: "서울", address: "서울특별시 송파구 문정로 20" },
  { id: "3", name: "서울구치소", type: "구치소", region: "서울", address: "서울특별시 송파구 위례성대로 16" },
  { id: "4", name: "서울남부구치소", type: "구치소", region: "서울", address: "서울특별시 양천구 신정로7길 30" },
  
  // 교도소 - 경기
  { id: "5", name: "안양교도소", type: "교도소", region: "경기", address: "경기도 안양시 동안구 호계동" },
  { id: "6", name: "수원구치소", type: "구치소", region: "경기", address: "경기도 수원시 팔달구 동수원로 397" },
  { id: "7", name: "의정부교도소", type: "교도소", region: "경기", address: "경기도 의정부시 호원동" },
  { id: "8", name: "화성직업훈련교도소", type: "교도소", region: "경기", address: "경기도 화성시 팔탄면" },
  
  // 교도소 - 인천
  { id: "9", name: "인천교도소", type: "교도소", region: "인천", address: "인천광역시 남동구 호구포로 99" },
  { id: "10", name: "인천구치소", type: "구치소", region: "인천", address: "인천광역시 미추홀구 석정로 163" },
  
  // 교도소 - 강원
  { id: "11", name: "춘천교도소", type: "교도소", region: "강원", address: "강원도 춘천시 서면 박사로 955" },
  { id: "12", name: "원주교도소", type: "교도소", region: "강원", address: "강원도 원주시 문막읍" },
  { id: "13", name: "강릉교도소", type: "교도소", region: "강원", address: "강원도 강릉시 성산면" },
  { id: "14", name: "영월교도소", type: "교도소", region: "강원", address: "강원도 영월군 영월읍" },
  
  // 교도소 - 충북
  { id: "15", name: "청주교도소", type: "교도소", region: "충북", address: "충청북도 청주시 서원구 남이면" },
  { id: "16", name: "청주여자교도소", type: "교도소", region: "충북", address: "충청북도 청주시 흥덕구" },
  { id: "17", name: "충주교도소", type: "교도소", region: "충북", address: "충청북도 충주시 앙성면" },
  
  // 교도소 - 충남
  { id: "18", name: "천안교도소", type: "교도소", region: "충남", address: "충청남도 천안시 동남구" },
  { id: "19", name: "홍성교도소", type: "교도소", region: "충남", address: "충청남도 홍성군 홍성읍" },
  { id: "20", name: "공주교도소", type: "교도소", region: "충남", address: "충청남도 공주시 탄천면" },
  
  // 교도소 - 대전
  { id: "21", name: "대전교도소", type: "교도소", region: "대전", address: "대전광역시 중구 보문로 255" },
  { id: "22", name: "대전구치소", type: "구치소", region: "대전", address: "대전광역시 유성구" },
  
  // 교도소 - 전북
  { id: "23", name: "전주교도소", type: "교도소", region: "전북", address: "전라북도 전주시 덕진구" },
  { id: "24", name: "군산교도소", type: "교도소", region: "전북", address: "전라북도 군산시" },
  { id: "25", name: "정읍교도소", type: "교도소", region: "전북", address: "전라북도 정읍시" },
  
  // 교도소 - 전남
  { id: "26", name: "광주교도소", type: "교도소", region: "전남", address: "광주광역시 북구 두암동" },
  { id: "27", name: "목포교도소", type: "교도소", region: "전남", address: "전라남도 무안군" },
  { id: "28", name: "순천교도소", type: "교도소", region: "전남", address: "전라남도 순천시" },
  { id: "29", name: "해남교도소", type: "교도소", region: "전남", address: "전라남도 해남군" },
  { id: "30", name: "장흥교도소", type: "교도소", region: "전남", address: "전라남도 장흥군" },
  
  // 교도소 - 광주
  { id: "31", name: "광주구치소", type: "구치소", region: "광주", address: "광주광역시 북구" },
  
  // 교도소 - 경북
  { id: "32", name: "대구교도소", type: "교도소", region: "경북", address: "경상북도 경산시 남산면" },
  { id: "33", name: "포항교도소", type: "교도소", region: "경북", address: "경상북도 포항시 북구" },
  { id: "34", name: "경북북부교도소", type: "교도소", region: "경북", address: "경상북도 영덕군" },
  { id: "35", name: "김천소년교도소", type: "소년원/소년교도소", region: "경북", address: "경상북도 김천시" },
  { id: "36", name: "안동교도소", type: "교도소", region: "경북", address: "경상북도 안동시" },
  { id: "37", name: "경북직업훈련교도소", type: "교도소", region: "경북", address: "경상북도 칠곡군" },
  
  // 교도소 - 경남
  { id: "38", name: "창원교도소", type: "교도소", region: "경남", address: "경상남도 창원시 성산구" },
  { id: "39", name: "밀양구치소", type: "구치소", region: "경남", address: "경상남도 밀양시" },
  { id: "40", name: "진주교도소", type: "교도소", region: "경남", address: "경상남도 진주시" },
  { id: "41", name: "통영구치소", type: "구치소", region: "경남", address: "경상남도 통영시" },
  
  // 교도소 - 대구
  { id: "42", name: "대구구치소", type: "구치소", region: "대구", address: "대구광역시 달서구" },
  
  // 교도소 - 울산
  { id: "43", name: "울산구치소", type: "구치소", region: "울산", address: "울산광역시 중구" },
  
  // 교도소 - 부산
  { id: "44", name: "부산교도소", type: "교도소", region: "부산", address: "부산광역시 강서구" },
  { id: "45", name: "부산구치소", type: "구치소", region: "부산", address: "부산광역시 사상구" },
  
  // 교도소 - 제주
  { id: "46", name: "제주교도소", type: "교도소", region: "제주", address: "제주특별자치도 제주시" },
  
  // 소년원
  { id: "47", name: "서울소년원", type: "소년원/소년교도소", region: "서울", address: "서울특별시 노원구" },
  { id: "48", name: "대전소년원", type: "소년원/소년교도소", region: "대전", address: "대전광역시 유성구" },
  { id: "49", name: "대구소년원", type: "소년원/소년교도소", region: "대구", address: "대구광역시 달서구" },
  { id: "50", name: "광주소년원", type: "소년원/소년교도소", region: "광주", address: "광주광역시 북구" },
  { id: "51", name: "부산소년원", type: "소년원/소년교도소", region: "부산", address: "부산광역시 강서구" },
  { id: "52", name: "춘천소년원", type: "소년원/소년교도소", region: "강원", address: "강원도 춘천시" },
  { id: "53", name: "전주소년원", type: "소년원/소년교도소", region: "전북", address: "전라북도 전주시" },
  { id: "54", name: "안양소년원", type: "소년원/소년교도소", region: "경기", address: "경기도 안양시" },
  { id: "55", name: "청주소년원", type: "소년원/소년교도소", region: "충북", address: "충청북도 청주시" },
  { id: "56", name: "제주소년원", type: "소년원/소년교도소", region: "제주", address: "제주특별자치도 제주시" },
  
  // 군부대 (대표적인 훈련소)
  { id: "57", name: "논산훈련소", type: "군부대/훈련소", region: "충남", address: "충청남도 논산시 연무읍" },
  { id: "58", name: "육군훈련소", type: "군부대/훈련소", region: "충남", address: "충청남도 논산시" },
  { id: "59", name: "해군교육사령부", type: "군부대/훈련소", region: "경남", address: "경상남도 창원시 진해구" },
  { id: "60", name: "공군교육사령부", type: "군부대/훈련소", region: "경남", address: "경상남도 진주시" },
  { id: "61", name: "해병대교육훈련단", type: "군부대/훈련소", region: "경북", address: "경상북도 포항시" },
];

// 시설 유형 아이콘과 함께
export const facilityTypes: { type: FacilityType; emoji: string }[] = [
  { type: "교도소", emoji: "🏛️" },
  { type: "구치소", emoji: "🏛️" },
  { type: "소년원/소년교도소", emoji: "🏫" },
  { type: "군부대/훈련소", emoji: "🎖️" },
  { type: "일반 주소", emoji: "🏠" },
];

// 저장된 주소
export interface SavedAddress {
  id: string;
  name: string;
  phone: string;
  address: string;
}

export const savedAddresses: SavedAddress[] = [
  { id: "1", name: "Bang Kyung", phone: "010-1234-5678", address: "서울시 강남구 테헤란로 123" },
  { id: "2", name: "홍길동", phone: "010-9876-5432", address: "서울시 종로구 세종대로 100" },
];
