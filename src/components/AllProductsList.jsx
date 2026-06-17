import { useState, useEffect } from "react";
import axios from '../utils/axios.jsx';
import ItemList from "./ItemList.jsx";

const windowInnerWidth = window.innerWidth;
console.log(windowInnerWidth);

function AllProductsList () {
  // 상품목록 데이터 상태관리
  const [items, setItems] = useState([]);
  //option의 값에 따라서 기본값은 최신순 -> 상태바뀌면 새로운 배열을 items에 넣어주기
  const [order, setOrder] = useState('recent');
  //복사한 배열 객체 items -> 객체 안의 프로퍼티가 고정일시 '.', 변수면 '[]'으로 바꿔줘야함
  //const sortedItems = [...items].sort((a,b) => b[order] - a[order]);
  const [windowSize, setWindowSize] = useState('');

  
  
  const handleLoad = async( ) => {
    const response = await axios.get('/products', {
      params: {
        orderBy: order,
      }
    });
    const { list } = response.data;
    setItems(list);
  };

  useEffect(() => {
    handleLoad();
  },[order]);
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
      </div>
    );
 }

 export default AllProductsList;