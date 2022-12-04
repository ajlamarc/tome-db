/-  *tome
|_  act=action
++  grow
  |%
  ++  noun  act
  --
++  grab
  |%
  ++  noun  action
  ++  json
    =,  dejs:format
    |=  jon=json
    ^-  action
    %.  jon
    %-  of
    :~  init-tome/(ot ~[desk/so src/so])
        init-store/(ot ~[desk/so src/so perm/(ot ~[read/(su (perk [%desk %our %any ~])) write/(su (perk [%desk %our %any ~]))])])
        init-stash/(ot ~[desk/so src/so stash/so perm/(ot ~[read/(su (perk [%desk %our %any %unset ~])) write/(su (perk [%desk %our %any %unset ~]))])])
        ::
        set-stash/(ot ~[desk/so src/so stash/so key/so val/so])
        remove-stash/(ot ~[desk/so src/so stash/so key/so])
        clear-stash/(ot ~[desk/so src/so stash/so])
    ==
  --
++  grad  %noun
--