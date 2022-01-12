import React from 'react';

const NotFound = ({history}) => {

  const onGoBack = () =>{
    history.goBack();
  };

  return (
      <div 
        className='not-found'
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
        <h2 style={{
          color:'white',
          fontSize:'1.5rem',
          fontWeight:'400'
        }}>
          존재하지 않는 페이지입니다.
        </h2>
        <button onClick={onGoBack} style={{
          background: '#FFBB00',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '1rem'
        }}>
          돌아가기
        </button>
      </div>
  );
};

export default NotFound;
