|%
+$  desk   @tas
+$  stash  @t
+$  level
  $?  %desk
      %our
      %any
      %unset
  ==
+$  perm    (pair read=level write=level)
+$  kv      (map key=@t val=@t)
+$  store   (map stash (pair perm kv))
+$  tome    (map desk (pair perm store))
--