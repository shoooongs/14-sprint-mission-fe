import { useState, useEffect } from 'react';
import axios from '../utils/axios.jsx';
import ItemList from "./ItemList.jsx";

function BestProductsList () {
  const [bestItems, setBestItems] = useState([]);

  //똑같이 handleLoad를 불러오는데, 딱 5개 일단 셋팅
  const handleLoad = async() => {
    const response = await axios.get('/products',{
      params: {
        pageSize: 5,
        orderBy: 'favorite',
      }
    });
    const { list } = response.data;
    setBestItems(list);
  };

  useEffect(() => {
    handleLoad();
  },[]);

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