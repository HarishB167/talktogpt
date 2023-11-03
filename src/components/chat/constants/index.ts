export const WAKE_WORDS = ['flow', 'slow', 'start dictation'];
export const END_WORDS = ['over', 'end dictation'];
export const STOP_TIMEOUT = 2; // 2 seconds
export const BE_CONCISE = 'Please, be concise.';

export const VOICE_COMMANDS = {
  OFF_AUTO_STOP: {
    command: 'off-auto-stop',
    matcher: /turn off automatic response/i,
    successMessage: 'Automatic response is turned off.',
  },
  ON_AUTO_STOP: {
    command: 'on-auto-stop',
    matcher: /turn on automatic response/i,
    successMessage: 'Automatic response is turned on.',
  },
  CHANGE_AUTO_STOP: {
    command: 'change-auto-stop',
    matcher: /change (the )?respon(d|se) (delay )?to/i,
    successMessage: 'Automatic response is changed to',
  },
  MAKE_AUTO_STOP: {
    command: 'make-auto-stop',
    matcher: /make automatic respon(d|se)/i,
    successMessage: 'Automatic response is turned changed to',
  },
  TURN_OFF_MIC: {
    command: 'turn-off-mic',
    matcher: /turn off (the )?microphone/i,
    successMessage: 'Microphone is turned off.',
  },
} as const;

export const TALKTOGPT_SOCKET_ENDPOINT =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://talktogpt-cd054735c08a.herokuapp.com';
