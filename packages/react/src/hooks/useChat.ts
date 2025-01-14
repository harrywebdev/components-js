import type { ChatOptions, ReceivedChatMessage } from '@livekit/components-core';
import { setupChat } from '@livekit/components-core';
import * as React from 'react';
import { useRoomContext } from '../context';
import { useObservableState } from './internal/useObservableState';

/**
 * The `useChat` hook provides chat functionality for a LiveKit room.
 * It returns a simple `send` function to send chat messages and an array of `chatMessages` to hold received messages.
 * @remarks
 * It is possible to pass configurations for custom message encoding and decoding.
 * @public
 */
export function useChat(options?: ChatOptions) {
  const room = useRoomContext();
  const [setup, setSetup] = React.useState<ReturnType<typeof setupChat>>();
  const isSending = useObservableState(setup?.isSendingObservable, false);
  const chatMessages = useObservableState<ReceivedChatMessage[]>(setup?.messageObservable, []);

  React.useEffect(() => {
    const setupChatReturn = setupChat(room, options);
    setSetup(setupChatReturn);
  }, [room, options]);

  return { send: setup?.send, chatMessages, isSending };
}
