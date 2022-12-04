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
    :~  init-desk/(ot ~[desk/so])
        init-store/(ot ~[desk/so permissions/(ot ~[read/(su (perk [%desk %our %any ~])) write/(su (perk [%desk %our %any ~]))])])
        init-stash/(ot ~[desk/so stash/so permissions/(ot ~[read/(su (perk [%desk %our %any %unset ~])) write/(su (perk [%desk %our %any %unset ~]))])])
        ::
        set-stash/(ot ~[desk/so stash/so key/so value/so])
        remove-stash/(ot ~[desk/so stash/so key/so])
        clear-stash/(ot ~[desk/so stash/so])
    ==
  --
++  grad  %noun
--