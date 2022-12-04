import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function App() {

  useEffect(() => {
    console.log(window.desk)
    api.poke({
      app: 'tome-api', // agent name
      mark: 'tome-action',
      json: { 'set-stash': { 'desk': 'uniswap', 'src': 'uniswap', 'stash': 'app.preferences', 'key': 'theme', 'val': 'dark' } },
      // onSuccess: () => { setOn(_on); getLogs(); },
    })
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen">
    </main>
  );
}
