const sendPong = (event) => {
  const message = {
    event: 'ready',
    method: 'ping'
  }
  event.source.postMessage(message, event.origin);
}

const isPingEvent = (event) => {
  return event?.data?.method === 'ping';
}

const callPlayerMethod = (event, player) => {
  const method = event?.data?.method;
  switch (method) {
    case 'play':
      player.play();
      break;
    case 'pause':
      player.pause();
      break;
  }
}

export const processMessage = (event, player) => {
  if (isPingEvent(event)) {
    sendPong(event);
  } else {
    callPlayerMethod(event, player);
  }
}

export const emitEvent = (event) => {
  try {
    const message = {
      method: event.type
    }

    parent.postMessage(message, "*");
  } catch {} // Nothing to do, there's no parent
}