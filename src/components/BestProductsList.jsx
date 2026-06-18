import { useState, useEffect, useCallback } from 'react';
import axios from '../utils/axios.jsx';
import ItemList from "./ItemList.jsx";

function BestProductsList () {
  const [bestItems, setBestItems] = useState([]);
  const [pageSize, setPageSize] = useState(4);

  //똑같이 handleLoad를 불러오는데, 딱 4개 일단 셋팅
  const handleLoad = useCallback(async() => {
    const response = await axios.get('/products',{
      params: {
        pageSize: pageSize,
        orderBy: 'favorite',
      }
    });
    const { list } = response.data;
    setBestItems(list);
  },[pageSize]);

  const handleSize = useCallback(() => {
     const contentWidth = window.innerWidth;
     if (contentWidth < 768 ){
       setPageSize(1);
     } else if (contentWidth < 1024 ){
       setPageSize(2);
     } else {
       setPageSize(4);
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

  return (
    <div>
      <h2>베스트 상품</h2>
      <ul>
        <ItemList items={bestItems}/>
      </ul>
    </div>
  );
}

 export default BestProductsList;