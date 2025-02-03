import React from 'react';

function ChoiceButton({ choiceId, onClick }) {
  const style = {
    margin: '5px',
    padding: '10px 20px',
    cursor: 'pointer'
  };

  return (
    <button style={style} onClick={() => onClick(choiceId)}>
      {choiceId.charAt(0).toUpperCase() + choiceId.slice(1)}
    </button>
  );
}

export default ChoiceButton;
