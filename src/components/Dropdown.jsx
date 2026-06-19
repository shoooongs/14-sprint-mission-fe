
import { useState } from "react";

function Dropdown ({ order, setOrder }) {
  //정렬 토글 관리
  const [isOpen, setIsOpen] = useState(false);
  const handleDropdown = () => setIsOpen(!isOpen);
  
  const handleSortChange = (e) => {
    setOrder(e);
    setIsOpen(false);
  }

  return (
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
  );
}

export default Dropdown;