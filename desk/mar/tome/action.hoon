/-  *tome
|_  act=tome-action
++  grow
  |%
  ++  noun  act
  --
++  grab
  |%
  ++  noun  tome-action
  ++  json
    =,  dejs:format
    |=  jon=json
    ^-  tome-action
    %.  jon
    %-  of
    :~  init-store/(ot ~[desk/so src/so perm/(ot ~[read/(su (perk [%desk %our %team %any ~])) write/(su (perk [%desk %our %team %any ~]))])])
    ==
  --
++  grad  %noun
--