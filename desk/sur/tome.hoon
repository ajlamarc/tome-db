|%
+$  desk   @t
+$  src    @t
+$  stash  @t
+$  key    @t
+$  val  @t
::
+$  level
  $?  %desk
      %our
      %any
      %unset
  ==
::
+$  perm    (pair read=level write=level)
+$  kv      (map =key =val)
+$  store   (map stash (pair perm kv))
+$  tome    (map desk (pair perm store))
::
+$  action
  $%  [%init-desk =desk =src]
      [%init-store =desk =src =perm]
      [%init-stash =desk =src =stash =perm]
      [%set-stash =desk =src =stash =key =val]
      [%remove-stash =desk =src =stash =key]
      [%clear-stash =desk =src =stash]
  ==
--