import RegistForm from '../components/RegistForm.jsx';
import './Registration.css';

function Registration () {

  const handleRegistForm = () => {};

  return (
    <div className="register_wrap">
      <RegistForm onSubmit={handleRegistForm}/>
    </div>
  );
}

export default Registration;