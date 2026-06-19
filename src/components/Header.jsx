import MainLogo from '../assets/logo_main_2x.png';
import MainlogoM from '../assets/logo_main_m.png';

function Header() {
  return (
    <header>
      <nav>
        <div className="left-zone">
          <h1>
            <picture>
              <source srcSet={MainlogoM} media='(max-width: 480px)'/>
              <img src={MainLogo} alt="판다마켓"/>
            </picture>
          </h1>
          <ul>
            <li><a href="">자유게시판</a></li>
            <li><a href="">중고마켓</a></li>
          </ul>
        </div>
        <button type="button" className="bt-primary">로그인</button>
      </nav>
    </header>
  );
}

export default Header;