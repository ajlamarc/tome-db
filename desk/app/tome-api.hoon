/-  *tome
/+  verb, dbug, default-agent
::
|%
::
+$  versioned-state  $%(state-0)
::
+$  state-0  [%0 stores=(map desk store)] :: add other types of tomes here
::
::
::  boilerplate
::
+$  card  card:agent:gall
--
::
%+  verb  &
%-  agent:dbug
=|  state-0
=*  state  -
::
^-  agent:gall
::
=<
  |_  =bowl:gall
  +*  this  .
      def   ~(. (default-agent this %|) bowl)
      eng   ~(. +> [bowl ~])
  ++  on-init
    ^-  (quip card _this)
    ~>  %bout.[0 '%tome-api +on-init']
    =^  cards  state
      abet:init:eng
    [cards this]
  ::
  ++  on-save
    ^-  vase
    ~>  %bout.[0 '%tome-api +on-save']
    !>(state)
  ::
  ++  on-load
    |=  ole=vase
    ~>  %bout.[0 '%tome-api +on-load']
    ^-  (quip card _this)
    =^  cards  state
      abet:(load:eng ole)
    [cards this]
  ::
  ++  on-poke
    |=  [mar=mark vaz=vase]
    ~>  %bout.[0 '%tome-api +on-poke']
    ^-  (quip card _this)
    =^  cards  state  abet:(poke:eng mar vaz)
    [cards this]
  ::
  ++  on-peek
    |=  =path
    ~>  %bout.[0 '%tome-api +on-peek']
    ^-  (unit (unit cage))
    [~ ~]
  ::
  ++  on-agent
    |=  [wir=wire sig=sign:agent:gall]
    ~>  %bout.[0 '%tome-api +on-agent']
    ^-  (quip card _this)
    ::  =^  cards  state
    ::    abet:(dude:eng wir sig)
    ::  [cards this]
    `this
  ::
  ++  on-arvo
    |=  [wir=wire sig=sign-arvo]
    ~>  %bout.[0 '%tome-api +on-arvo']
    ^-  (quip card _this)
    `this
  ::
  ++  on-watch
  |=  =path
  ~>  %bout.[0 '%tome-api +on-watch']
  ^-  (quip card _this)
  `this
  ::
  ++  on-fail
    ~>  %bout.[0 '%tome-api +on-fail']
    on-fail:def
  ::
  ++  on-leave
    ~>  %bout.[0 '%tome-api +on-init']
    on-leave:def
  --
|_  [bol=bowl:gall dek=(list card)]
+*  dat  .
    our  (scot %p our.bol)
    now  (scot %da now.bol)
++  emit  |=(=card dat(dek [card dek]))
++  emil  |=(lac=(list card) dat(dek (welp lac dek)))
++  abet
  ^-  (quip card _state)
  [(flop dek) state]
::
++  init
  ^+  dat
  dat
::  +load: handle on-load
::
++  load
  |=  vaz=vase
  ^+  dat
  ?>  ?=([%0 *] q.vaz)
  dat(state !<(state-0 vaz))
::  +poke: handle on-poke
::
++  poke
  |=  [mar=mark vaz=vase]
  =^  cards  state
    ?+  mar  ~|(bad-tome-mark/mar !!)
        %tome-action
      =/  act  !<(tome-action vaz)
      ~&  >>>  act
      ?>  ?=(%init-store -.act)
      ?:  (~(has by stores) desk.act)
        `state
      `state(stores (~(put by stores) desk.act [perm.act [~ ~]]))
        %store-action
      =/  act  !<(store-action vaz)
      ~&  >>>  act
      so-abet:(so-poke:(so-abed:so desk.act) act)
        %stash-action
      =/  act  !<(stash-action vaz)
      ~&  >>>  act
      so-abet:(so-poke:(so-abed:so desk.act) act)
    ==
  (emil cards)
::
:: ++  dude
::   |=  [pol=(pole knot) sig=sign:agent:gall]
::   ^+  dat
::   dat
::  +so: store engine
::
++  so
  |_  $:  dsk=desk
          per=perm
          =stashes
          caz=(list card)
      ==
  +*  so  .
  ++  so-emit  |=(c=card so(caz [c caz]))
  ++  so-emil  |=(lc=(list card) so(caz (welp lc caz)))
  ++  so-abet  
    ^-  (quip card _state)
    =+  s=(~(put by stores) dsk [per stashes])
    [(flop caz) state(stores s)]
  ::
  ++  so-abed
    |=  d=desk
    =+  store=(~(got by stores) d)
    so(dsk d, per p.store, stashes q.store)
  ::
  ++  so-poke
    |=  a=?(store-action stash-action)
    ^+  so
    ?-  a
        store-action
      ?-  -.a
          %init-stash
        ?:  (~(has by (need stashes)) sta.a)
          so
        so(stashes [~ (~(put by (need stashes)) sta.a [perm.a [~ ~]])])
      ==
        stash-action
      :: force compiler to recognize what sta.a is
      ?-  -.a
          %set-stash
        st-abet:(st-poke:(st-abed:st sta.a) a)
          %remove-stash
        st-abet:(st-abed:st sta.a)
          %clear-stash
        st-abet:(st-abed:st sta.a)
      ==
    ==
  ::  +st: stash engine
  ::
  ++  st
    |_  $:  s=sta
            p=perm
            =kv
        ==
    +*  st  .
    ++  st-abet  
      ^+  so
      =+  stash=(~(put by (need stashes)) s [p kv])
      so(stashes [~ stash])
    ::
    ++  st-abed
      |=  =sta
      =+  stash=(~(got by (need stashes)) sta)
      st(s sta, p p.stash, kv q.stash)
    ++  st-poke
      |=  a=stash-action
      ^+  st
      ?-  -.a
          %set-stash
        st(kv [~ (~(put by (need kv)) key.a val.a)])
          %remove-stash
        st
          %clear-stash
        st
      ==
    --
  --
--
