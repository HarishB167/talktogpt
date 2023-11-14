import ModalBox from './ModalBox';

const SaveConversationModalBox = ({ onClose, text }) => {
  const url = 'data:application/octet-stream;base64,' + btoa(text);

  const handleClose = () => {
    onClose();
  };

  const isConversationEmpty = () => {
    return !(text && text.length > 0);
  };

  return (
    <ModalBox onClose={handleClose}>
      <div className='flex w-full flex-col p-2'>
        {!isConversationEmpty() && (
          <div
            className='overflow-auto whitespace-pre-wrap rounded border bg-blue-500 bg-opacity-25 p-2'
            style={{ maxHeight: '50vh' }}
          >
            {text}
          </div>
        )}
        {isConversationEmpty() && <div className='rounded border bg-red-200 p-3'>No Coversation's to Save</div>}
        <div className='mt-10 flex justify-around'>
          {!isConversationEmpty() && (
            <a href={url} download='Conversation.txt'>
              <Button>Save</Button>
            </a>
          )}
          <Button onClick={handleClose}>Cancel</Button>
        </div>
      </div>
    </ModalBox>
  );
};

export default SaveConversationModalBox;

const Button = ({ children, ...rest }) => {
  return (
    <button className='rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700' {...rest}>
      {children}
    </button>
  );
};
