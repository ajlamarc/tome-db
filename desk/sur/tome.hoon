|%
+$  desk  @t  :: desk being requested
+$  src   @t  :: origin desk of request
+$  sta   @t  :: name of the stash
+$  key   @t
+$  val   @t
::
+$  level
  $?  %any
      %our
      %desk
  ==
::
+$  perm     (pair read=level write=level)
+$  kv       (unit (map key val))
+$  stash    (pair perm kv)
+$  stashes  (unit (map sta stash))
+$  store    (pair perm stashes)
::
+$  tome-action
  $%  [%init-store =desk =src =perm]
    :: log, feed, etc.
  ==
::
+$  store-action
  $%  [%init-stash =desk =src =sta =perm]
    :: update permissions, delete, etc.
  ==
::
+$  stash-action
  $%  [%set-stash =desk =src =sta =key =val]
      [%remove-stash =desk =src =sta =key]
      [%clear-stash =desk =src =sta]
  ==
--

