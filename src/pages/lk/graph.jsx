import { Link, useHistory } from "react-router-dom";

const Graph = () => {
  return (
    <div className='stock'>
      <h4 className='stock__title'>Статистика</h4>
      <Link to='/lk'>Назад</Link>
      <p>Здесь будет статистика</p>
    </div>
  );
};

export default Graph;
