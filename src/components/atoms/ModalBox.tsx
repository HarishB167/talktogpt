import { MouseEvent, useRef } from 'react';

export default function ModalBox({ onClose, children }) {
  const containerRef = useRef(null);

  const handleContainerClick = (e: MouseEvent) => {
    if (e.target == containerRef.current) {
      onClose();
    }
  };

  return (
    <div
      className={'fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center'}
      style={{ background: 'rgb(0,0,0, 0.4)' }}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div
        className='m-auto flex w-4/5 flex-col border border-solid border-gray-600 p-3'
        style={{ background: '#fefefe' }}
      >
        <span className='cursor-pointer self-end' onClick={() => onClose()}>
          <IconCross />
        </span>
        <div className=' flex  flex-col items-center justify-between p-2'>{children}</div>
      </div>
    </div>
  );
}

const IconCross = (props) => {
  return (
    <svg viewBox='0 0 16 16' fill='currentColor' height='1em' width='1em' {...props}>
      <path
        fill='currentColor'
        d='M15.854 12.854L11 8l4.854-4.854a.503.503 0 000-.707L13.561.146a.499.499 0 00-.707 0L8 5 3.146.146a.5.5 0 00-.707 0L.146 2.439a.499.499 0 000 .707L5 8 .146 12.854a.5.5 0 000 .707l2.293 2.293a.499.499 0 00.707 0L8 11l4.854 4.854a.5.5 0 00.707 0l2.293-2.293a.499.499 0 000-.707z'
      />
    </svg>
  );
};
