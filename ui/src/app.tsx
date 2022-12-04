import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function App() {

  useEffect(() => {
    api.poke({
      app: 'tome-api', // agent name
      mark: 'tome-action',
      json: { 'set-stash': { 'desk': 'uniswap', 'stash': 'app.preferences', 'key': 'theme', 'value': 'dark' } },
      // onSuccess: () => { setOn(_on); getLogs(); },
    })
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen">
    </main>
  );
}
