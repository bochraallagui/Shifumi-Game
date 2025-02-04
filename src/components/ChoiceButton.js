import React from 'react';
// ChoiceButton is a functional component that takes choiceId and `onClick` as props : 
function ChoiceButton({ choiceId, onClick }) {
// Styles object to apply CSS directly to the button for margin, padding, and cursor:
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
