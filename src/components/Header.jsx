import MainLogo from '../assets/logo_main_2x.png';

function Header() {
  return (
    <div>
      <div>
        <h1><img src={MainLogo} alt="판다마켓"/></h1>
        <ul>
          <li><a href="">자유게시판</a></li>
          <li><a href="">중고마켓</a></li>
        </ul>
      </div>
      <button type="button">로그인</button>
    </div>
  );
}

export default Header;