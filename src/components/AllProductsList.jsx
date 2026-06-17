import { useState, useEffect, Children, useCallback } from "react";
import axios from '../utils/axios.jsx';
import ItemList from "./ItemList.jsx";

const windowInnerWidth = window.innerWidth;
console.log(windowInnerWidth);

function AllProductsList () {
  // 상품목록 데이터 상태관리
  const [items, setItems] = useState([]);
  //정렬 상태 관리
  const [order, setOrder] = useState('recent');
  //페이지 상태 관리
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  //복사한 배열 객체 items -> 객체 안의 프로퍼티가 고정일시 '.', 변수면 '[]'으로 바꿔줘야함
  //const sortedItems = [...items].sort((a,b) => b[order] - a[order]);
  const [windowSize, setWindowSize] = useState('');

  //페이지네이션 : 최대 5개까지의 숫자를 하위에서 보여줌 -> 이는 10개씩(pc기준)으로 자른 page번호임 -> 클릭(이벤트) 해당 페이지 번호를 쿼리로 넘겨서
  
  //list를 재 렌더링 (handleLoad기능 사용) 현재 번호는 클릭이 안되겠지.
  //화살표 : 화살표를 누르면 5개로 자른 다음 페이지 배열을 보여줌 -> 그리고 화면도 그 배열의 첫번째숫자 page번호로 렌더링됨 
  const handleLoad = useCallback(async( ) => {
    const response = await axios.get('/products', {
      params: {
        orderBy: order,
        pageSize: 10,
        page : page,
      }
    });
    const { list } = response.data;
    setItems(list);
    setPage(page);
    setTotalPage(Math.ceil(response.data.totalCount / 10)); 
    
  }, [order, page]);

  // for (let i = 1; i <= totalPage; i++){ 
  //   pageList.push(i);
  // }
  const totalPageList = Array(totalPage).fill().map((_, i) => i + 1);
  //배열을 5개씩 쪼개서 중첩배열로 만들기
  const seperatedPageList = [];
  for (let i = 0; i < totalPageList.length; i+=5 ){
    seperatedPageList.push(totalPageList.slice(i, i+5));
  }
  //현재 페이지(page)가 속하는 배열 찾기 - 배열 map으로 리스트화해주면 끝남...ㅠㅠㅠㅠㅠ
  const pagessss = seperatedPageList[Math.floor((page - 1) / 5)];
  const currentList = pagessss || [] ;
  //이전, 이후 버튼 동작 
  const handlePageList = ( direction ) => {
    if ( direction === 'Prev') {
      if ( currentList[0] > 1 ){
        setPage(currentList[0] - 1);
      }
    } else if ( direction === 'Next') {
      const lastPageOfCurrentList = currentList[currentList.length - 1] ;
      if ( lastPageOfCurrentList < totalPage){
      setPage(lastPageOfCurrentList + 1);
    }}
  }


  useEffect(() => {
    handleLoad();
  },[handleLoad]);
  //서버사이드에서 가져오니까 order기준으로 새로운 목록을 만듦

  //상태를 설정했으면 setOrder를 통해 order를 바꾸어주면 됨. 온클릭 함수로넘겨줘야됨.(이 아니었어)
  //온클릭이 아니라 Select는 onChange메서드로 e객체의 값을 넣어줄수있음.
  const handleSortChange = (e) => {
    setOrder(e.target.value);    
  }

  //아이템 컴포넌트 items로 일시키기
  return (
      <div>
        <h2>판매 중인 상품</h2>
        {/* 검색인풋 (폼으로 따로 만들어 넣기)
        상품 등록하기 버튼 (모달일듯? */}
        <button type="button">상품 등록하기</button>
        <select onChange={handleSortChange}>
          <option value="recent">최신순</option>
          <option value="favorite">좋아요순</option>
        </select>
        <ul>
          <ItemList items={items}/>
        </ul>
        <ul>
          <li><button onClick={() => handlePageList('Prev')}>prev</button></li>
          {currentList.map((page) => (
            <li key={page}><button onClick={() => setPage(page)}>{page}</button></li>
          ))}
          <li><button onClick={() => handlePageList('Next')}>Next</button></li>
        </ul>
      </div>
    );
 }

 export default AllProductsList;