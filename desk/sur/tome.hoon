|%
+$  desk   @t
+$  stash  @t
+$  key    @t
+$  value  @t
::
+$  level
  $?  %desk
      %our
      %any
      %unset
  ==
::
+$  perm    (pair read=level write=level)
+$  kv      (map =key =value)
+$  store   (map stash (pair perm kv))
+$  tome    (map desk (pair perm store))
::
+$  action
  $%  [%init-desk =desk]
      [%init-store =desk =perm]
      [%init-stash =desk =stash =perm]
      [%set-stash =desk =stash =key =value]
      [%remove-stash =desk =stash =key]
      [%clear-stash =desk =stash]
  ==
--