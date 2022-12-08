/-  *tome
|_  act=store-action
++  grow
  |%
  ++  noun  act
  --
++  grab
  |%
  ++  noun  store-action
  ++  json
    =,  dejs:format
    |=  jon=json
    ^-  store-action
    %.  jon
    %-  of
    :~  init-stash/(ot ~[desk/so src/so sta/so perm/(ot ~[read/(su (perk [%desk %our %any ~])) write/(su (perk [%desk %our %any ~]))])])
        ::
        set-stash/(ot ~[desk/so src/so sta/so key/so val/so])
        remove-stash/(ot ~[desk/so src/so sta/so key/so])
        clear-stash/(ot ~[desk/so src/so sta/so])
    ==
  --
++  grad  %noun
--