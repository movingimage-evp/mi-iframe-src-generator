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
  const value = event?.data?.value;

  switch (method) {
    case 'play':
      player.play().then(()=> emitMethod('play'));
      break;
    case 'pause':
      player.pause();
      emitMethod('pause');
      break;
    case 'addEventListener':
      player.on(value, emitEvent);
      break;
    case 'removeEventListener':
      player.off(value, emitEvent);
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

export const emitMethod = (method) => {
  try {
    const data = {
      method
      // We can send data here if we need to
    }

    parent.postMessage(data, "*");
  } catch { } // Nothing to do, there's no parent
}

export const emitEvent = (event) => {
  try {
    const data = {
      event: event.type
      // We can send data here if we need to
    }

    parent.postMessage(data, "*");
  } catch { } // Nothing to do, there's no parent
}