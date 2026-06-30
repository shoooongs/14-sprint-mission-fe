import './RegistForm.css'

function RegistForm ({ onSubmit }) {
  return (
    <form action={onSubmit}>
      <div className="section-title-header">
        <h2 className="section-title">상품 등록하기</h2>
        <button className="bt-primary" type="button">등록</button>
      </div>
      <div className="section-item-input">
      <label htmlFor="name" name="" >
        상품명
        <input type="text" id="name" name="name" placeholder="상품명을 입력해주세요"/>
      </label>
      <label htmlFor="description" name="" >
        상품 소개
        <textarea type="text" id="description" name="description" placeholder="상품 소개를 입력해주세요"/>
      </label>
      <label htmlFor="price" name="" >
        판매가격
        <input type="text" id="price" name="price" placeholder="판매 가격을 입력해주세요"/>
      </label>
      <label htmlFor="tags" name="" >
        태그
        <input type="text" id="tags" name="tags" placeholder="태그를 입력해주세요"/>
      </label>
      </div>
    </form>
   );
}

export default RegistForm;