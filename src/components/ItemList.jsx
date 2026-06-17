import { useEffect } from 'react';

//똑같은 아이템객체정보를 받는 두개의 함수를 만듦 
//개별 아이템을 꾸미는 역할
//상품이미지, 제품명, 가격, 하트와 좋아요수를 가져와서 생김새 컴포넌트 만들기
function EachItem ({ item }) {
  return (
    <li>
      <img src={item.images} alt=""/>
      <div>
        <h3>{item.name}</h3>
        <p>{item.price}</p>
        <p>{item.favoriteCount}</p>
      </div>
    </li>
  );
}


 //아이템을 목록으로 보이게 하는 역할
 function ItemList ({ items }) {
 //데이터를 한번더 쪼개서 일시킴
 //map렌더링시 리스트 item의 key값 챙기기
  return (
    <ul>
      {items.map((item) => (
        <EachItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default ItemList;