import { useState, useEffect } from 'react';

function useWebSocket(url) {
  const [socket, setSocket] = useState(null);
  const [progressSetter, setProgressSetter] = useState(() => {});

  useEffect(() => {
    const newSocket = new WebSocket(url);

    newSocket.onopen = () => {
      console.log('Conexión establecida con el servidor WebSocket');
    };

    newSocket.onerror = (error) => {
      console.error('Error en la conexión WebSocket:', error);
    };

    newSocket.onclose = () => {
      console.log('Conexión WebSocket cerrada');
    };

    setSocket(newSocket);
    setProgressSetter(() => (progress) => {
      if (newSocket.readyState === WebSocket.OPEN) {
        newSocket.send(JSON.stringify({ type: 'progress', progress }));
      }
    });

    return () => {
      newSocket.close();
    };
  }, [url]);

  return [socket, progressSetter];
}

export default useWebSocket;
