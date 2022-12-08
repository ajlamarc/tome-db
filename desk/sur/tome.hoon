|%
+$  desk  @t  :: desk being requested
+$  src   @t  :: origin desk of request
+$  sta   @t  :: name of the stash
+$  key   @t
+$  val   @t
::
+$  level
  $?  %desk
      %our
      %any
  ==
::
+$  perm    (pair read=level write=level)
+$  kv      (map =key =val)
+$  stash   (pair =perm (unit =kv))
+$  store   (pair =perm (unit (map sta stash)))
::
+$  tome-action
  $%  [%init-store =desk =src =perm]
    :: log, feed, etc.
  ==
+$  store-action
  $%  [%init-stash =desk =src =sta =perm]
      [%set-stash =desk =src =sta =key =val]
      [%remove-stash =desk =src =sta =key]
      [%clear-stash =desk =src =sta]
  ==
--