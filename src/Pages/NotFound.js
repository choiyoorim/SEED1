import React from 'react';
import Button from './../Components/Button';

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
        <Button click={onGoBack} size="md">돌아가기</Button>
      </div>
  );
};

export default NotFound;
