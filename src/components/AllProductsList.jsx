import { useState, useEffect, Children, useCallback } from "react";
import axios from '../utils/axios.jsx';
import ItemList from "./ItemList.jsx";

function AllProductsList () {
  // 상품목록 데이터 상태관리
  const [items, setItems] = useState([]);
  //정렬 상태 관리
  const [order, setOrder] = useState('recent');
  //정렬 토글 관리
  const [isOpen, setIsOpen] = useState(false);
  //페이지 상태 관리
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  //키워드 상태 관리
  const [keyword, setKeyword] = useState('');
  //페이지 상품개수 관리
  const [pageSize, setPageSize] = useState(10);
  //복사한 배열 객체 items -> 객체 안의 프로퍼티가 고정일시 '.', 변수면 '[]'으로 바꿔줘야함
  //const sortedItems = [...items].sort((a,b) => b[order] - a[order]);

  //페이지네이션 : 최대 5개까지의 숫자를 하위에서 보여줌 -> 이는 10개씩(pc기준)으로 자른 page번호임 -> 클릭(이벤트) 해당 페이지 번호를 쿼리로 넘겨서
  
  //list를 재 렌더링 (handleLoad기능 사용) 현재 번호는 클릭이 안되겠지.
  //화살표 : 화살표를 누르면 5개로 자른 다음 페이지 배열을 보여줌 -> 그리고 화면도 그 배열의 첫번째숫자 page번호로 렌더링됨 
  const handleLoad = useCallback(async( ) => {
    const response = await axios.get('/products', {
      params: {
        orderBy: order,
        pageSize: pageSize,
        page: page,
        keyword: keyword,
      }
    });
    const { list } = response.data;
    setItems(list);
    setPage(page);
    setTotalPage(Math.ceil(response.data.totalCount / pageSize)); 
    
  }, [order, pageSize, page, keyword]);

  // for (let i = 1; i <= totalPage; i++){ 
  //   pageList.push(i);
  // }
  const totalPageList = Array(totalPage).fill().map((_, i) => i + 1);
  //배열을 5개씩 쪼개서 중첩배열로 만들기
  const seperatedPageList = [];
  for (let i = 0; i < totalPageList.length; i+=5 ){
    seperatedPageList.push(totalPageList.slice(i, i+5));
  }
  //현재 페이지(page)가 속하는 배열 찾기 - 배열 map으로 리스트화해주면 끝남...ㅠㅠㅠㅠㅠ [1,2,3,4,5]
  const currentList = seperatedPageList[Math.floor((page - 1) / 5)] || [] ;

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
  };

 //현재 활성화되어있는 페이지 li 클래스주기 => 리액트에서는 삼항연산자로함....ㅠㅠ
  // const realPage = document.querySelector(`li[key="${page}"]`);
  // console.log(realPage);

  //검색 기능 구현
  const submitSearch = async (formData) => {
    const searchKeyword = formData.get('keyword');
    setKeyword(searchKeyword);
    setPage(1);
  };

  //반응형 구현 화면사이즈에 따라 아이템 개수를 조정하기
  const handleSize = useCallback(() => {
    const contentWidth = window.innerWidth;
    if (contentWidth < 768 ){
      setPageSize(4);
    } else if (contentWidth < 1024 ){
      setPageSize(6);
    } else {
      setPageSize(10);
    }
  },[]);




  useEffect(() => {
    //처음
    handleSize();
    //리사이즈했을때 실행하셈
    window.addEventListener('resize',handleSize);
    //이벤트리스너 지움
    return () => window.removeEventListener('resize',handleSize);
  },[handleSize]);

  useEffect(() => {
    handleLoad();
  },[handleLoad]);
  //서버사이드에서 가져오니까 order기준으로 새로운 목록을 만듦

  //상태를 설정했으면 setOrder를 통해 order를 바꾸어주면 됨. 온클릭 함수로넘겨줘야됨.(이 아니었어)
  //온클릭이 아니라 Select는 onChange메서드로 e객체의 값을 넣어줄수있음.-> 다시 바뀜. div li로 
  const handleSortChange = (e) => {
    setOrder(e);
    setIsOpen(false);
  }

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  }

  return ( 
      <section className="products-list all">
        <div className="section-title-header">
          <h2 className="section-title">판매 중인 상품</h2>
          <div className="products-filter">
              <form action={submitSearch}>
                <div className="search-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M10.8966 16.2605C12.378 16.2605 13.6424 15.7401 14.6897 14.6992C15.7369 13.6584 16.2605 12.3908 16.2605 10.8966C16.2605 9.41507 15.7369 8.1507 14.6897 7.10345C13.6424 6.05619 12.378 5.53257 10.8966 5.53257C9.4023 5.53257 8.13474 6.05619 7.09387 7.10345C6.053 8.1507 5.53257 9.41507 5.53257 10.8966C5.53257 12.3908 6.053 13.6584 7.09387 14.6992C8.13474 15.7401 9.4023 16.2605 10.8966 16.2605ZM10.8966 17.7931C9.9387 17.7931 9.04151 17.6111 8.20498 17.2471C7.36845 16.8831 6.64049 16.3914 6.02107 15.772C5.40166 15.1526 4.90996 14.4246 4.54598 13.5881C4.18199 12.7516 4 11.8544 4 10.8966C4 9.95147 4.18199 9.06066 4.54598 8.22414C4.90996 7.38761 5.40166 6.65645 6.02107 6.03065C6.64049 5.40485 7.36845 4.90996 8.20498 4.54598C9.04151 4.18199 9.9387 4 10.8966 4C11.8416 4 12.7324 4.18199 13.569 4.54598C14.4055 4.90996 15.1367 5.40485 15.7625 6.03065C16.3883 6.65645 16.8831 7.38761 17.2471 8.22414C17.6111 9.06066 17.7931 9.95147 17.7931 10.8966C17.7931 11.7139 17.659 12.4866 17.3908 13.2146C17.1226 13.9425 16.7522 14.6066 16.2797 15.2069L18.7893 17.7165C18.9425 17.8697 19.016 18.0485 19.0096 18.2529C19.0032 18.4572 18.9234 18.636 18.7701 18.7893C18.6169 18.9298 18.4381 19 18.2337 19C18.0294 19 17.8506 18.9298 17.6973 18.7893L15.1877 16.2989C14.5875 16.7714 13.9234 17.1386 13.1954 17.4004C12.4674 17.6622 11.7011 17.7931 10.8966 17.7931Z" fill="#9CA3AF"/>
                  </svg>
                  <input type="text" name="keyword" defaultValue="" placeholder="검색할 상품을 입력해주세요"/>
                </div>
                <button className="bt-primary bt-search">검색</button>
              </form>
           
            <button className="bt-primary" type="button">상품 등록하기</button>
            <div className="select-filter-container">
              <div onClick={handleDropdown}>
                {order === 'recent' ? '최신순' : '좋아요순'}
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                  <path d="M7.17021 6.88244C6.85257 7.18253 6.35593 7.18253 6.03829 6.88244L0.259779 1.42318C-0.282169 0.911179 0.0801827 -3.03019e-07 0.82574 -2.3784e-07L12.3827 7.72503e-07C13.1283 8.37681e-07 13.4906 0.911177 12.9487 1.42318L7.17021 6.88244Z" fill="#1F2937"/>
                </svg>
              </div>
              <ul className={isOpen ? 'active' : ''}>
                <li onClick={() => handleSortChange('recent')}>최신순</li>
                <li onClick={() => handleSortChange('favorite')}>좋아요순</li>
              </ul>
            </div>
          </div>
        </div>
        <ItemList items={items}/>
        <ul className="pagenation">
          <li><button onClick={() => handlePageList('Prev')}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
             <path d="M9.5 4.66669L6 8.16669L9.5 11.6667" stroke="#4B5563" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button></li>
          {currentList.map((p) => (
            <li
              key={p}
              className={p === page ? 'active' : ''}
            >
              <button onClick={() => setPage(p)}>
              {p}
            </button>
            </li>
          ))}
          <li><button onClick={() => handlePageList('Next')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4.66656L9.5 8.16656L6 11.6666" stroke="#4B5563" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button></li>
        </ul>
      </section>
    );
 }

 export default AllProductsList;