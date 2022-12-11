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
    :~
      :-  %init-stash
      %-  ot
      :~  desk/so
          src/so
          sta/so
          :-  %perm
          %-  ot
          :~  read/(su (perk [%desk %our %any ~]))
              write/(su (perk [%desk %our %any ~]))
      ==  ==
    ==
  --
++  grad  %noun
--