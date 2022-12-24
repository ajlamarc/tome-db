/-  *tome
|_  act=stash-action
++  grow
  |%
  ++  noun  act
  --
++  grab
  |%
  ++  noun  stash-action
  ++  json
    =,  dejs:format
    |=  jon=json
    ^-  stash-action
    %.  jon
    %-  of
    :~  set-stash/(ot ~[desk/so src/so sta/so key/so val/so])
        remove-stash/(ot ~[desk/so src/so sta/so key/so])
        clear-stash/(ot ~[desk/so src/so sta/so])
    ==
  --
++  grad  %noun
--